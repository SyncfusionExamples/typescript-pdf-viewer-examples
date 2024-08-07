import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

pdfviewer.appendTo('#PdfViewer');
document.getElementById('openBookmark').addEventListener('click', () => {
    // Open Bookmark pane
    pdfviewer.bookmarkViewModule.openBookmarkPane();
});

document.getElementById('closeBookmark').addEventListener('click', () => {
    // close Bookmark pane
    pdfviewer.bookmarkViewModule.closeBookmarkPane();
});