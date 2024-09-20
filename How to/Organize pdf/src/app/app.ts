import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-pdfviewer-lib";
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