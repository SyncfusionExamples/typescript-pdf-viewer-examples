import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
pdfviewer.enablePageOrganizer = true;
pdfviewer.isPageOrganizerOpen = true;
pdfviewer.pageOrganizerSettings = {canDelete: true, canInsert: true, canRotate: true, canCopy: true, canRearrange: true}
pdfviewer.appendTo('#PdfViewer');

pdfviewer.documentLoad = function(){
    var isInitialLoading = false;
    if (isInitialLoading) {
        pdfviewer.isPageOrganizerOpen = true;
      isInitialLoading = false;
    } else {
        pdfviewer.isPageOrganizerOpen = false;
    }
};