import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, AnnotationResizerLocation, CursorType} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-pdfviewer-lib";

pdfviewer.appendTo('#PdfViewer');
pdfviewer.annotationSelectorSettings = {
    selectionBorderColor: 'blue', 
    resizerBorderColor: 'red', 
    resizerFillColor: '#4070ff', 
    resizerSize: 8, 
    selectionBorderThickness: 1, 
    resizerShape: 'Circle', 
    selectorLineDashArray: [5, 6], 
    resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, 
    resizerCursorType: CursorType.grab 
   };