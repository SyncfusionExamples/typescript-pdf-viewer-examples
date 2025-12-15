import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, FormDesigner, FormFields, TextFieldSettings, Print
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, FormDesigner, FormFields, Print
);

const pdfviewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
});

// Enable built-in validation BEFORE user actions
pdfviewer.enableFormFieldsValidation = true;

pdfviewer.appendTo('#pdfViewer');

// Add a required textbox so validation has something to catch
pdfviewer.documentLoad = () => {
  try {
    pdfviewer.formDesignerModule.addFormField('Textbox', {
      name: 'Email',
      bounds: { X: 146, Y: 260, Width: 220, Height: 24 },
      isRequired: true,
      tooltip: 'Email is required'
    } as TextFieldSettings);
  } catch {
    // Ignore if designer not available
  }
};

// Fires on Print/Download; cancel if required fields are empty
pdfviewer.validateFormFields = (args: any) => {
  //validateFormFields event args contains the collection of form fields which are not filled properly
  alert("Please fill all required fields. Missing: "+args.formField[0].name);
};