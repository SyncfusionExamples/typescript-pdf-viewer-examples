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
  LineSettings
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

// Initialize with default Line settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  lineSettings: {
    author: 'Syncfusion',
    strokeColor: 'green',
    thickness: 3,
    opacity: 0.6,
    // Fill color shows when arrowheads are used; lines without arrowheads won't render fill
    fillColor: 'blue'
  }
});

pdfviewer.appendTo('#PdfViewer');

// Enable line mode (UI)
document.getElementById('lineMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Line');
});

// Exit line mode (UI)
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Add line programmatically
document.getElementById('addLineAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Line', {
    pageNumber: 1,
    // starting position info (optional for line, but harmless)
    offset: { x: 200, y: 230 },
    // two points define the line
    vertexPoints: [
      { x: 200, y: 230 },
      { x: 360, y: 260 }
    ]
  } as LineSettings);
});

// Edit existing line annotations programmatically
document.getElementById('editLineAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.shapeAnnotationType === 'Line' || ann.subject === 'Line') {
      ann.strokeColor = '#0000FF';
      ann.thickness = 2;
      // example: change resizer handle style
      ann.annotationSelectorSettings.resizerShape = 'Circle';
      pdfviewer.annotation.editAnnotation(ann);
    }
  }
});