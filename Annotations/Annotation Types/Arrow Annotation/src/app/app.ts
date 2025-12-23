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
  ArrowSettings
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

const pdfviewer: PdfViewer = new PdfViewer();
// Document source
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
// Standalone resource path
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

pdfviewer.appendTo('#PdfViewer');

// 1) Enable Arrow drawing mode (UI drawing)
document.getElementById('arrowMode')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('Arrow');
});

// 2) Add an Arrow programmatically
document.getElementById('addArrow')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Arrow', {
    // basic geometry (two points → line with arrowhead)
    vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }],
    offset: { x: 200, y: 370 },
    pageNumber: 1,
    // optional style
    strokeColor: '#0078D4',
    fillColor: '#CCE4FF',
    thickness: 2,
    opacity: 0.8
  } as ArrowSettings);
});

// 3) Edit existing Arrow annotations
document.getElementById('editArrows')?.addEventListener('click', () => {
  const annots = pdfviewer.annotationCollection || [];
  for (let i = 0; i < annots.length; i++) {
    const a = annots[i];
    if (a.subject === 'Arrow') {
      // example edits
      a.annotationSelectorSettings.resizerShape = 'Circle';
      a.strokeColor = '#0000FF';
      a.thickness = 3;
      a.fillColor = '#FFFF99';
      a.opacity = 0.9;
      pdfviewer.annotation.editAnnotation(a);
    }
  }
});