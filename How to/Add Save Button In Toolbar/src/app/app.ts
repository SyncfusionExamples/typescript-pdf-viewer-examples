import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print,CustomToolbarItemModel} from '@syncfusion/ej2-pdfviewer';
import { ComboBox } from "@syncfusion/ej2-dropdowns";
import { TextBox } from "@syncfusion/ej2-inputs";
PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print);
let toolItem1: CustomToolbarItemModel = {
    prefixIcon: 'e-icons e-save',
    id: 'download',
    text: 'Save',
    tooltipText: 'Save Button',
    align: 'Left'
};
let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
pdfviewer.toolbarSettings = { toolbarItems: ['OpenOption', toolItem1, 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', 'CommentTool', 'SubmitForm']}
pdfviewer.appendTo('#PdfViewer');
//To handle custom toolbar click event.
pdfviewer.toolbarClick = function (args) {
   if (args.item && args.item.id === 'download') {
      pdfviewer.download();
   }
};
function OnCreateSearch(this: any): any {
    this.addIcon('prepend', 'e-icons e-search');
}