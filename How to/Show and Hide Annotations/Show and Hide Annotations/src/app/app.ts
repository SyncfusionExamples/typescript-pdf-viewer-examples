import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer);

// Create the PDF viewer instance
let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/30.1.37/dist/ej2-pdfviewer-lib';
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';

// Append the viewer to the container element
pdfviewer.appendTo('#PdfViewer');

// Variable to store exported annotations
let exportObject: any = "";

// Function to hide annotations
function HideAnnotations(): void {
    pdfviewer.exportAnnotationsAsObject().then(function(value: any) {
        exportObject = value;
        pdfviewer.deleteAnnotations();
    });
}

// Function to unhide annotations
function UnHideAnnotations(): void {
    pdfviewer.importAnnotation(JSON.parse(exportObject));
}

// Add event listeners to buttons
document.getElementById('hideBtn')?.addEventListener('click', HideAnnotations);
document.getElementById('unhideBtn')?.addEventListener('click', UnHideAnnotations);