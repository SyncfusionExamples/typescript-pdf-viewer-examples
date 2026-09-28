import '../styles/styles.css';
import { PdfComparer } from '@syncfusion/ej2-pdfviewer';

let pdfComparers: PdfComparer = new PdfComparer();

pdfComparers.originalDocumentPath = 'https://cdn.syncfusion.com/content/pdf/original-document.pdf';
pdfComparers.modifiedDocumentPath = 'https://cdn.syncfusion.com/content/pdf/modified-document.pdf';

pdfComparers.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib';

pdfComparers.appendTo('#PdfViewer');