import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, FontStyle,
  TextFieldSettings, PasswordFieldSettings, CheckBoxFieldSettings, RadioButtonFieldSettings,
  SignatureFieldSettings, InitialFieldSettings, DropdownFieldSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner
);

// Initialize viewer
const pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';
pdfviewer.appendTo('#PdfViewer');

// Textbox
(document.getElementById('updateTextboxStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const tb = fields.find((f: any) => f.name === 'First Name') || fields[0];
  if (tb) {
    pdfviewer.formDesignerModule.updateFormField(tb, {
      value: 'John',
      fontFamily: 'Courier',
      fontSize: 12,
      fontStyle: FontStyle.None,
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white',
      alignment: 'Left',
      thickness: 2
    } as TextFieldSettings);
  }
});

// Password
(document.getElementById('updatePasswordStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const pw = fields.find((f: any) => f.name === 'Password');
  if (pw) {
    pdfviewer.formDesignerModule.updateFormField(pw, {
      tooltip: 'Enter password',
      fontFamily: 'Courier',
      fontSize: 10,
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white',
      alignment: 'Left',
      maxLength: 20,
      thickness: 1
    } as PasswordFieldSettings);
  }
});

// CheckBox
(document.getElementById('updateCheckBoxStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const cb = fields.find((f: any) => f.name === 'Subscribe');
  if (cb) {
    pdfviewer.formDesignerModule.updateFormField(cb, {
      isChecked: true,
      backgroundColor: 'white',
      borderColor: 'black',
      thickness: 2,
      tooltip: 'Subscribe'
    } as CheckBoxFieldSettings);
  }
});

// RadioButton
(document.getElementById('updateRadioStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const radios = fields.filter((f: any) => f.name === 'Gender');
  if (radios.length > 1) {
    pdfviewer.formDesignerModule.updateFormField(radios[0], { isSelected: false } as RadioButtonFieldSettings);
    pdfviewer.formDesignerModule.updateFormField(radios[1], {
      isSelected: true, thickness: 2, borderColor: 'black'
    } as RadioButtonFieldSettings);
  }
});

// ListBox
(document.getElementById('updateListBoxStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const lb = fields.find((f: any) => f.name === 'States');
  if (lb) {
    pdfviewer.formDesignerModule.updateFormField(lb, {
      options: [
        { itemName: 'Item 1', itemValue: 'item1' },
        { itemName: 'Item 2', itemValue: 'item2' },
        { itemName: 'Item 3', itemValue: 'item3' }
      ],
      value: 'item2',
      fontFamily: 'Courier',
      fontSize: 10,
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white'
    } as unknown as TextFieldSettings);
  }
});

// DropDown (uses ListBox settings)
(document.getElementById('updateDropDownStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const dd = fields.find((f: any) => f.name === 'Country');
  if (dd) {
    pdfviewer.formDesignerModule.updateFormField(dd, {
      options: [
        { itemName: 'USA', itemValue: 'US' },
        { itemName: 'Canada', itemValue: 'CA' },
        { itemName: 'Mexico', itemValue: 'MX' }
      ],
      value: 'US',
      fontFamily: 'Courier',
      fontSize: 10,
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white'
    } as DropdownFieldSettings);
  }
});

// Signature
(document.getElementById('updateSignatureStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const sig = fields.find((f: any) => f.name === 'Sign');
  if (sig) {
    pdfviewer.formDesignerModule.updateFormField(sig, {
      tooltip: 'Please sign here',
      thickness: 3,
      isRequired: true,
      isPrint: true,
      backgroundColor: 'white',
      borderColor: 'black'
    } as unknown as SignatureFieldSettings);
  }
});

// Initial
(document.getElementById('updateInitialStyle') as HTMLButtonElement)?.addEventListener('click', () => {
  const fields = pdfviewer.retrieveFormFields();
  const init = fields.find((f: any) => f.name === 'Initial');
  if (init) {
    pdfviewer.formDesignerModule.updateFormField(init, {
      tooltip: 'Add your initials',
      thickness: 2,
      isRequired: true,
      isPrint: true,
      backgroundColor: 'white',
      borderColor: 'black'
    } as unknown as InitialFieldSettings);
  }
});