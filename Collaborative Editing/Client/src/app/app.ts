import '../styles/styles.css';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
import { CollaborationClient } from '@syncfusion/ej2-collaborator';
import { PdfViewerAdapter } from './pdfViewerAdapter';

// ============================================================
// Collaboration Configuration
// ============================================================

// Available user list for demo purposes
const userList = ['RIO', 'JOHN', 'MAXY', 'SHAI', 'SRI'];
const currentUserName = userList[Math.floor(Math.random() * userList.length)];
const SERVICE_URL = 'http://localhost:8081/';

// ============================================================
// Collaboration State Management
// ============================================================

interface CollaborationState {
    isDocumentLoaded: boolean;
    collaborationStatus: 'initializing' | 'loading' | 'connected' | 'error';
    currentUser: string;
    connectedUsers: string[];
    roomName: string;
    adapter: PdfViewerAdapter | null;
    client: CollaborationClient | null;
}

const collaborationState: CollaborationState = {
    isDocumentLoaded: false,
    collaborationStatus: 'initializing',
    currentUser: currentUserName,
    connectedUsers: [],
    roomName: '',
    adapter: null,
    client: null
};

// ============================================================
// Initialize PDF Viewer and Collaboration
// ============================================================

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer);

let pdfViewer: PdfViewer = new PdfViewer({
    enableCollaborativeEditing: true,
    resourceUrl: 'https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2-pdfviewer-lib'
});

pdfViewer.appendTo('#PdfViewer');

// ============================================================
// Helper Functions - PDF Fetch and Load
// ============================================================

/**
 * Loads a PDF blob into the viewer
 */
async function loadPDFBlobIntoViewer(pdfBlob: Blob): Promise<void> {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const uint8Array = new Uint8Array(arrayBuffer);

                    // Attempt to load using viewer.load() with Uint8Array
                    if (pdfViewer && pdfViewer.load && typeof pdfViewer.load === 'function') {
                        pdfViewer.load(uint8Array, '');
                        console.log('[App] Loaded PDF using viewer.load(Uint8Array)');
                        resolve();
                        return;
                    }

                    // Fallback: Try loading via data URL
                    const dataReader = new FileReader();
                    dataReader.onload = () => {
                        try {
                            const dataUrl = dataReader.result as string;

                            if (pdfViewer && pdfViewer.load && typeof pdfViewer.load === 'function') {
                                pdfViewer.load(dataUrl, '');
                                console.log('[App] Loaded PDF using viewer.load(dataUrl)');
                                resolve();
                            } else {
                                console.error('[App] Viewer does not support load method');
                                reject(new Error('Viewer load method not available'));
                            }
                        } catch (error) {
                            reject(error);
                        }
                    };

                    dataReader.onerror = () => {
                        reject(new Error('Failed to read blob as data URL'));
                    };

                    dataReader.readAsDataURL(pdfBlob);

                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read blob as array buffer'));
            };

            reader.readAsArrayBuffer(pdfBlob);
        });

    } catch (error) {
        console.error('[App] Error loading PDF blob:', error);
        throw error;
    }
}

/**
 * Fetches the current collaborative document from the server and loads it into the viewer
 */
