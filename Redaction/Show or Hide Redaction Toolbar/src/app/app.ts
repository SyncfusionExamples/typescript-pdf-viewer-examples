import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, RedactionSettings } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib",
});

//Adding Redaction Tool in the toolbar
viewer.toolbarSettings.toolbarItems = ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool', 'RedactionEditTool', 'FormDesignerEditTool', 'SearchOption', 'PrintOption', 'DownloadOption'];
viewer.appendTo('#PdfViewer');

//Show Redaction Toolbar
document.getElementById('showRedactionToolbar')?.addEventListener('click', function(){
    viewer.toolbar.showRedactionToolbar(true);
});
//Hide Redaction Toolbar
document.getElementById('hideRedactionToolbar')?.addEventListener('click', function(){
    viewer.toolbar.showRedactionToolbar(false);
});