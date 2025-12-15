import {
  PdfViewer,
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
  FormDesigner,
  PageOrganizer,
  UnderlineSettings
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
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
);

// Initialize with default Underline settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  underlineSettings: {
    author: 'Guest User',
    subject: 'Points to be remembered',
    color: '#00ffff',
    opacity: 0.9
  }
});

// If you want the server-backed PDF Viewer, uncomment the line below:
// pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';

pdfviewer.appendTo('#PdfViewer');

// Enter Underline mode
document.getElementById('set')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Underline');
});

// Exit to Normal mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

// Add an Underline annotation programmatically
document.getElementById('underline')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Underline', {
    bounds: [{ x: 97, y: 110, width: 350, height: 14 }],
    pageNumber: 1
  } as UnderlineSettings);
});

// Edit the first available Underline annotation programmatically
document.getElementById('editUnderlineAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.textMarkupAnnotationType === 'Underline') {
      ann.color = '#00aa00';
      ann.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(ann);
      break;
    }
  }
});