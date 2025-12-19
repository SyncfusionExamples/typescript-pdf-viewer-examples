// TypeScript
import {
    PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar,
    Magnification, Annotation, FormDesigner, FormFields
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
    TextSelection, TextSearch, Print, Navigation, Toolbar,
    Magnification, Annotation, FormDesigner, FormFields
);

// Pick ONE of the two initialisations below ----------------------------------
// Stand-alone (client-side) viewer
const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});
// ---------------------------------------------------------------------------
// Server-backed viewer
/*
const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    serviceUrl:  'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer'
});
*/
// ---------------------------------------------------------------------------

viewer.appendTo('#pdfViewer');

// Helper to log a label + result
const log = (label: string, value: any) => console.log(label, value);

// Button wiring --------------------------------------------------------------
document.getElementById('btn-all')?.addEventListener('click', () => {
    log('findText("pdf", false)', viewer.textSearch.findText('pdf', false));
});

document.getElementById('btn-page')?.addEventListener('click', () => {
    log('findText("pdf", false, 7)', viewer.textSearch.findText('pdf', false, 7));
});

document.getElementById('btn-list-all')?.addEventListener('click', () => {
    log('findText(["adobe","pdf"], false)',
        viewer.textSearch.findText(['adobe', 'pdf'], false));
});

document.getElementById('btn-list-page')?.addEventListener('click', () => {
    log('findText(["adobe","pdf"], false, 7)',
        viewer.textSearch.findText(['adobe', 'pdf'], false, 7));
});