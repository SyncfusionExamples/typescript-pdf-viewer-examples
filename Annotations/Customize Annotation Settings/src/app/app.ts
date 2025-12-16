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
  FormDesigner,
  AnnotationResizerLocation,
  CursorType,
  AllowedInteraction
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

// Centralized default values (used on init and “Restore Defaults”)
const defaultConfig = {
  // Text markup
  highlightSettings: { author: 'QA', subject: 'Review', color: '#ffff00', opacity: 0.6 },
  strikethroughSettings: { author: 'QA', subject: 'Remove', color: '#ff0000', opacity: 0.6 },
  underlineSettings: { author: 'Guest User', subject: 'Points to be remembered', color: '#00ffff', opacity: 0.9 },
  squigglySettings: { author: 'Guest User', subject: 'Corrections', color: '#00ff00', opacity: 0.9 },

  // Shapes
  lineSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8 },
  arrowSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8 },
  rectangleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1 },
  circleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1 },
  polygonSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1 },

  // Measurements
  distanceSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8 },
  perimeterSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8 },
  areaSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00' },
  radiusSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00' },
  volumeSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00' },

  // Others
  freeTextSettings: { borderColor: '#222222', thickness: 1, opacity: 1 },
  inkAnnotationSettings: { color: '#0000ff', thickness: 3, opacity: 0.8 },
  stampSettings: { opacity: 0.9 },
  stickyNotesSettings: { author: 'QA', subject: 'Review', color: '#ffcc00', opacity: 1 }
};

// Create viewer
const viewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  // Standalone resources
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  // Apply defaults
  ...defaultConfig
});

// Optional: If you want to run with server-backed mode, uncomment the next line and remove resourceUrl above
// viewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';

viewer.appendTo('#PdfViewer');

// Bulk update annotations example
document.getElementById('bulkUpdateAnn')?.addEventListener('click', () => {
  // Walk all annotations in current document and update matches
  for (let i = 0; i < viewer.annotationCollection.length; i++) {
    const ann = viewer.annotationCollection[i] as any;
    if (ann.author === 'Guest' || ann.subject === 'rectangle') {
      ann.color = '#ff0000';
      ann.opacity = 0.8;  
      // Optional for shapes/lines:
      // ann.strokeColor = '#222222';
      // ann.thickness = 2;
      ann.fillColor = 'rgba(158, 23, 237, 0.87)';
      viewer.annotation.editAnnotation(ann);
    }
  }
});

// Apply annotationSettings (runtime)
document.getElementById('applyAnnSettings')?.addEventListener('click', () => {
  viewer.annotationSettings = {
    author: 'XYZ',
    minHeight: 10,
    minWidth: 10,
    maxWidth: 100,
    maxHeight: 100,
    isLock: false,
    skipPrint: false,
    skipDownload: false,
    allowedInteractions: [AllowedInteraction.Select, AllowedInteraction.Move]
  };
});

// Apply annotationSelectorSettings (runtime)
document.getElementById('applySelectorSettings')?.addEventListener('click', () => {
  viewer.annotationSelectorSettings = {
    selectionBorderColor: 'blue',
    resizerBorderColor: 'red',
    resizerFillColor: '#f2ff40ff',
    resizerSize: 8,
    selectionBorderThickness: 1,
    resizerShape: 'Circle',
    selectorLineDashArray: [5, 6],
    resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
    resizerCursorType: CursorType.grab
  };
});