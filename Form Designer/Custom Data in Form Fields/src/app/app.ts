import {
  PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
  TextSelection, Annotation, FormDesigner, FormFields, TextFieldSettings
} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(
  Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView,
  BookmarkView, TextSelection, Annotation, FormDesigner, FormFields
);

const viewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-designer.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
  // For server-backed:
  // serviceUrl: 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/'
});
viewer.appendTo('#pdfViewer');

// 1) Default customData for fields added via Form Designer toolbar
(viewer as any).textFieldSettings = {
  name: 'Textbox',
  customData: { group: 'contact', createdBy: 'designer', requiredRole: 'user' }
};

// 2) Add a field programmatically with customData
viewer.documentLoad = () => {
  const meta = { businessId: 'C-1024', tags: ['profile', 'kiosk'], requiredRole: 'admin' };
  viewer.formDesignerModule.addFormField('Textbox', {
    name: 'Email',
    bounds: { X: 146, Y: 229, Width: 200, Height: 24 } as unknown as TextFieldSettings,
    customData: meta
  } as any);
};

// Helper to get first field
function getFirstField(): any | null {
  const fields = (viewer as any).retrieveFormFields?.() || (viewer as any).formFieldCollections || [];
  return fields.length ? fields[0] : null;
}

// 3) Update/replace customData on an existing field
document.getElementById('updateCustomData')!.addEventListener('click', () => {
  const target = getFirstField();
  if (!target) { alert('No form fields found'); return; }
  viewer.formDesignerModule.updateFormField(target, {
    customData: { group: 'profile', flags: ['pii', 'masked'], updatedAt: Date.now() }
  } as any);
  alert('customData updated on first field');
});

// 4) Read customData from all fields
document.getElementById('logCustomData')!.addEventListener('click', () => {
  const fields = (viewer as any).retrieveFormFields?.() || (viewer as any).formFieldCollections || [];
  if (!fields.length) { console.log('No fields'); return; }
  fields.forEach((f: any, i: number) => {
    console.log(`#${i} ${f.name}`, f.customData);
  });
  alert('Check console for customData logs');
});