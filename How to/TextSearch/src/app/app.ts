import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-pdfviewer-lib";

pdfviewer.appendTo('#PdfViewer');
let textbounds = document.getElementById('textbounds');
if(textbounds) {
    textbounds.addEventListener('click', function() {
        // Find and get the bounds of a text
        console.log(pdfviewer.textSearch.findText('adobe', false));
        // Find and get the bounds of a text on the desired page
        console.log(pdfviewer.textSearch.findText('adobe', false, 7));
        // Find and get the bounds of the list of text
        console.log(pdfviewer.textSearch.findText(['adobe', 'pdf'], false));
        // Find and get the bounds of the list of text on desired page
        console.log(pdfviewer.textSearch.findText(['adobe', 'pdf'], false, 7));
    });
}