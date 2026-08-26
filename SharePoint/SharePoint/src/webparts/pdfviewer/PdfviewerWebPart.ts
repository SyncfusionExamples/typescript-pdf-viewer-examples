
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
    <div id="PdfViewer" style="height: 750px; width: 100%;"></div>
    `;

    const siteUrl = this.context.pageContext.web.absoluteUrl;
    console.log("Site URL: ", siteUrl);

    // Fetch PDF documents
    this.fetchPdfDocuments(siteUrl);

    // Initialize PDF Viewer
    this.initializePdfViewer();
  }

  private async fetchPdfDocuments(siteUrl: string): Promise<void> {
    try {
      const targetSite = "YOUR-SHAREPOINT-SITE";

      const url = `${targetSite}/_api/web/GetFolderByServerRelativeUrl('/sites/{your-site-name}/{documents-containing-path}')/Files`;
      
      const response = await this.context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PDFs: ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);

      this.pdfFiles = data.value
        .filter((item: any) =>
          item.Name.toLowerCase().endsWith('.pdf'))
        .map((item: any) => ({
          name: item.Name,
          url: `${siteUrl}${item.ServerRelativeUrl}`
        }));

      console.log('PDF Files found:', this.pdfFiles);
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
      documentPath: 'https://cdn.syncfusion.com/content/pdf/gis-succinctly.pdf', // Will be set when user selects a document
      resourceUrl: '${YOUR-LOCATION-FOR-RESOURCE}/ej2-pdfviewer-lib',
      toolbarSettings: { 
        showTooltip: true, 
        toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption',]
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
      }
    });

    this.pdfViewer.appendTo('#PdfViewer');
  }

  private loadPdfDocument(url: string): void {
    if (this.pdfViewer) {
      this.pdfViewer.load(url, "null");
      console.log('Loading PDF:', url);
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
