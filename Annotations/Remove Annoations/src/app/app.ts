import {
  PdfViewer,
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
} from '@syncfusion/ej2-pdfviewer';

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

// Create viewer
const viewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  // Standalone resources
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
});

viewer.appendTo('#PdfViewer');

document.getElementById('del')?.addEventListener('click',()=>{
  //delete the selected annotation
 viewer.annotation.deleteAnnotation();
});

document.getElementById('delbyId')?.addEventListener('click', () => {
  //deletet the first annotation using its id from the annotation collection
  viewer.annotation.deleteAnnotationById(viewer.annotationCollection[0].id);
});