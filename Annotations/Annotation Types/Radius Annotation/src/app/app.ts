import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,
  PageOrganizer, RadiusSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer
);

const pdfviewer: PdfViewer = new PdfViewer();

// Document + library URL
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

// Default settings before append
pdfviewer.radiusSettings = { fillColor: 'orange', opacity: 0.6, strokeColor: 'pink' };
pdfviewer.measurementSettings = { scaleRatio: 2, conversionUnit: 'cm', displayUnit: 'cm' };

// Mount
pdfviewer.appendTo('#PdfViewer');

// UI: enable radius mode
document.getElementById('radiusMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Radius');
});

// UI: exit mode
document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

// Add radius annotation programmatically
document.getElementById('addRadiusAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Radius', {
    offset: { x: 200, y: 630 },
    pageNumber: 1,
    width: 90,
    height: 90
  } as RadiusSettings);
});

// Edit an existing radius annotation programmatically
document.getElementById('editRadiusAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    if (pdfviewer.annotationCollection[i].subject === 'Radius calculation') {
      pdfviewer.annotationCollection[i].strokeColor = '#0000FF';
      pdfviewer.annotationCollection[i].thickness = 2;
      pdfviewer.annotationCollection[i].opacity = 0.8;
      pdfviewer.annotation.editAnnotation(pdfviewer.annotationCollection[i]);
    }
  }
});