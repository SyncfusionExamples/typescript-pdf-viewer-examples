import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
  TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, AllowedInteraction, AnnotationDataFormat } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  Print,
  Annotation,
  FormFields,
  FormDesigner
);

// Initialize the viewer
let viewer: PdfViewer = new PdfViewer();
viewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';
viewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
viewer.appendTo('#pdfViewer');

// Wire up export actions

//Export Annotation as JSON
const btnJson = document.getElementById('ExportJSON');
btnJson?.addEventListener('click', () => {
  viewer.exportAnnotation(AnnotationDataFormat.Json);
});

//Export Annotation As XFDF 
const btnXfdf = document.getElementById('ExportXfdf');
btnXfdf?.addEventListener('click', () => {
  viewer.exportAnnotation(AnnotationDataFormat.Xfdf);
});

//Export Annotation as Object
var exportedObject: string;
const btnObject = document.getElementById('ExportAsObject');
btnObject?.addEventListener('click', () => {
  viewer.exportAnnotationsAsObject().then((value: any) => {
    // Persist or transmit the object as needed (DB/API). Keep for future import.
    console.log('Exported annotation object:', value);
    exportedObject=value;
  });
});

//Export Annotation as Base64
var exportObject1;
document.getElementById('ExportAsBase64')?.addEventListener('click', function () {
viewer.exportAnnotationsAsBase64String(AnnotationDataFormat.Json).then(function (value: any) {
           exportObject1 = value;
           console.log(exportObject1);
       })
   });

// Import from an exported object pasted in the textarea
const btnImport = document.getElementById('ImportFromObject');
btnImport?.addEventListener('click', () => {
  viewer.importAnnotation(JSON.parse(exportedObject));
});