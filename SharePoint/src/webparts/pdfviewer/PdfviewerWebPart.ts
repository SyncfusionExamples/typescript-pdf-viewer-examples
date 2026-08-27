
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { SPHttpClient } from '@microsoft/sp-http';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import { PdfViewer, Toolbar, Magnification, Navigation,
         Annotation, LinkAnnotation, ThumbnailView,
         BookmarkView, TextSelection, TextSearch,
         FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation,
                 Annotation, LinkAnnotation, ThumbnailView,
                 BookmarkView, TextSelection, TextSearch,
                 FormFields, FormDesigner);

export interface IPdfViewerWebPartProps {
  description: string;
}

interface IPdfFile {
  name: string;
  url: string;
}

export default class PdfViewerWebPart extends BaseClientSideWebPart<IPdfViewerWebPartProps> {

  private pdfViewer: PdfViewer | undefined;
  private pdfFiles: IPdfFile[] = [];

  public render(): void {

    this.domElement.innerHTML = `
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/34.2.5/tailwind3.css" />
    <div style="padding: 15px; background: #f5f5f5; border-bottom: 1px solid #ddd;">
      <div style="margin-bottom: 10px;">
        <label for="pdfDropdown" style="display: block; margin-bottom: 5px; font-weight: bold;color: black;">Select PDF Document:</label>
        <select id="pdfDropdown" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
          <option value="">-- Loading documents --</option>
        </select>
      </div>
      <div id="loadingMessage" style="color: #666; font-size: 12px;">Loading PDF documents from SiteAssets/pdfs...</div>
      <div id="errorMessage" style="color: red; font-size: 12px; display: none;"></div>
    </div>
    <input type="file" id="pv-fileUpload" accept=".doc,.docx,.rtf,.docm,.dotm,.dotx,.dot,.xls,.xlsx,.pdf" style="display: none; visibility: hidden; width: 0; height: 0;" />
    <div id="PdfViewer" style="height: 750px; width: 100%;"></div>
    `;

    const siteUrl = this.context.pageContext.web.absoluteUrl;
    this.fetchPdfDocuments(siteUrl);
    this.initializePdfViewer();
    this.setupFileUploadHandler();
  }

