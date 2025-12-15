// app.ts
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
  SquigglySettings
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

// Initialize with default Squiggly settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  squigglySettings: {
    author: 'Guest User',
    subject: 'Corrections',
    color: '#00ff00',
    opacity: 0.9,
    // optional: set by control internally when changed via UI
    // modifiedDate: ''
  }
});
pdfviewer.appendTo('#PdfViewer');

// Buttons wiring
document.getElementById('squigglyMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Squiggly');
});

document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

document.getElementById('addSquiggly')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Squiggly', {
    bounds: [{ x: 97, y: 110, width: 350, height: 14 }],
    pageNumber: 1
  } as SquigglySettings);
});

document.getElementById('editSquiggly')?.addEventListener('click', () => {
  // Example: edit any squiggly whose author or subject matches defaults
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i] as any;
    if (ann?.textMarkupAnnotationType === 'Squiggly' && (ann.author === 'Guest User' || ann.subject === 'Corrections')) {
      ann.color = '#1be468ff';
      ann.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(ann);
    }
  }
});