async function fetchAndLoadPDFDocument(): Promise<void> {
    try {
        console.log(`[App] Fetching PDF from room: ${collaborationState.roomName}`);

        const queryParams = new URLSearchParams({
            roomName: collaborationState.roomName || 'default'
        });

        const response = await fetch(
            `${SERVICE_URL}api/CollaborativeEditing/GetPDFDocument?${queryParams.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(`Server error: ${result.error}`);
        }

        console.log(`[App] PDF retrieved successfully - Size: ${result.contentLength} bytes`);

        // Decode Base64 content to binary string
        const binaryString = atob(result.content);

        // Convert binary string to Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create Blob from Uint8Array
        const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
        console.log(`[App] Converted to Blob - Size: ${pdfBlob.size} bytes`);

        // Load the PDF into the viewer
        await loadPDFBlobIntoViewer(pdfBlob);
        console.log('[App] PDF loaded into viewer');

    } catch (error) {
        console.error('[App] Error fetching PDF document:', error);
        throw error;
    }
}

/**
 * Updates the collaboration status bar UI
 */
function updateStatusBar(): void {
    const statusBar = document.getElementById('collaboration-status');
    if (statusBar) {
        const statusColor = collaborationState.collaborationStatus === 'connected' ? '#28a745' :
            collaborationState.collaborationStatus === 'error' ? '#dc3545' : '#ffc107';

        statusBar.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div>
          <strong>User:</strong> ${collaborationState.currentUser} |
          <strong> Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">
            ${collaborationState.collaborationStatus}
          </span> |
          <strong> Room:</strong> ${collaborationState.roomName || 'N/A'}
        </div>
        <div>
          <strong>Connected Users:</strong> ${collaborationState.connectedUsers.join(', ') || 'None'}
        </div>
      </div>
    `;
    }
}

// ============================================================
// Event Handlers - Collaboration Lifecycle
// ============================================================

/**
 * Handler for viewer.resourcesLoaded event
 * 
 * This event fires when the PdfViewer has initialized all resources.
 * We use it to:
 * 1. Initialize the collaboration adapter and client
 * 2. Load the document from the collaboration service
 * 3. Join the collaboration room
 * 4. Fetch and load the current PDF state
 */
pdfViewer.resourcesLoaded = async function (): Promise<void> {
    console.log('[App] Viewer resourcesLoaded event triggered');

    if (!collaborationState.isDocumentLoaded) {
        try {
            console.log(`[App] Initializing collaboration - User: ${collaborationState.currentUser}, Service: ${SERVICE_URL}`);

            collaborationState.collaborationStatus = 'loading';
            collaborationState.isDocumentLoaded = true;
            updateStatusBar();

            // Initialize collaboration asynchronously
            (async () => {
                try {
                    // Step 1: Initialize PdfViewerAdapter
                    const adapter = new PdfViewerAdapter(pdfViewer, SERVICE_URL, collaborationState.currentUser);
                    collaborationState.adapter = adapter;
                    console.log('[App] PdfViewerAdapter initialized');

                    // Step 2: Create and configure CollaborationClient
                    const client = new CollaborationClient(adapter, {
                        serviceUrl: SERVICE_URL,
                        connectionType: 'websocket',
                        currentUser: collaborationState.currentUser,
                        onUserJoined: (user: any) => {
                            console.log('[App] User joined collaboration:', user);
                            const userName = user.userName || user.currentUser;
                            if (!collaborationState.connectedUsers.includes(userName)) {
                                collaborationState.connectedUsers.push(userName);
                            }
                            updateStatusBar();
                        },
                        onUserLeft: (user: any) => {
                            console.log('[App] User left collaboration:', user);
                            const userName = user.userName || user.currentUser;
                            collaborationState.connectedUsers = collaborationState.connectedUsers.filter(u => u !== userName);
                            updateStatusBar();
                        }
                    });
                    collaborationState.client = client;

                    console.log('[App] CollaborationClient initialized');

                    // Step 3: Load from server (gets room name and pending operations)
                    const roomName = await adapter.loadFromServer();
                    collaborationState.roomName = roomName;
                    console.log(`[App] Loaded from server - Room: ${roomName}`);
                    updateStatusBar();

                    // Step 4: Join the collaboration room with the client
                    await client.joinRoomAsync(roomName);
                    console.log(`[App] Joined collaboration room: ${roomName}`);

                    // Step 5: Fetch and load the current PDF document state
                    await fetchAndLoadPDFDocument();
                    console.log('[App] PDF document loaded successfully');

                    collaborationState.collaborationStatus = 'connected';
                    if (!collaborationState.connectedUsers.includes(collaborationState.currentUser)) {
                        collaborationState.connectedUsers.push(collaborationState.currentUser);
                    }
                    updateStatusBar();

                } catch (error) {
                    console.error('[App] Error during collaboration initialization:', error);
                    collaborationState.collaborationStatus = 'error';
                    updateStatusBar();
                    // Fallback: Load default document
                    console.log('[App] Falling back to default document');
                    pdfViewer.load('https://cdn.syncfusion.com/content/PDF/pdf-succinctly.pdf', '');
                }
            })();

        } catch (error) {
            console.error('[App] Error initializing collaboration:', error);
            collaborationState.collaborationStatus = 'error';
            updateStatusBar();
        }
    }
};

/**
 * Handler for viewer.documentChanged event
 * 
 * This event fires when the user makes changes to:
 * - Annotations (add, modify, delete)
 * - Form fields (add, modify, delete)
 * - Page organizer (reorder, insert, delete pages)
 * 
 * We package these changes as operations and send them to the server
 * for broadcast to other collaborators.
 */
pdfViewer.documentChanged = function (args: any): void {
    try {
        // Handle AnnotationChangedEventArgs
        if (args && 'annotationId' in args) {
            console.log('[App] Annotation changed:', args.annotationId);

            let operations: any[] = [];
            if (args.action) {
                operations = [{
                    action: args.action,
                    annotation: args.annotationId,
                    type: 'annotation',
                    isRedacted: args.isRedacted
                }];
            } else {
                operations = [{
                    type: 'removeUser',
                    currentUser: collaborationState.currentUser
                }];
            }

            console.log('[App] Annotation operation:', operations);
            if (collaborationState.adapter && collaborationState.adapter.sendActionToServer) {
                collaborationState.adapter.sendActionToServer(operations).catch((err: Error) =>
                    console.error('[App] Error sending annotation operation:', err)
                );
            }
        }
        // Handle FormFieldChangedEventArgs
        else if (args && 'formField' in args && !('fieldName' in args)) {
            console.log('[App] Form field changed:', args.formField);

            const operations = [{
                action: args.action,
                formField: args.formField,
                type: 'formField'
            }];

            console.log('[App] Form field operation:', operations);
            if (collaborationState.adapter && collaborationState.adapter.sendActionToServer) {
                collaborationState.adapter.sendActionToServer(operations).catch((err: Error) =>
                    console.error('[App] Error sending form field operation:', err)
                );
            }
        }
        // Handle FormFieldFocusOutEventArgs (form field value updates)
        else if (args && 'fieldName' in args) {
            console.log('[App] Form field updated:', args.fieldName);

            const operations = [{
                action: 'formFieldUpdate',
                data: args,
                type: 'formField'
            }];

            console.log('[App] Form field update operation:', operations);
            if (collaborationState.adapter && collaborationState.adapter.sendActionToServer) {
                collaborationState.adapter.sendActionToServer(operations).catch((err: Error) =>
                    console.error('[App] Error sending form field update:', err)
                );
            }
        }
        // Handle PageOrganizerSavedEventArgs
        else if (args && 'organizePageActions' in args) {
            console.log('[App] Page organizer changed');

            const eventData = args;
            const actionDetails = args.organizePageActions && typeof args.organizePageActions === 'string'
                ? JSON.parse(args.organizePageActions)
                : '';

            let operations: any[] = [];

            if (eventData && eventData.savedDocument === null && actionDetails.action && actionDetails.action === 'applyCancelled') {
                // User cancelled the page organizer operation
                operations = [{
                    type: 'removeUser',
                    currentUser: collaborationState.currentUser
                }];
                console.log('[App] Page organizer operation cancelled');
            }
            else if (eventData && eventData.savedDocument !== null && actionDetails.length > 0 && actionDetails[0].action !== 'applyCancelled') {
                // Page organizer operation applied successfully
                operations = [{
                    action: 'pageOrganizerUpdate',
                    data: args.organizePageActions,
                    type: 'pageOrganizer'
                }];
                console.log('[App] Page organizer operation:', operations);
            } else {
                console.log('[App] No valid page organizer operation to send');
                return;
            }

            if (collaborationState.adapter && collaborationState.adapter.sendActionToServer) {
                collaborationState.adapter.sendActionToServer(operations).catch((err: Error) =>
                    console.error('[App] Error sending page organizer operation:', err)
                );
            }
        }

    } catch (error) {
        console.error('[App] Error processing document change:', error);
    }
};

/**
 * Handle viewer events
 */
pdfViewer.documentLoad = function (): void {
    console.log('[App] PDF document loaded successfully');
};

// ============================================================
// Cleanup on page unload
// ============================================================

window.addEventListener('beforeunload', () => {
    // Cleanup collaboration resources on page unload
    if (collaborationState.client) {
        console.log('[App] Cleaning up collaboration client');
        collaborationState.client = null;
    }
    if (collaborationState.adapter) {
        console.log('[App] Cleaning up collaboration adapter');
        collaborationState.adapter = null;
    }
});
