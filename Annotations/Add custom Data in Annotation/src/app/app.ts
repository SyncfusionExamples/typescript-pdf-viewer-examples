import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, Annotation, FormDesigner, FormFields } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',

  // Text markup
  highlightSettings: { author: 'QA', subject: 'Review', color: '#ffff00', opacity: 0.6, customData: { tag: 'needs-review', priority: 'high' } },
  strikethroughSettings: { author: 'QA', subject: 'Remove', color: '#ff0000', opacity: 0.6, customData: { tag: 'remove', priority: 'medium' } },
  underlineSettings: { author: 'Guest User', subject: 'Notes', color: '#00ffff', opacity: 0.9, customData: { tag: 'note', owner: 'guest' } },
  squigglySettings: { author: 'Guest User', subject: 'Corrections', color: '#00ff00', opacity: 0.9, customData: { tag: 'typo' } },

  // Shapes
  lineSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, customData: { id: 'ln-1', category: 'connector' } },
  arrowSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, customData: { id: 'ar-1', category: 'direction' } },
  rectangleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, customData: { id: 'rect-1', zone: 'content' } },
  circleSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, customData: { id: 'circ-1', zone: 'highlight' } },
  polygonSettings: { fillColor: '#ffffff00', strokeColor: '#222222', thickness: 1, opacity: 1, customData: { id: 'poly-1', group: 'area' } },

  // Measurements //Perimeter, area, volume no support for customData
  distanceSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, customData: { units: 'cm', scale: 1 } },
  //perimeterSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, customData: { units: 'cm', calc: 'perimeter' } },
  //areaSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', customData: { units: 'cm^2', calc: 'area' } },
  radiusSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', customData: { units: 'cm', calc: 'radius' } },
  //volumeSettings: { strokeColor: '#0066ff', thickness: 2, opacity: 0.8, fillColor: '#ffffff00', customData: { units: 'cm^3', calc: 'volume' } },

  // Others
  freeTextSettings: { borderColor: '#222222', opacity: 1, customData: { template: 'comment', mentions: ['qa'] } },
  inkAnnotationSettings: { strokeColor: '#0000ff', thickness: 3, opacity: 0.8, customData: { tool: 'pen', userId: 12345 } },
  stampSettings: { opacity: 0.9, customData: { stampType: 'Approved', by: 'Manager' } },
  stickyNotesSettings: { author: 'QA', subject: 'Review', opacity: 1, customData: { channel: 'inbox', unread: true } }
});

pdfviewer.appendTo('#PdfViewer');

document.getElementById('CustomData')?.addEventListener('click', () => {
  const annotations = pdfviewer.annotationCollection;
  annotations.forEach((a: any) => {
    console.log('Annotation', a.id, 'customData:', a.customData);
  });
});