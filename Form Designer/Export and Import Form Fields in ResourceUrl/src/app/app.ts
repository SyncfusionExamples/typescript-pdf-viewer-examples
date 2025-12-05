import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, FormFieldDataFormat } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner
);

// Initialize the PDF Viewer
const pdfviewer: PdfViewer = new PdfViewer({
  // Serve local assets from dist/resources via CopyWebpackPlugin
  //documentPath: window.location.origin + '/pdfsuccinctly.pdf',
  documentPath: window.location.origin + '/form-filling-document.pdf',
  resourceUrl: window.location.origin + '/ej2-pdfviewer-lib'
});

// Render the viewer
pdfviewer.appendTo('#PdfViewer');

// Wire up Export/Import buttons for JSON/XFDF/FDF and Object
const exportJsonBtn = document.getElementById('exportJson');
exportJsonBtn?.addEventListener('click', () => {
  // 'Data' is the file name base for download
  pdfviewer.exportFormFields('Data', FormFieldDataFormat.Json);
});

const importJsonBtn = document.getElementById('importJson');
importJsonBtn?.addEventListener('click', () => {
  fetch(window.location.origin + '/form-filling-document.json')
    .then((response) => response.text())
    .then((data) => {
      pdfviewer.importFormFields(data, FormFieldDataFormat.Json);
    })
    .catch((e) => console.error('Failed to load JSON form data:', e));
});

const exportXfdfBtn = document.getElementById('exportXFDF');
exportXfdfBtn?.addEventListener('click', () => {
  pdfviewer.exportFormFields('Data', FormFieldDataFormat.Xfdf);
});

const importXfdfBtn = document.getElementById('importXFDF');
importXfdfBtn?.addEventListener('click', () => {
  // Ensure the case matches your actual file name on disk/server
  fetch(window.location.origin + '/form-filling-document.xfdf')
    .then((response) => response.text())
    .then((data) => {
      pdfviewer.importFormFields(data, FormFieldDataFormat.Xfdf);
    })
    .catch((e) => console.error('Failed to load XFDF form data:', e));
});

// FDF export/import
const exportFdfBtn = document.getElementById('exportFDF');
exportFdfBtn?.addEventListener('click', () => {
  pdfviewer.exportFormFields('Data', FormFieldDataFormat.Fdf);
});

const importFdfBtn = document.getElementById('importFDF');
importFdfBtn?.addEventListener('click', () => {
  fetch(window.location.origin + '/form-filling-document.fdf')
    .then((response) => response.text())
    .then((data) => {
      pdfviewer.importFormFields(data, FormFieldDataFormat.Fdf);
    })
    .catch((e) => console.error('Failed to load FDF form data:', e));
});

// Export/Import as Object (keep the format consistent between export and import)
let exportedDataObj: unknown = null;
let exportedFormat: FormFieldDataFormat = FormFieldDataFormat.Json; // choose: Fdf | Xfdf | Json

const exportObjectBtn = document.getElementById('exportObject');
exportObjectBtn?.addEventListener('click', () => {
  // Set the desired object format here if you want to change it at runtime
  // exportedFormat = FormFieldDataFormat.Xfdf; // example
  // exportedFormat = FormFieldDataFormat.Fdf; // example

  pdfviewer
    .exportFormFieldsAsObject(exportedFormat)
    .then((value) => {
      exportedDataObj = value; // in-memory data object
      console.log('Exported form data object (format:', exportedFormat, '):', exportedDataObj);
    })
    .catch((e) => console.error('Failed to export as object:', e));
});

const importObjectBtn = document.getElementById('importObject');
importObjectBtn?.addEventListener('click', () => {
  if (!exportedDataObj) {
    console.warn('No exported object data available. Click "Export as Object" first.');
    return;
  }
  try {
    // Pass the same object and the same format used during export
    pdfviewer.importFormFields(exportedDataObj as any, exportedFormat);
  } catch (e) {
    console.error('Failed to import from object:', e);
  }
});
