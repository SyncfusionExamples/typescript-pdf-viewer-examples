import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, 
    AllowedInteraction} from '@syncfusion/ej2-pdfviewer';

    PdfViewer.Inject(Toolbar,Magnification,Navigation, LinkAnnotation,ThumbnailView,BookmarkView,
    TextSelection, TextSearch, Print, Annotation,FormFields, FormDesigner);

let viewer: PdfViewer = new PdfViewer();
viewer.resourceUrl= 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';
viewer.documentPath= 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';

// Default annotation settings applied to annotations created via the UI
viewer.annotationSettings = {
  author: 'XYZ',
  minHeight: 10,
  minWidth: 10,
  maxWidth: 100,
  maxHeight: 100,
  isLock: false,        // allow moving/resizing/editing by default
  skipPrint: false,      // include annotations when printing the document
  skipDownload: true,   // include annotations when downloading/exporting the document
  allowedInteractions: [AllowedInteraction.Resize],
};

viewer.appendTo("#pdfViewer");