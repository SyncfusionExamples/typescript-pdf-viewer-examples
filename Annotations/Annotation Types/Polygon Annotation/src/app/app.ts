import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation,
  LinkAnnotation, ThumbnailView, BookmarkView, TextSelection,
  TextSearch, FormFields, FormDesigner, PageOrganizer, PolygonSettings
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner, PageOrganizer
);

// Create viewer instance
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath : 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl  : 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  // default polygon style (optional)
  polygonSettings: { fillColor: 'pink', opacity: 0.6, strokeColor: 'yellow' }
});
pdfviewer.appendTo('#PdfViewer');

/* ---------------- Button actions ---------------- */

// 1. Enable polygon drawing mode
(document.getElementById('polygonMode') as HTMLButtonElement)
  .addEventListener('click', () => {
    pdfviewer.annotationModule.setAnnotationMode('Polygon');
  });

// 2. Exit annotation mode (back to normal)
(document.getElementById('setNone') as HTMLButtonElement)
  .addEventListener('click', () => {
    pdfviewer.annotationModule.setAnnotationMode('None');
  });

// 3. Add a polygon annotation programmatically
(document.getElementById('addPolygonAnnotation') as HTMLButtonElement)
  .addEventListener('click', () => {
    pdfviewer.annotation.addAnnotation('Polygon', {
      pageNumber: 1,
      offset: { x: 200, y: 800 },
      vertexPoints: [
        { x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 },
        { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }
      ]
    } as PolygonSettings);
  });

// 4. Edit the first existing polygon annotation programmatically
(document.getElementById('editPolygonAnnotation') as HTMLButtonElement)
  .addEventListener('click', () => {
    for (const item of pdfviewer.annotationCollection) {
      if (item.subject === 'Polygon') {
        item.strokeColor = '#0000FF';
        item.thickness   = 2;
        item.fillColor   = '#FFFF00';
        item.annotationSelectorSettings.resizerShape = 'Circle';
        pdfviewer.annotation.editAnnotation(item);
        break;          // edit only the first polygon
      }
    }
  });