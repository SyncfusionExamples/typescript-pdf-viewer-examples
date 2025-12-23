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
  CircleSettings
} from '@syncfusion/ej2-pdfviewer';

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
  FormDesigner,
  PageOrganizer
);

// Create and configure the viewer
const pdfviewer: PdfViewer = new PdfViewer();

// Default circle settings during initialization
pdfviewer.circleSettings = {
  fillColor: 'orange',
  opacity: 0.6,
  strokeColor: 'pink'
};

// Load a document (Standalone)
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

// Append to DOM
pdfviewer.appendTo('#PdfViewer');

// Button: Enable circle annotation mode
document.getElementById('circleMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Circle');
});

// Button: Exit annotation mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Button: Add circle annotation programmatically
document.getElementById('addCircleAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Circle', {
    offset: { x: 200, y: 620 },
    pageNumber: 1,
    width: 90,
    height: 90
  } as CircleSettings);
});

// Button: Edit existing circle annotations programmatically
document.getElementById('editCircleAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.subject === 'Circle') {
      ann.strokeColor = '#0000FF';
      ann.thickness = 2;
      ann.fillColor = '#FFFF00';
      if (ann.annotationSelectorSettings) {
        ann.annotationSelectorSettings.resizerShape = 'Circle';
      }
      pdfviewer.annotation.editAnnotation(ann);
    }
  }
});