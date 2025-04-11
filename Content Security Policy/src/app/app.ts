import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageInfoModel } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

// const pdfviewer: PdfViewer = new PdfViewer({
//     documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
//     resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.5/dist/ej2-pdfviewer-lib",
// });
// pdfviewer.appendTo('#PdfViewer');

const pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/gis-succinctly.pdf";
pdfviewer.resourceUrl="https://cdn.syncfusion.com/ej2/29.1.35/dist/ej2-pdfviewer-lib";
pdfviewer.appendTo('#PdfViewer');