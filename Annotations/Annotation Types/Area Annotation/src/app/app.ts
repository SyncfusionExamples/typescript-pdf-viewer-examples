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
  AreaSettings
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

// Initialize viewer with defaults for Area + measurement
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  // Resource URL for Standalone
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  // Default Area appearance
  areaSettings: { fillColor: 'yellow', opacity: 0.6, strokeColor: 'orange', thickness: 2 },
  // Default measurement scale/units
  measurementSettings: { scaleRatio: 2, conversionUnit: 'cm', displayUnit: 'cm' }
});

pdfviewer.appendTo('#PdfViewer');

// 1) Enable Area drawing mode
document.getElementById('areaMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Area');
});

// 2) Add an Area annotation programmatically
document.getElementById('addAreaAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Area', {
    pageNumber: 1,
    subject: 'Area calculation', // used below to find and edit
    offset: { x: 200, y: 500 },
    vertexPoints: [
      { x: 200, y: 500 },
      { x: 288, y: 499 },
      { x: 289, y: 553 },
      { x: 200, y: 500 }
    ]
  } as AreaSettings);
});

// 3) Edit an existing Area annotation programmatically
document.getElementById('editAreaAnnotation')?.addEventListener('click', () => {
  if (!pdfviewer || !pdfviewer.annotationCollection) return;
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const item = pdfviewer.annotationCollection[i];
    if (item.subject === 'Area calculation') {
      item.annotationSelectorSettings.resizerShape = 'Circle';
      item.strokeColor = '#0000FF';
      item.thickness = 2;
      item.fillColor = '#FFFF00';
      pdfviewer.annotation.editAnnotation(item);
    }
  }
});