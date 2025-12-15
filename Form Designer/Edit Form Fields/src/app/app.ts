import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, FontStyle,
  TextFieldSettings, PasswordFieldSettings, CheckBoxFieldSettings, RadioButtonFieldSettings,
  ListBoxFieldSettings, SignatureFieldSettings, InitialFieldSettings,
  DropdownFieldSettings
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

// Edit Textbox
(document.getElementById('editTextbox') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the textbox field by name (Here field name is First Name)
  const field = fields.find((f: any) => f.name === 'First Name') || fields[0]; // Update name if needed
  if (field) {
    // Update textbox field styling and value
    pdfviewer.formDesignerModule.updateFormField(field, {
      value: 'John',
      fontFamily: 'Courier',
      fontSize: 12,
      fontStyle: FontStyle.None,
      color: 'black',
      backgroundColor: 'white',
      borderColor: 'black',
      thickness: 2,
      alignment: 'Left',
      maxLength: 50
    } as TextFieldSettings);
  }
});

// Edit Password
(document.getElementById('editPasswordBox') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the password field by name (Here field name is Password)
  const field = fields.find((f: any) => f.name === 'Password');
  if (field) {
    // Update password field properties
    pdfviewer.formDesignerModule.updateFormField(field, {
      tooltip: 'Enter your password',
      isReadOnly: false,
      isRequired: true,
      isPrint: true,
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

// Edit CheckBox
(document.getElementById('editCheckbox') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the checkbox field by name (Here field name is Subscribe)
  const cb = fields.find((f: any) => f.name === 'Subscribe');
  if (cb) {
    // Update checkbox field properties and state
    pdfviewer.formDesignerModule.updateFormField(cb, {
      isChecked: true,
      backgroundColor: 'white',
      borderColor: 'black',
      thickness: 2,
      tooltip: 'Subscribe to newsletter'
    } as CheckBoxFieldSettings);
  }
});

// Edit RadioButton
(document.getElementById('editRadio') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Filter the radio button group by name (Here group name is Gender)
  const genderRadios = fields.filter((f: any) => f.name === 'Gender');
  if (genderRadios.length > 1) {
    // Update radio button selection and appearance
    pdfviewer.formDesignerModule.updateFormField(genderRadios[0], { isSelected: false } as RadioButtonFieldSettings);
    pdfviewer.formDesignerModule.updateFormField(genderRadios[1], {
      isSelected: true, thickness: 2, borderColor: 'black'
    } as RadioButtonFieldSettings);
  }
});

// Edit ListBox
(document.getElementById('editListBox') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the listbox field by name (Here field name is States)
  const lb = fields.find((f: any) => f.name === 'States');
  if (lb) {
    // Update listbox options, selection, and appearance
    pdfviewer.formDesignerModule.updateFormField(lb, {
    options: [
        { itemName: 'Alabama', itemValue: 'AL' },
        { itemName: 'Alaska', itemValue: 'AK' },
        { itemName: 'Arizona', itemValue: 'AZ' }
      ],
      value: 'AZ',
      fontFamily: 'Courier',
      fontSize: 10,
      color: 'black',
      borderColor: 'black',
      backgroundColor: 'white',
    } as unknown as TextFieldSettings);
  }
});

// Edit DropDown
(document.getElementById('editDropDown') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the dropdown field by name (Here field name is Country)
  const dd = fields.find((f: any) => f.name === 'Country');
  if (dd) {
    // Update dropdown items, value, and appearance
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
    } as unknown as DropdownFieldSettings); // DropDown uses ListBox settings
  }
});

// Edit Signature
(document.getElementById('editSignature') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the signature field by name (Here field name is Sign)
  const sig = fields.find((f: any) => f.name === 'Sign');
  if (sig) {
    // Update signature field properties
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

// Edit Initial
(document.getElementById('editInitial') as HTMLButtonElement)?.addEventListener('click', () => {
  // Retrieve form fields collection
  const fields = pdfviewer.retrieveFormFields();
  // Find the initial field by name (Here field name is Initial)
  const init = fields.find((f: any) => f.name === 'Initial');
  if (init) {
    // Update initial field properties
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