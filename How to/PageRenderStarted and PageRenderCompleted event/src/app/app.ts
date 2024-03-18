import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
pdfviewer.appendTo('#PdfViewer');
pdfviewer.pageRenderInitiate = (args: any) => {
    // This method is called when the page rendering starts
   console.log('Rendering of pages started');
   console.log(args);
 };
 
pdfviewer.pageRenderComplete = (args: any) => {
    // This method is called when the page rendering completes
    console.log('Rendering of pages completed');
    console.log(args);
};