import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageInfoModel, PageOrganizer } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageOrganizer);

const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib",
});

viewer.appendTo('#PdfViewer');
    // Enable/Disable the Extract Pages Tool
//viewer.pageOrganizerSettings = { canExtractPages: true };
//viewer.pageOrganizerSettings = { showExtractPagesOption: false }

//Extract Page on Button Click
document.getElementById('extractPage')?.addEventListener('click', function () {
  // Extract pages 1 and 2
  var array = viewer.extractPages("1,2");

  // Load the extracted pages back into the viewer
  viewer.load(array,"");

  // Inspect the result if needed
  console.log(array);
});