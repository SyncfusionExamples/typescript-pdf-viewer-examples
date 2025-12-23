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
  RectangleSettings
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

// Initialize viewer
const pdfviewer: PdfViewer = new PdfViewer();

// Default rectangle settings during initialization
pdfviewer.rectangleSettings = {
  fillColor: 'yellow',
  opacity: 0.6,
  strokeColor: 'orange'
};

// Document source
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
// Resource url for Standalone
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

// Mount
pdfviewer.appendTo('#PdfViewer');

// Enable rectangle mode
document.getElementById('rectangleMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Rectangle');
});

// Exit rectangle mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Add rectangle annotation programmatically
document.getElementById('addRectangleAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Rectangle', {
    offset: { x: 200, y: 480 },
    pageNumber: 1,
    width: 150,
    height: 75
  } as RectangleSettings);
});

// Edit existing rectangle annotations programmatically
document.getElementById('editRectangleAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const annot = pdfviewer.annotationCollection[i];
    if (annot.subject === 'Rectangle') {
      annot.strokeColor = '#0000FF';
      annot.thickness = 2;
      annot.fillColor = '#FFFF00';
      if (annot.annotationSelectorSettings) {
        annot.annotationSelectorSettings.resizerShape = 'Circle';
      }
      pdfviewer.annotation.editAnnotation(annot);
    }
  }
});