// app.ts
import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch } from '@syncfusion/ej2-pdfviewer';
import { Toolbar as Tool, ClickEventArgs, ItemModel } from '@syncfusion/ej2-navigations';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch);

const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  enableToolbar: false,
  enableAnnotation: true
});
pdfviewer.appendTo('#PdfViewer');

const items: ItemModel[] = [
  { text: 'Highlight', id: 'annHighlight', tooltipText: 'Highlight', prefixIcon: 'e-pv-highlight-icon' },
  { text: 'Underline', id: 'annUnderline', tooltipText: 'Underline', prefixIcon: 'e-pv-underline-icon' },
  { text: 'Strike', id: 'annStrike', tooltipText: 'Strikethrough', prefixIcon: 'e-pv-strikethrough-icon' },
  { type: 'Separator' },
  { text: 'Rect', id: 'annRect', tooltipText: 'Rectangle', prefixIcon: 'e-pv-shape-rectangle-icon' },
  { text: 'Circle', id: 'annCircle', tooltipText: 'Circle', prefixIcon: 'e-pv-shape-circle-icon' },
  { text: 'Line', id: 'annLine', tooltipText: 'Line', prefixIcon: 'e-pv-shape-line-icon' },
  { text: 'Arrow', id: 'annArrow', tooltipText: 'Arrow', prefixIcon: 'e-pv-shape-arrow-icon' },
  { text: 'Polygon', id: 'annPolygon', tooltipText: 'Polygon', prefixIcon: 'e-pv-shape-pentagon' },
  { type: 'Separator' },
  { text: 'Free Text', id: 'annFreeText', tooltipText: 'Free Text', prefixIcon: 'e-pv-freetext-icon' },
  { text: 'Ink', id: 'annInk', tooltipText: 'Ink', prefixIcon: 'e-pv-inkannotation-icon' },
  { text: 'Note', id: 'annSticky', tooltipText: 'Sticky Note', prefixIcon: 'e-pv-sticky-notes' },
  { type: 'Separator' },
  { text: 'Distance', id: 'annDistance', tooltipText: 'Distance', prefixIcon: 'e-pv-calibrate-distance-icon' },
  { text: 'Perimeter', id: 'annPerimeter', tooltipText: 'Perimeter', prefixIcon: 'e-pv-calibrate-perimeter-icon' },
  { text: 'Area', id: 'annArea', tooltipText: 'Area', prefixIcon: 'e-pv-calibrate-area-icon' },
  { text: 'Radius', id: 'annRadius', tooltipText: 'Radius', prefixIcon: 'e-pv-calibrate-radius-icon' },
  { type: 'Separator' },
  { text: 'Exit', id: 'annNone', tooltipText: 'Exit drawing', align: 'Right' }
];

const toolbar = new Tool({
  items,
  overflowMode: 'Scrollable',
  clicked: (args: ClickEventArgs) => {
    switch (args.item.id) {
      case 'annHighlight': pdfviewer.annotationModule.setAnnotationMode('Highlight'); break;
      case 'annUnderline': pdfviewer.annotationModule.setAnnotationMode('Underline'); break;
      case 'annStrike': pdfviewer.annotationModule.setAnnotationMode('Strikethrough'); break;
      case 'annRect': pdfviewer.annotationModule.setAnnotationMode('Rectangle'); break;
      case 'annCircle': pdfviewer.annotationModule.setAnnotationMode('Circle'); break;
      case 'annLine': pdfviewer.annotationModule.setAnnotationMode('Line'); break;
      case 'annArrow': pdfviewer.annotationModule.setAnnotationMode('Arrow'); break;
      case 'annPolygon': pdfviewer.annotationModule.setAnnotationMode('Polygon'); break;
      case 'annFreeText': pdfviewer.annotationModule.setAnnotationMode('FreeText'); break;
      case 'annInk': pdfviewer.annotationModule.setAnnotationMode('Ink'); break;
      case 'annSticky': pdfviewer.annotationModule.setAnnotationMode('StickyNotes'); break;
      case 'annDistance': pdfviewer.annotationModule.setAnnotationMode('Distance'); break;
      case 'annPerimeter': pdfviewer.annotationModule.setAnnotationMode('Perimeter'); break;
      case 'annArea': pdfviewer.annotationModule.setAnnotationMode('Area'); break;
      case 'annRadius': pdfviewer.annotationModule.setAnnotationMode('Radius'); break;
      case 'annNone': pdfviewer.annotationModule.setAnnotationMode('None'); break;
    }
  }
});
toolbar.appendTo('#annotationToolbar');