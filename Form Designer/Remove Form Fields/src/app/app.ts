import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
         TextSelection, Annotation, FormDesigner, FormFields, TextFieldSettings, SignatureFieldSettings } from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
                 TextSelection, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});

// Optional server-backed
// pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';

pdfviewer.appendTo('#PdfViewer');

// Add form fields on document load
pdfviewer.documentLoad = () => {
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'First Name',
    bounds: { X: 146, Y: 229, Width: 150, Height: 24 }
  } as TextFieldSettings);

  pdfviewer.formDesignerModule.addFormField('Password', {
    name: 'Password',
    bounds: { X: 338, Y: 229, Width: 150, Height: 24 }
  } as TextFieldSettings);

  pdfviewer.formDesignerModule.addFormField('SignatureField', {
    name: 'Sign Here',
    bounds: { X: 146, Y: 280, Width: 200, Height: 43 }
  } as SignatureFieldSettings);
};

// Delete all added form fields on button click
(document.getElementById('deleteAllFields') as HTMLButtonElement).addEventListener('click', () => {
  const fields = [...pdfviewer.formFieldCollections]; // clone to avoid mutation issues
  fields.forEach(field => pdfviewer.formDesignerModule.deleteFormField(field));
});

(document.getElementById('deleteById') as HTMLButtonElement).addEventListener('click', () => {
  if (pdfviewer.formFieldCollections.length > 0) {
    const id = pdfviewer.formFieldCollections[0].id;
    if(id){
    pdfviewer.formDesignerModule.deleteFormField(id);
    }
  }
});