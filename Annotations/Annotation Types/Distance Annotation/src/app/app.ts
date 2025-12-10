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
  DistanceSettings
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

// Create viewer
const pdfviewer: PdfViewer = new PdfViewer();

// Standalone setup (no server)
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

// Default Distance and Measurement settings BEFORE appendTo
pdfviewer.distanceSettings = {
  fillColor: 'blue',
  opacity: 0.6,
  strokeColor: 'green'
};

pdfviewer.measurementSettings = {
  scaleRatio: 2,          // 1 PDF unit = 2 display units
  conversionUnit: 'cm',   // Input unit for calibration dialog
  displayUnit: 'cm'       // Unit shown with measurement
};

// Mount viewer
pdfviewer.appendTo('#PdfViewer');

// UI actions
document.getElementById('distanceMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Distance');
});

document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

document.getElementById('addDistanceAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Distance', {
    offset: { x: 200, y: 230 },
    pageNumber: 1,
    vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
  } as DistanceSettings);
});

document.getElementById('editDistanceAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const item = pdfviewer.annotationCollection[i];
    if (item.subject === 'Distance calculation') {
      item.strokeColor = '#0000FF';
      item.thickness = 2;
      item.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(item);
    }
  }
});

/*
If you prefer Server-Backed mode, replace the Standalone setup with:
pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
(and remove resourceUrl)
*/