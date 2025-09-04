	import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation,ThumbnailView,BookmarkView,
    TextSelection, TextSearch, Print, Annotation,FormFields,FormDesigner} from '@syncfusion/ej2-pdfviewer';
    PdfViewer.Inject(Toolbar,Magnification,Navigation, LinkAnnotation,ThumbnailView,BookmarkView,
    TextSelection, TextSearch, Print, Annotation,FormFields,FormDesigner);
    let viewer: PdfViewer = new PdfViewer();
    viewer.resourceUrl="https://cdn.syncfusion.com/ej2/30.1.37/dist/ej2-pdfviewer-lib";
    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
    viewer.annotationDrawingOptions.enableLineAngleConstraints = true; 
    viewer.annotationDrawingOptions.restrictLineAngleTo = 90;
    viewer.appendTo("#PdfViewer");