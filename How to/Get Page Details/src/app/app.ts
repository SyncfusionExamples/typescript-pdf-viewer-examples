import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageInfoModel } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib",
});

// Append the PdfViewer to the DOM
pdfviewer.appendTo('#PdfViewer');

// Button event listener for getting page information
document.getElementById('getPageInfo')?.addEventListener('click', function() {
    // Set the page index for which info is required
    let pageIndex: number = 0;

    // To Retrieve and log the page information
    console.log(pdfviewer.getPageInfo(pageIndex));

     // Log the specific page information details to the console
    const pageInfo:PageInfoModel = pdfviewer.getPageInfo(pageIndex);
    console.log(`Page Info for Page Index ${pageIndex}:`);
    console.log(`Height: ${pageInfo.height}`);
    console.log(`Width: ${pageInfo.width}`);
    console.log(`Rotation: ${pageInfo.rotation}`);
  });