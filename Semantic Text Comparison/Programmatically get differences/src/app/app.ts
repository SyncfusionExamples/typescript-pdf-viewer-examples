import '../styles/styles.css';
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-pdfviewer';

// ============================================================
// Type Definitions
// ============================================================

interface DifferenceAnnotation {
    textDiffType: string;
    textDiffData: string;
    annotation?: {
        bounds?: any;
        color?: string;
    };
}

interface PageAnnotations {
    pageNumber: number;
    differenceAnnotations?: DifferenceAnnotation[];
}

interface SemanticComparisonResult {
    originalDocumentAnnotations?: PageAnnotations[];
    modifiedDocumentAnnotations?: PageAnnotations[];
    totalTextDiffCount?: number;
}

interface DifferenceItem {
    pageNumber: number;
    type: string;
    text: string;
    bounds?: any;
    color?: string;
}

interface ComparisonOptions {
    beforeColor: string;
    afterColor: string;
    beforeColorOpacity: number;
    afterColorOpacity: number;
    enableHighlights: boolean;
}

interface Report {
    totalDifferences: number;
    summary: {
        added: number;
        deleted: number;
        modified: number;
    };
    byPage: any;
    timestamp: string;
}

// ============================================================
// Semantic Text Comparison Application
// ============================================================

const appState = {
    viewer1: null as any,
    viewer2: null as any,
    loadedCount: 0,
    viewersLoaded: false,
    synchronizationEnabled: true,
    highlightsEnabled: true,
    comparisonResult: null as any
};

// ============================================================
// Configuration Constants
// ============================================================

const RESOURCE_URL = 'https://cdn.syncfusion.com/ej2/34.2.4/dist/ej2-pdfviewer-lib';
const ORIGINAL_PDF = 'https://cdn.syncfusion.com/content/pdf/original-document.pdf';
const MODIFIED_PDF = 'https://cdn.syncfusion.com/content/pdf/modified-document.pdf';

// ============================================================
// Initialize PDF Viewer Services
// ============================================================

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer);

// ============================================================
// UI Control Panel Creation
// ============================================================

function createControlPanel(): void {
    const panel = document.getElementById('controlPanel');
    if (!panel) return;

    panel.innerHTML = `
    <!-- Main Control Buttons -->
    <button class="btn-primary" onclick="handleCompare()">Compare Documents</button>
    <button class="btn-success" onclick="handleToggleHighlights()">
      <span id="highlightBtnText">Disable Highlights</span>
    </button>
    <button class="btn-warning" onclick="handleToggleSync()">
      <span id="syncBtnText">Disable Sync</span>
    </button>
    <button class="btn-danger" onclick="handleClearAnnotations()">Clear Annotations</button>

    <!-- Separator -->
    <div class="separator"></div>

    <!-- Test Buttons -->
    <button class="btn-info" onclick="getDifferencesByType('Added')">Test: Get Added</button>
    <button class="btn-info" onclick="getDifferencesByType('Deleted')">Test: Get Deleted</button>
    <button class="btn-info" onclick="getDifferencesByType('Modified')">Test: Get Modified</button>
    <button class="btn-secondary" onclick="groupDifferencesByPage()">Test: Group by Page</button>
    <button class="btn-secondary" onclick="generateReport()">Test: Generate Report</button>
  `;
}

// ============================================================
// Event Handlers
// ============================================================

function handleDocumentLoad(): void {
    appState.loadedCount++;
    console.log(`[App] Document loaded (${appState.loadedCount}/2)`);

    if (appState.loadedCount === 2 && appState.viewer1 && appState.viewer2) {
        appState.viewersLoaded = true;
        console.log('[App] Both viewers loaded - synchronization enabled');
        syncViewers(appState.viewer1, appState.viewer2, appState.synchronizationEnabled);
    }
}

function handleToggleSync(): void {
    const newSyncState = !appState.synchronizationEnabled;
    appState.synchronizationEnabled = newSyncState;

    const btnText = document.getElementById('syncBtnText');
    if (btnText) {
        btnText.textContent = newSyncState ? 'Disable Sync' : 'Enable Sync';
    }

    if (appState.viewer1 && appState.viewer2) {
        syncViewers(appState.viewer1, appState.viewer2, newSyncState);
        console.log(`[App] Synchronization ${newSyncState ? 'enabled' : 'disabled'}`);
    }
}

