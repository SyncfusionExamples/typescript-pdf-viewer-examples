import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,
  PageOrganizer, VolumeSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner, PageOrganizer
);

// Initialize viewer with defaults (volume + measurement)
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  volumeSettings: { fillColor: 'pink', opacity: 0.6, strokeColor: 'yellow' },
  measurementSettings: { scaleRatio: 2, conversionUnit: 'cm', displayUnit: 'cm' }
});

pdfviewer.appendTo('#PdfViewer');

// Enable Volume drawing mode
document.getElementById('volumeMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Volume');
});

// Exit drawing mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Add a Volume annotation programmatically
document.getElementById('addVolumeAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Volume', {
    offset: { x: 200, y: 810 },
    pageNumber: 1,
    vertexPoints: [
      { x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 },
      { x: 320, y: 809 }, { x: 200, y: 810 }
    ]
  } as VolumeSettings);
});

// Edit existing Volume annotations programmatically
document.getElementById('editVolumeAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const ann = pdfviewer.annotationCollection[i];
    if (ann.subject === 'Volume calculation') {
      ann.strokeColor = '#0000FF';
      ann.thickness = 2;
      ann.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(ann);
    }
  }
});