import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormDesigner, FormFields,
  TextFieldSettings, SignatureFieldSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormDesigner, FormFields
);

// Initialize the viewer
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
  // For server-backed:
  // serviceUrl: 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/'
});
pdfviewer.appendTo('#pdfViewer');

// Default constraints for newly added fields (from toolbar)
pdfviewer.textFieldSettings = {
  isReadOnly: false,
  isRequired: true,     // New textboxes will be required by default
  isPrint: true,
  tooltip: 'Required field'
};
pdfviewer.signatureFieldSettings = {
  isReadOnly: false,
  isRequired: false,
  isPrint: false,       // New signatures won’t appear in print by default
  tooltip: 'Sign if applicable'
};

// Create fields with constraints on document load
pdfviewer.documentLoad = () => {
  // isReadOnly example (printed, not required)
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'EmployeeId',
    bounds: { X: 146, Y: 229, Width: 150, Height: 24 },
    isReadOnly: true,
    isRequired: false,
    isPrint: true,
    value: 'EMP-0001'
  } as TextFieldSettings);

  // isRequired example (required email)
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'Email',
    bounds: { X: 146, Y: 260, Width: 220, Height: 24 },
    isReadOnly: false,
    isRequired: true,
    isPrint: true,
    tooltip: 'Email is required'
  } as TextFieldSettings);

  // isPrint example (do not print signature)
  pdfviewer.formDesignerModule.addFormField('SignatureField', {
    name: 'ApplicantSign',
    bounds: { X: 57, Y: 923, Width: 200, Height: 43 },
    isReadOnly: false,
    isRequired: true,
    isPrint: false,
    tooltip: 'Sign to accept the terms'
  } as SignatureFieldSettings);
};

// Validation wiring (blocks print/download if required fields are empty)
pdfviewer.enableFormFieldsValidation = true;
pdfviewer.validateFormFields = (args: any) => {
    alert('Please fill all required fields');
};

// Update constraints programmatically (button)
document.getElementById('updateConstraints')?.addEventListener('click', () => {
  // Toggle EmployeeId to editable
  const emp = pdfviewer.formFieldCollections.find(f => f.name === 'EmployeeId');
  if (emp) {
    pdfviewer.formDesignerModule.updateFormField(emp, { isReadOnly: false } as TextFieldSettings);
  }
  // Ensure Email stays required and printable
  const email = pdfviewer.formFieldCollections.find(f => f.name === 'Email');
  if (email) {
    pdfviewer.formDesignerModule.updateFormField(email, {
      isRequired: true,
      isPrint: true,
      tooltip: 'Enter a valid email'
    } as TextFieldSettings);
  }
  // Make signature printable (flip from default isPrint: false)
  const sign = pdfviewer.formFieldCollections.find(f => f.name === 'ApplicantSign');
  if (sign) {
    pdfviewer.formDesignerModule.updateFormField(sign, { isPrint: true } as SignatureFieldSettings);
  }
  alert('Constraints updated.');
});