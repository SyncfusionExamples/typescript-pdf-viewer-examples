import {
  PdfViewer,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  TextFieldSettings,
  PasswordFieldSettings,
  CheckBoxFieldSettings,
  RadioButtonFieldSettings,
  ListBoxFieldSettings,
  DropdownFieldSettings,
  SignatureFieldSettings,
  InitialFieldSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner
);

const pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';
pdfviewer.appendTo('#PdfViewer');

//Add form fields once the document is loaded
pdfviewer.documentLoad = () => {
  // Textbox
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'First Name',
    bounds: { X: 146, Y: 229, Width: 150, Height: 24 }
  } as TextFieldSettings);

  // Password
  pdfviewer.formDesignerModule.addFormField('Password', {
    name: 'Account Password',
    bounds: { X: 148, Y: 270, Width: 180, Height: 24 }
  } as PasswordFieldSettings);

  // CheckBox
  pdfviewer.formDesignerModule.addFormField('CheckBox', {
    name: 'Subscribe',
    isChecked: false,
    bounds: { X: 56, Y: 664, Width: 20, Height: 20 }
  } as CheckBoxFieldSettings);

  // RadioButton (group by same name)
  pdfviewer.formDesignerModule.addFormField('RadioButton', {
    name: 'Gender',
    isSelected: false,
    bounds: { X: 148, Y: 289, Width: 18, Height: 18 }
  } as RadioButtonFieldSettings);
  pdfviewer.formDesignerModule.addFormField('RadioButton', {
    name: 'Gender',
    isSelected: false,
    bounds: { X: 292, Y: 289, Width: 18, Height: 18 }
  } as RadioButtonFieldSettings);

  // ListBox
  const listBoxOptions = [
    { itemName: 'Item 1', itemValue: 'item1' },
    { itemName: 'Item 2', itemValue: 'item2' },
    { itemName: 'Item 3', itemValue: 'item3' }
  ];
  pdfviewer.formDesignerModule.addFormField('ListBox', {
    name: 'States',
    options: listBoxOptions,
    bounds: { X: 380, Y: 320, Width: 150, Height: 60 }
  } as ListBoxFieldSettings);

  // DropDown
  const dropdownOptions = [
    { itemName: 'Item 1', itemValue: 'item1' },
    { itemName: 'Item 2', itemValue: 'item2' },
    { itemName: 'Item 3', itemValue: 'item3' }
  ];
  pdfviewer.formDesignerModule.addFormField('DropDown', {
    name: 'Country',
    options: dropdownOptions,
    bounds: { X: 560, Y: 320, Width: 150, Height: 24 }
  } as DropdownFieldSettings);

  // Signature field
  pdfviewer.formDesignerModule.addFormField('SignatureField', {
    name: 'Sign',
    bounds: { X: 57, Y: 923, Width: 200, Height: 43 }
  } as SignatureFieldSettings);

  // Initial field
  pdfviewer.formDesignerModule.addFormField('InitialField', {
    name: 'Initial',
    bounds: { X: 148, Y: 466, Width: 200, Height: 43 }
  } as InitialFieldSettings);
};