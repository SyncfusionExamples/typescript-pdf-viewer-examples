
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer, 
    ExtractTextOption} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer);

let viewer:  PdfViewer = new PdfViewer();
viewer.documentPath= 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
viewer.resourceUrl= "https://cdn.syncfusion.com/ej2/29.1.33/dist/ej2-pdfviewer-lib";

viewer.appendTo("#PdfViewer");


const findTextButton = document.getElementById('findText');
if (findTextButton) {
    findTextButton.addEventListener('click', function () {
      viewer.textSearchModule.findTextAsync('pdf', false).then(res => {
          console.log(res);  // Logs the search result for the term 'pdf'
      });
    });
}


const findTextButtons = document.getElementById('findTexts');
if(findTextButtons){
    findTextButtons.addEventListener('click', function () {
      viewer.textSearchModule.findTextAsync(['pdf', 'the'], false).then(res => {
          console.log(res);  // Logs the search result for the terms 'pdf' and 'the'
      });
    });
}