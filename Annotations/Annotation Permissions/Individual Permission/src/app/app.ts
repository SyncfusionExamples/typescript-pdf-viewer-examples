import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, Annotation, FormDesigner, FormFields } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: "https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib",
  // Text markup defaults
  highlightSettings: { author: 'QA', subject: 'Review', color: '#ffff00', opacity: 0.6 },
  strikethroughSettings: { author: 'QA', subject: 'Remove', color: '#ff0000', opacity: 0.6 },
  underlineSettings: { author: 'Guest User', subject: 'Points to be remembered', color: '#00ffff', opacity: 0.9 },
  squigglySettings: { author: 'Guest User', subject: 'Corrections', color: '#00ff00', opacity: 0.9 },

  // Shapes
  lineSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, isLock: false, isPrint: true },
  arrowSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, isLock: false, isPrint: true },
  rectangleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, isLock: false, isPrint: true },
  circleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, isLock: false, isPrint: true },
  polygonSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, isLock: false, isPrint: true },

  // Measurements
  distanceSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, isLock: false, isPrint: true },
  perimeterSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, isLock: false, isPrint: true },
  areaSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', isLock: false, isPrint: true },
  radiusSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', isLock: false, isPrint: true },
  volumeSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', isLock: false, isPrint: true },

  // Others
  freeTextSettings: { borderColor: '#222222', opacity: 1, isLock: false, isPrint: true },
  inkAnnotationSettings: { strokeColor: '#0000ff', thickness: 3, opacity: 0.8, isLock: false, isPrint: true },
  stampSettings: { opacity: 0.9, isLock: false, isPrint: true },
  stickyNotesSettings: { author: 'QA', subject: 'Review', opacity: 1, isLock: false, isPrint: true }
});

pdfviewer.appendTo('#PdfViewer');