function handleToggleHighlights(): void {
    const newHighlightsState = !appState.highlightsEnabled;
    appState.highlightsEnabled = newHighlightsState;

    const btnText = document.getElementById('highlightBtnText');
    if (btnText) {
        btnText.textContent = newHighlightsState ? 'Disable Highlights' : 'Enable Highlights';
    }

    // Re-apply comparison with updated highlight state
    if (appState.viewersLoaded && appState.viewer1 && appState.viewer2) {
        handleCompare();
    }
}

function handleClearAnnotations(): void {
    try {
        if (appState.viewer1 && appState.viewer2) {
            console.log('[App] Clearing annotations');

            // Remove semantic text compare annotations
            if (typeof appState.viewer1.removeSemanticTextCompare === 'function') {
                appState.viewer1.removeSemanticTextCompare(appState.viewer2);
            }

            appState.comparisonResult = null;
            console.log('[App] Annotations cleared');
        }
    } catch (error) {
        console.error('[App] Error clearing annotations:', error);
    }
}

// ============================================================
// Synchronization
// ============================================================

function syncViewers(viewer1: any, viewer2: any, enabled: boolean): void {
    try {
        if (enabled && typeof viewer1.syncViewers === 'function') {
            viewer1.syncViewers(viewer2, true);
            console.log('[App] Viewers synchronized');
        } else if (!enabled && typeof viewer1.syncViewers === 'function') {
            viewer1.syncViewers(viewer2, false);
            console.log('[App] Viewers desynchronized');
        }
    } catch (error) {
        console.error('[App] Error syncing viewers:', error);
    }
}

// ============================================================
// Semantic Text Comparison Methods
// ============================================================

/**
 * Performs semantic text comparison between two PDF documents
 */
