import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
         TextSelection, Annotation, FormDesigner, FormFields, TextFieldSettings,
         RadioButtonFieldSettings, CheckBoxFieldSettings } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView,
                 BookmarkView, TextSelection, Annotation, FormDesigner, FormFields);

let pdfviewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
    resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});
pdfviewer.appendTo('#pdfViewer');

pdfviewer.documentLoad = () => {
    // Textbox group: same name => mirrored value
    pdfviewer.formDesignerModule.addFormField('Textbox', {
        name: 'EmployeeId',
        bounds: { X: 146, Y: 229, Width: 150, Height: 24 }
    } as TextFieldSettings);

    pdfviewer.formDesignerModule.addFormField('Textbox', {
        name: 'EmployeeId', // same name groups the two widgets
        bounds: { X: 338, Y: 229, Width: 150, Height: 24 }
    } as TextFieldSettings);

    // Radio button group: same name => exclusive selection across the group
    pdfviewer.formDesignerModule.addFormField('RadioButton', {
        name: 'Gender',
        bounds: { X: 148, Y: 289, Width: 18, Height: 18 },
        isSelected: false
    } as RadioButtonFieldSettings);

    pdfviewer.formDesignerModule.addFormField('RadioButton', {
        name: 'Gender', // grouped with the first
        bounds: { X: 292, Y: 289, Width: 18, Height: 18 },
        isSelected: false
    } as RadioButtonFieldSettings);

    // CheckBox group: same name => mirrored checked state
    pdfviewer.formDesignerModule.addFormField('CheckBox', {
        name: 'Subscribe',
        bounds: { X: 56, Y: 664, Width: 20, Height: 20 },
        isChecked: false
    } as CheckBoxFieldSettings);

    pdfviewer.formDesignerModule.addFormField('CheckBox', {
        name: 'Subscribe', // grouped with the first
        bounds: { X: 242, Y: 664, Width: 20, Height: 20 },
        isChecked: false
    } as CheckBoxFieldSettings);
};