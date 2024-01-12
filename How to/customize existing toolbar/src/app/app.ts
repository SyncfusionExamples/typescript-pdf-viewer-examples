import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print,CustomToolbarItemModel} from '@syncfusion/ej2-pdfviewer';
import { ComboBox } from "@syncfusion/ej2-dropdowns";
import { TextBox } from "@syncfusion/ej2-inputs";
PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner,Print);
let toolItem1: CustomToolbarItemModel = {
    prefixIcon: 'e-icons e-paste',
    id: 'print',
    tooltipText: 'Custom toolbar item',
};
let toolItem2: CustomToolbarItemModel = {
    id: 'download',
    text: 'Save',
    tooltipText: 'Custom toolbar item',
    align: 'right'
};
let LanguageList: string[] = ['Typescript', 'Javascript', 'Angular', 'C#', 'C', 'Python'];
let toolItem3: CustomToolbarItemModel = {
    type: 'Input',
    tooltipText: 'Language List',
    cssClass: 'percentage',
    align: 'Left',
    id: 'dropdown',
    template: new ComboBox({ width: 100, value: 'TypeScript', dataSource: LanguageList, popupWidth: 85, showClearButton: false, readonly: false })  
};
let toolItem4: CustomToolbarItemModel = {
    type: 'Input',
    tooltipText: 'Text',
    align: 'Right',
    cssClass: 'find',
    id: 'textbox',
    template: new TextBox({ width: 125, placeholder: 'Type Here', created: OnCreateSearch })
}
let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";
pdfviewer.toolbarSettings = { toolbarItems: [toolItem1, toolItem2, 'OpenOption', 'PageNavigationTool', 'MagnificationTool', toolItem3, 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'DownloadOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', toolItem4, 'CommentTool', 'SubmitForm']}
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
function OnCreateSearch(this: any): any {
    this.addIcon('prepend', 'e-icons e-search');
}