  private async fetchPdfDocuments(siteUrl: string): Promise<void> {
    try {
      const targetSite = "YOUR-SHAREPOINT-SITE";

      const url = `${targetSite}/_api/web/GetFolderByServerRelativeUrl('{your-site-name}/{documents-containing-path}')/Files`;
      
      const response = await this.context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PDFs: ${response.statusText}`);
      }
      const data = await response.json();
      this.pdfFiles = data.value
        .filter((item: any) => {
          const fileName = item.Name.toLowerCase();
          // Include PDF, Word, and Excel files
          return fileName.endsWith('.pdf') ||
                 fileName.endsWith('.doc') ||
                 fileName.endsWith('.docx') ||
                 fileName.endsWith('.dot') ||
                 fileName.endsWith('.dotx') ||
                 fileName.endsWith('.docm') ||
                 fileName.endsWith('.dotm') ||
                 fileName.endsWith('.rtf') ||
                 fileName.endsWith('.xls') ||
                 fileName.endsWith('.xlsx');
        })
        .map((item: any) => ({
          name: item.Name,
          url: `${siteUrl}${item.ServerRelativeUrl}`
        }));
      this.populateDropdown();
      
    } catch (error) {
      console.error('Error fetching PDF documents:', error);
      const errorDiv = document.getElementById('errorMessage');
      if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Error loading documents: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }
  }

  private setupFileUploadHandler(): void {
    const fileUploadInput = document.getElementById('pv-fileUpload') as HTMLInputElement;
    if (fileUploadInput) {
      fileUploadInput.addEventListener('change', (e: Event) => {
        this.readFile(e);
      });
    }
  }

  private readFile = (args: Event): void => {
    const input = args.target as HTMLInputElement;
    const file: File | undefined = input.files?.[0];
    
    if (!file) {
      return;
    }

    const reader: FileReader = new FileReader();
    const fileExtension: string = file.name.split('.').pop()?.toLowerCase() || '';

    reader.addEventListener('load', () => {
      const base64Data: string = reader.result as string;
      this.convertAndLoadDocument(base64Data, fileExtension);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
    input.value = '';
  };

  private convertAndLoadDocument(fileData: string, fileType: string): void {
    const conversionEndpoint = "https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/LoadFile";
    let base64Data = fileData;
    
    if (fileData.indexOf('http') === 0) {
      this.fetchFileAndConvert(fileData, fileType, conversionEndpoint);
      return;
    }

    const postData: string = JSON.stringify({
      'data': base64Data,
      'type': fileType
    });

    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('Post', conversionEndpoint, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Load the converted PDF
        const pdfBase64 = (xhr as XMLHttpRequest).responseText;
        if (this.pdfViewer) {
          this.pdfViewer.documentPath = '';
          this.pdfViewer.documentPath = pdfBase64;
        }
      } else {
        console.error('Conversion failed:', xhr.statusText);
        alert('Failed to convert document. Please try again.');
      }
    };

    xhr.onerror = () => {
      console.error('Error converting document');
      alert('Error converting document. Please check the server connection.');
    };

    xhr.send(postData);
  }

  private fetchFileAndConvert(fileUrl: string, fileType: string, conversionEndpoint: string): void {
    // Fetch file from URL and convert to Base64
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const reader = new FileReader();
        
        reader.onload = () => {
          const base64Data = reader.result as string;
          this.sendConversionRequest(base64Data, fileType, conversionEndpoint);
        };

        reader.onerror = () => {
          console.error('Error reading file blob');
          alert('Error reading file. Please try again.');
        };

        reader.readAsDataURL(blob);
      } else {
        console.error('Failed to fetch file:', xhr.statusText);
        alert('Failed to load document file. Please try again.');
      }
    };

    xhr.onerror = () => {
      console.error('Error fetching file');
      alert('Error loading file. Please check the server connection.');
    };

    xhr.send();
  }

  private sendConversionRequest(base64Data: string, fileType: string, conversionEndpoint: string): void {
    const postData: string = JSON.stringify({
      'data': base64Data,
      'type': fileType
    });

    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('Post', conversionEndpoint, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200) {
        const pdfBase64 = (xhr as XMLHttpRequest).responseText;
        if (this.pdfViewer) {
          this.pdfViewer.documentPath = '';
          this.pdfViewer.documentPath = pdfBase64;
        }
      } else {
        console.error('Conversion failed:', xhr.statusText);
        alert('Failed to convert document. Please try again.');
      }
    };

    xhr.onerror = () => {
      console.error('Error converting document');
      alert('Error converting document. Please check the server connection.');
    };

    xhr.send(postData);
  }

  private populateDropdown(): void {
    const dropdown = document.getElementById('pdfDropdown') as HTMLSelectElement;
    const loadingMessage = document.getElementById('loadingMessage');

    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">-- Select a document --</option>';

    this.pdfFiles.forEach((file) => {
      const option = document.createElement('option');
      option.value = file.url;
      option.textContent = file.name;
      dropdown.appendChild(option);
    });

    if (loadingMessage) {
      loadingMessage.style.display = 'none';
    }

    // Add change event listener
    dropdown.addEventListener('change', (e: Event) => {
      const selectedUrl = (e.target as HTMLSelectElement).value;
      if (selectedUrl) {
        this.loadPdfDocument(selectedUrl);
      }
    });
  }

  private initializePdfViewer(): void {
    this.pdfViewer = new PdfViewer({
      documentPath: '{Default-Document-Location-of-Sharepoint}',
      resourceUrl: '${YOUR-LOCATION-FOR-RESOURCE}/ej2-pdfviewer-lib',
      toolbarSettings: { 
        showTooltip: true, 
        toolbarItems: [{ prefixIcon: 'e-icons e-folder', id: 'pv_file_Open', tooltipText: 'Open' }, 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption',]
      },
      enableAnnotationToolbar: false,
      enableDownload: true,
      enableStickyNotesAnnotation: false,
      enablePageOrganizer: false,
      annotationSettings: {  
        isLock: true,  
      },
      contextMenuOption: 'None',
      documentLoad: () => {
        const viewer = (document.getElementById('PdfViewer') as any).ej2_instances[0];
        const formField = viewer.retrieveFormFields();
        for (let x = 0; x < formField.length; x++) {
          viewer.formDesignerModule.updateFormField(viewer.formFieldCollections[x], {
            isReadOnly: true,
          });
        }
      },
      toolbarClick: (args) => {
        if (args.item.id === 'pv_file_Open') {
          let fileUpload: HTMLElement | null = document.getElementById('pv-fileUpload');
          fileUpload?.click();
        }
      }
    });

    this.pdfViewer.appendTo('#PdfViewer');
  }

  private loadPdfDocument(url: string): void {
    // Load PDF via service conversion (same as toolbar upload)
    const fileExtension: string = url.split('.').pop()?.toLowerCase() || 'pdf';
    if (this.pdfViewer) {
      this.pdfViewer.unload();
    }
    if (fileExtension === 'pdf') {
      // Direct PDF - load without conversion
      if (this.pdfViewer) {
        this.pdfViewer.load(url, "null");
      }
    } else {
      // Convert via service for non-PDF files
      this.convertAndLoadDocument(url, fileExtension);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration():
    IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: 'PDF Viewer Settings'
          },
          groups: [
            {
              groupName: 'Basic Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
