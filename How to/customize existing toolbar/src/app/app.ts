import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print,CustomToolbarItemModel} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print);
let toolItem: CustomToolbarItemModel = {
    prefixIcon: 'e-icons e-paste',
    id: 'print',
    tooltipText: 'Custom toolbar item',
    align: 'left'
};
let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
pdfviewer.toolbarSettings = { toolbarItems: [toolItem, 'OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'DownloadOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', 'CommentTool', 'SubmitForm']}
   
pdfviewer.appendTo('#PdfViewer');
    //To handle custom toolbar click event.
    pdfviewer.toolbarClick = function (args) {
        if (args.item && args.item.id === 'print') {
            pdfviewer.print.print();
        }
        else if (args.item && args.item.id === 'download') {
            pdfviewer.download();
        }
    };