async function handleCompare(): Promise<void> {
    try {
        if (!appState.viewersLoaded || !appState.viewer1 || !appState.viewer2) {
            console.warn('[App] Viewers not ready for comparison');
            return;
        }

        console.log('[App] Starting semantic text comparison...');

        const options = {
            beforeColor: '#FF0000',      // Red for original
            afterColor: '#00FF00',       // Green for modified
            beforeColorOpacity: 0.4,
            afterColorOpacity: 0.4,
            enableHighlights: appState.highlightsEnabled
        };

        if (typeof appState.viewer1.semanticTextCompare !== 'function') {
            console.error('[App] semanticTextCompare method not available');
            return;
        }

        const result = await appState.viewer1.semanticTextCompare(appState.viewer2, options);
        appState.comparisonResult = result;

        console.log('[App] Full Comparison Result:', result);

        // Parse the result structure
        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const totalTextDiffCount = result?.totalTextDiffCount || 0;

        console.log('[App] Total Text Differences:', totalTextDiffCount);
        console.log('[App] Original Document Pages:', originalAnnotations.length);
        console.log('[App] Modified Document Pages:', modifiedAnnotations.length);

        // Extract and categorize all differences
        let addedCount = 0;
        let deletedCount = 0;
        let modifiedCount = 0;

        // Process original document annotations (deletions and modifications)
        originalAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            console.log(`\n[Original] Page ${pageNum}:`);
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                const type = diff.textDiffType;
                const text = diff.textDiffData;
                if (type === 'deleted') deletedCount++;
                if (type === 'modified') modifiedCount++;
                if (type === 'added') addedCount++;
                console.log(`  - ${type.toUpperCase()}: "${text?.substring(0, 50)}..."`);
            });
        });

        // Process modified document annotations
        modifiedAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            console.log(`\n[Modified] Page ${pageNum}:`);
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                const type = diff.textDiffType;
                const text = diff.textDiffData;
                console.log(`  - ${type.toUpperCase()}: "${text?.substring(0, 50)}..."`);
            });
        });

        // Display summary
        console.log('\n=== COMPARISON SUMMARY ===');
        console.log(`Total Differences: ${totalTextDiffCount}`);
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Added: ${addedCount}`);
        console.log(`Modified: ${modifiedCount}`);

    } catch (error) {
        console.error('[App] Error during comparison:', error);
    }
}

/**
 * Filters and retrieves differences by type (Added, Deleted, Modified)
 */
async function getDifferencesByType(type: string): Promise<DifferenceItem[]> {
    try {
        if (!appState.viewer1 || !appState.viewer2) {
            console.warn('[App] Viewers not ready');
            return [];
        }

        console.log(`[App] Getting ${type} differences...`);

        const options = {
            beforeColor: '#FF0000',
            afterColor: '#00FF00',
            beforeColorOpacity: 0.4,
            afterColorOpacity: 0.4,
            enableHighlights: true
        };

        if (typeof appState.viewer1.semanticTextCompare !== 'function') {
            console.error('[App] semanticTextCompare method not available');
            return [];
        }

        const result = await appState.viewer1.semanticTextCompare(appState.viewer2, options);
        appState.comparisonResult = result;

        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const differences: any[] = [];

        // Extract differences by type from original annotations
        originalAnnotations.forEach((pageAnnotations: any) => {
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                if (diff.textDiffType === type.toLowerCase()) {
                    differences.push({
                        pageNumber: pageAnnotations.pageNumber,
                        type: diff.textDiffType,
                        text: diff.textDiffData,
                        bounds: diff.annotation?.bounds,
                        color: diff.annotation?.color
                    });
                }
            });
        });

        // Extract differences by type from modified annotations
        modifiedAnnotations.forEach((pageAnnotations: any) => {
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                if (diff.textDiffType === type.toLowerCase()) {
                    // Avoid duplicates
                    const exists = differences.find(d =>
                        d.pageNumber === pageAnnotations.pageNumber &&
                        d.text === diff.textDiffData
                    );
                    if (!exists) {
                        differences.push({
                            pageNumber: pageAnnotations.pageNumber,
                            type: diff.textDiffType,
                            text: diff.textDiffData,
                            bounds: diff.annotation?.bounds,
                            color: diff.annotation?.color
                        });
                    }
                }
            });
        });

        console.log(`[App] ${type} differences (${differences.length}):`, differences);
        return differences;

    } catch (error) {
        console.error('[App] Error filtering differences:', error);
        return [];
    }
}

/**
 * Groups all differences by page number
 */
async function groupDifferencesByPage(): Promise<any> {
    try {
        if (!appState.viewer1 || !appState.viewer2) {
            console.warn('[App] Viewers not ready');
            return {};
        }

        console.log('[App] Grouping differences by page...');

        const options = {
            beforeColor: '#FF0000',
            afterColor: '#00FF00',
            beforeColorOpacity: 0.4,
            afterColorOpacity: 0.4,
            enableHighlights: true
        };

        if (typeof appState.viewer1.semanticTextCompare !== 'function') {
            console.error('[App] semanticTextCompare method not available');
            return {};
        }

        const result = await appState.viewer1.semanticTextCompare(appState.viewer2, options);
        appState.comparisonResult = result;

        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const grouped: any = {};

        // Group original document differences by page
        originalAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            if (!grouped[pageNum]) {
                grouped[pageNum] = { original: [], modified: [] };
            }
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                grouped[pageNum].original.push({
                    type: diff.textDiffType,
                    text: diff.textDiffData,
                    bounds: diff.annotation?.bounds,
                    color: diff.annotation?.color
                });
            });
        });

        // Group modified document differences by page
        modifiedAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            if (!grouped[pageNum]) {
                grouped[pageNum] = { original: [], modified: [] };
            }
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                grouped[pageNum].modified.push({
                    type: diff.textDiffType,
                    text: diff.textDiffData,
                    bounds: diff.annotation?.bounds,
                    color: diff.annotation?.color
                });
            });
        });

        console.log('[App] Differences grouped by page:', grouped);
        return grouped;

    } catch (error) {
        console.error('[App] Error grouping differences:', error);
        return {};
    }
}

/**
 * Generates a detailed comparison report
 */
async function generateReport(): Promise<Report | undefined> {
    try {
        if (!appState.viewer1 || !appState.viewer2) {
            console.warn('[App] Viewers not ready');
            return;
        }

        console.log('[App] Generating detailed comparison report...');

        const options = {
            beforeColor: '#FF0000',
            afterColor: '#00FF00',
            beforeColorOpacity: 0.4,
            afterColorOpacity: 0.4,
            enableHighlights: true
        };

        if (typeof appState.viewer1.semanticTextCompare !== 'function') {
            console.error('[App] semanticTextCompare method not available');
            return;
        }

        const result = await appState.viewer1.semanticTextCompare(appState.viewer2, options);
        appState.comparisonResult = result;

        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const totalTextDiffCount = result?.totalTextDiffCount || 0;

        let addedCount = 0;
        let deletedCount = 0;
        let modifiedCount = 0;
        const byPage: any = {};

        // Process original annotations
        originalAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            if (!byPage[pageNum]) {
                byPage[pageNum] = { deleted: 0, added: 0, modified: 0, details: [] };
            }
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                const type = diff.textDiffType;
                if (type === 'deleted') {
                    deletedCount++;
                    byPage[pageNum].deleted++;
                } else if (type === 'added') {
                    addedCount++;
                    byPage[pageNum].added++;
                } else if (type === 'modified') {
                    modifiedCount++;
                    byPage[pageNum].modified++;
                }
                byPage[pageNum].details.push({
                    type,
                    text: diff.textDiffData?.substring(0, 100),
                    color: diff.annotation?.color
                });
            });
        });

        // Process modified annotations
        modifiedAnnotations.forEach((pageAnnotations: any) => {
            const pageNum = pageAnnotations.pageNumber;
            if (!byPage[pageNum]) {
                byPage[pageNum] = { deleted: 0, added: 0, modified: 0, details: [] };
            }
            pageAnnotations.differenceAnnotations?.forEach((diff: any) => {
                const type = diff.textDiffType;
                if (type === 'deleted') {
                    deletedCount++;
                    byPage[pageNum].deleted++;
                } else if (type === 'added') {
                    addedCount++;
                    byPage[pageNum].added++;
                } else if (type === 'modified') {
                    modifiedCount++;
                    byPage[pageNum].modified++;
                }
                byPage[pageNum].details.push({
                    type,
                    text: diff.textDiffData?.substring(0, 100),
                    color: diff.annotation?.color
                });
            });
        });

        const report: Report = {
            totalDifferences: totalTextDiffCount,
            summary: {
                added: addedCount,
                deleted: deletedCount,
                modified: modifiedCount
            },
            byPage: byPage,
            timestamp: new Date().toISOString()
        };

        console.log('=== DETAILED COMPARISON REPORT ===');
        console.log(`Total Text Differences: ${report.totalDifferences}`);
        console.log(`Added: ${report.summary.added}`);
        console.log(`Deleted: ${report.summary.deleted}`);
        console.log(`Modified: ${report.summary.modified}`);
        console.log('\nBreakdown by Page:');
        Object.entries(byPage).forEach(([pageNum, data]: [string, any]) => {
            console.log(`  Page ${pageNum}: +${data.added} -${data.deleted} ~${data.modified}`);
        });
        console.log('\nFull Report:', report);

        return report;

    } catch (error) {
        console.error('[App] Error generating report:', error);
    }
}

// ============================================================
// Export functions to global scope for onclick handlers
// ============================================================

declare global {
    interface Window {
        handleCompare: typeof handleCompare;
        handleToggleHighlights: typeof handleToggleHighlights;
        handleToggleSync: typeof handleToggleSync;
        handleClearAnnotations: typeof handleClearAnnotations;
        getDifferencesByType: typeof getDifferencesByType;
        groupDifferencesByPage: typeof groupDifferencesByPage;
        generateReport: typeof generateReport;
    }
}

window.handleCompare = handleCompare;
window.handleToggleHighlights = handleToggleHighlights;
window.handleToggleSync = handleToggleSync;
window.handleClearAnnotations = handleClearAnnotations;
window.getDifferencesByType = getDifferencesByType;
window.groupDifferencesByPage = groupDifferencesByPage;
window.generateReport = generateReport;

// ============================================================
// Initialization
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('[App] Initializing Semantic Text Comparison...');

    // Create control panel
    createControlPanel();

    // Initialize PDF Viewer 1 (Original Document)
    appState.viewer1 = new PdfViewer({
        documentPath: ORIGINAL_PDF,
        resourceUrl: RESOURCE_URL,
        documentLoad: handleDocumentLoad
    });

    appState.viewer1.appendTo('#pdfViewer1');
    console.log('[App] Viewer 1 initialized');

    // Initialize PDF Viewer 2 (Modified Document)
    appState.viewer2 = new PdfViewer({
        documentPath: MODIFIED_PDF,
        resourceUrl: RESOURCE_URL,
        documentLoad: handleDocumentLoad
    });

    appState.viewer2.appendTo('#pdfViewer2');
    console.log('[App] Viewer 2 initialized');

    console.log('[App] Initialization complete - Waiting for both viewers to load...');
});
