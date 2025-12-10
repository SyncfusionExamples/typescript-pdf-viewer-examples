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
  InkAnnotationSettings
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

// Initialize with default ink settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  inkAnnotationSettings: {
    author: 'Syncfusion',
    strokeColor: 'green',
    thickness: 3,
    opacity: 0.6
  }
});

pdfviewer.appendTo('#PdfViewer');

// Enable ink mode (UI)
document.getElementById('addInkAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Ink');
});

// Exit ink mode (UI)
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Add ink programmatically
document.getElementById('addInkAnnotationProgram')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Ink', {
    offset: { x: 150, y: 100 },
    pageNumber: 1,
    width: 200,
    height: 60,
    path:
      '[{"command":"M","x":244.83,"y":982.00},{"command":"L","x":250.83,"y":953.33}]'
  } as InkAnnotationSettings);
});

// Edit existing ink annotations programmatically
document.getElementById('editInkAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.shapeAnnotationType === 'Ink') {
      const { width, height } = ann.bounds;
      ann.bounds = { x: 100, y: 100, width, height };
      ann.strokeColor = '#0000FF';
      ann.thickness = 2;
      ann.annotationSelectorSettings.resizerShape = 'Circle';
      pdfviewer.annotation.editAnnotation(ann);
    }
  }
});