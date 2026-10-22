import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner, PageOrganizer, BorderStyle
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner, PageOrganizer
);

// Create the viewer with default border settings for various annotations
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/annotations-v2.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',
  rectangleSettings: {
    strokeColor: '#d32f2f',
    fillColor: '#ffe0b2',
    borderStyle: 'Cloud',
    cloudIntensity: 2
  } as any,
  circleSettings: {
    strokeColor: '#1976d2',
    fillColor: '#bbdefb',
    borderStyle: 'Dashed',
    borderDashArray: [5, 5]
  } as any,
  freeTextSettings: {
    fillColor: 'red',
    borderColor: '#2e7d32',
    fontColor: '#1b5e20',
    opacity: 0.3,
    enableAutoFit: true,
    borderStyle: 'Cloud',
    cloudIntensity: 2
  } as any,
  cloudSettings: {
    opacity: 1,
    strokeColor: '#9c27b0',
    fillColor: '#f3e5f5',
    author: 'Cloud',
    borderStyle: 'Cloud',
    cloudIntensity: 2
  } as any,
  lineSettings: {
    strokeColor: '#f57c00',
    borderStyle: 'Dashed',
    borderDashArray: [4, 3]
  } as any,
  polygonSettings: {
    fillColor: '#ffa5d8',
    strokeColor: '#ff6a00',
    thickness: 2,
    opacity: 0.9,
    borderStyle: 'Cloud',
    cloudIntensity: 2
  } as any,
  areaSettings: {
    fillColor: 'yellow',
    strokeColor: 'orange',
    opacity: 0.6,
    borderStyle: 'Cloud',
    cloudIntensity: 2
  } as any
});

pdfviewer.appendTo('#PdfViewer');

// --- Set the mode used for newly added annotations ---

document.getElementById('btnRectangleMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Rectangle');
});

document.getElementById('btnCircleMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Circle');
});

document.getElementById('btnPolygonMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Polygon');
});

document.getElementById('btnFreeTextMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('FreeText');
});

document.getElementById('btnAreaMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Area');
});

document.getElementById('btnLineMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Line');
});

// --- Exit the annotation mode ---

document.getElementById('btnExitMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

// --- Add annotations programmatically with cloud/dashed borders ---

document.getElementById('btnCloudRectangle')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Rectangle', {
    offset: { x: 90, y: 120 },
    pageNumber: 0,
    width: 220,
    height: 110,
    borderStyle: 'Cloud',
    cloudIntensity: 2,
    strokeColor: '#d32f2f',
    fillColor: '#ffe0b2',
    opacity: 0.4,
    author: 'Guest'
  } as any);
});

document.getElementById('btnDashedCircle')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Circle', {
    offset: { x: 360, y: 120 },
    pageNumber: 0,
    width: 140,
    height: 140,
    borderStyle: 'Dashed',
    borderDashArray: [5, 5],
    strokeColor: '#1976d2',
    fillColor: '#bbdefb',
    opacity: 0.4,
    author: 'Guest'
  } as any);
});

document.getElementById('btnCloudFreeText')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('FreeText', {
    offset: { x: 90, y: 300 },
    pageNumber: 0,
    width: 220,
    height: 70,
    borderStyle: 'Cloud',
    cloudIntensity: 1,
    borderColor: '#2e7d32',
    fillColor: '#e8f5e9',
    fontColor: '#1b5e20',
    opacity: 0.3,
    author: 'Guest'
  } as any);
});

document.getElementById('btnDashedLine')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Line', {
    offset: { x: 360, y: 330 },
    pageNumber: 0,
    points: [{ x: 360, y: 330 }, { x: 500, y: 400 }],
    borderStyle: 'Dashed',
    borderDashArray: [4, 3],
    strokeColor: '#f57c00',
    opacity: 1,
    author: 'Guest'
  } as any);
});

document.getElementById('btnCloudArea')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Area', {
    offset: { x: 90, y: 430 },
    pageNumber: 0,
    vertexPoints: [
      { x: 90, y: 430 },
      { x: 300, y: 430 },
      { x: 300, y: 520 },
      { x: 90, y: 520 }
    ],
    borderStyle: 'Cloud',
    cloudIntensity: 2,
    strokeColor: '#c2185b',
    fillColor: '#fce4ec',
    opacity: 0.4,
    author: 'Guest'
  } as any);
});

document.getElementById('btnDashedRadius')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Radius', {
    offset: { x: 380, y: 470 },
    pageNumber: 0,
    points: [{ x: 380, y: 470 }, { x: 470, y: 470 }],
    borderStyle: 'Dashed',
    borderDashArray: [6, 3],
    strokeColor: '#00838f',
    opacity: 1,
    author: 'Guest'
  } as any);
});

// --- Modify the border style of an existing annotation ---
function updateLastBorder(borderStyle: string, extra: { [key: string]: any } = {}) {
  const annots = pdfviewer.annotationCollection || [];
  const annotation = annots[annots.length - 1];
  if (!annotation) {
    return;
  }
  // Set border style
  (annotation as any).borderStyle = borderStyle;
  // Apply additional properties dynamically
  Object.entries(extra).forEach(([key, value]) => {
    (annotation as any)[key] = value;
  });
  pdfviewer.annotation.editAnnotation(annotation);
}

document.getElementById('btnApplyCloudBorder')?.addEventListener('click', () => {
  updateLastBorder('Cloud', { cloudIntensity: 2 });
});

document.getElementById('btnApplyDashedBorder')?.addEventListener('click', () => {
  updateLastBorder('Dashed', { borderDashArray: [5, 5] });
});

document.getElementById('btnResetBorder')?.addEventListener('click', () => {
  updateLastBorder('Solid', { borderDashArray: null, cloudIntensity: 1 });
});
