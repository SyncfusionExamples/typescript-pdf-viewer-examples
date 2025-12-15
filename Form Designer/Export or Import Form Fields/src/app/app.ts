import {
  PdfViewer,
  FormFieldDataFormat,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  FormFields,
  FormDesigner
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  FormFields,
  FormDesigner
);

const viewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
  // For server-backed viewer, set:
  // serviceUrl: 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});
viewer.appendTo('#pdfViewer');

// Export to files
document.getElementById('exportFdf')!.addEventListener('click', () => {
  viewer.exportFormFields('FormData', FormFieldDataFormat.Fdf);
});
document.getElementById('exportXfdf')!.addEventListener('click', () => {
  viewer.exportFormFields('FormData', FormFieldDataFormat.Xfdf);
});
document.getElementById('exportJson')!.addEventListener('click', () => {
  viewer.exportFormFields('FormData', FormFieldDataFormat.Json);
});

// Export as object (for custom persistence)
let exportedData: any;
document.getElementById('exportObj')!.addEventListener('click', () => {
  viewer.exportFormFieldsAsObject(FormFieldDataFormat.Fdf).then(value => {
        exportedData = value;
    });
    console.log(exportedData);
  // Alternatives:
  // viewer.exportFormFieldsAsObject(FormFieldDataFormat.Xfdf).then(...)
  // viewer.exportFormFieldsAsObject(FormFieldDataFormat.Json).then(...)
});

// Import from files (replace 'File' with your file path/stream integration)
document.getElementById('importFdf')!.addEventListener('click', () => {
  viewer.importFormFields('File', FormFieldDataFormat.Fdf);
});
document.getElementById('importXfdf')!.addEventListener('click', () => {
  viewer.importFormFields('File', FormFieldDataFormat.Xfdf);
});
document.getElementById('importJson')!.addEventListener('click', () => {
  viewer.importFormFields('form-designer.json', FormFieldDataFormat.Json);
});

// Import from previously exported object
document.getElementById('importObj')!.addEventListener('click', () => {
 viewer.importFormFields(exportedData, FormFieldDataFormat.Fdf);
  });