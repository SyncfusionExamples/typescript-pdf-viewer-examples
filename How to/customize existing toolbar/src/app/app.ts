import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation,ThumbnailView,BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, CustomToolbarItemModel} from "../src/index";
    
    PdfViewer.Inject(Toolbar,Magnification,Navigation, LinkAnnotation,ThumbnailView,BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner);
    let toolItem: CustomToolbarItemModel = {
        prefixIcon: 'e-icons e-paste',
        id: 'print',
        tooltipText: 'Custom toolbar item',
        align: 'left'
    };
    
    //Initialize EJ2 Pdfviewer Container component with custom toolbar item.
    let viewer: PdfViewer = new PdfViewer();

    viewer.toolbarSettings = { toolbarItems: [toolItem, 'OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'DownloadOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', 'CommentTool', 'SubmitForm']}
    viewer.documentPath= 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    viewer.resourceUrl="https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
    // To utilize the server-backed PDF Viewer, need to specify the service URL. This can be done by including viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer'
    viewer.appendTo("#pdfViewer");
    
    //To handle custom toolbar click event.
       viewer.toolbarClick = function (args) {
        if (args.item && args.item.id === 'print') {
            viewer.printModule.print();
        }
        else if (args.item && args.item.id === 'download') {
            viewer.download();
        }
    };