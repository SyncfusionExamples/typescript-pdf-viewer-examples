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
  StrikethroughSettings
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

// Initialize with default Strikethrough settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  strikethroughSettings: {
    author: 'Guest User',
    subject: 'Not Important',
    color: '#ff00ff',
    opacity: 0.9,
  }
});

// If you want to use server-backed PDF Viewer, uncomment the line below:
// pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';

pdfviewer.appendTo('#PdfViewer');

// Enter Strikethrough mode
document.getElementById('set')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Strikethrough');
});

// Exit to Normal mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

// Add a Strikethrough annotation programmatically
document.getElementById('strikethrough')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Strikethrough', {
    bounds: [{ x: 97, y: 110, width: 350, height: 14 }],
    pageNumber: 1
  } as StrikethroughSettings);
});

// Edit the first available Strikethrough annotation programmatically
document.getElementById('editStrikethroughAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.annotationType === 'Strikethrough') {
      ann.color = '#ff0000';
      ann.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(ann);
      break;
    }
  }
});