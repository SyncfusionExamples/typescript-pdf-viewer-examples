import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner
);

// Initialize viewer
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib'
});

pdfviewer.appendTo('#PdfViewer');

// Add a Date field
document.getElementById('btnAddDateField')?.addEventListener('click', () => {
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'DateField1',
    bounds: { X: 146, Y: 200, Width: 200, Height: 24 },
    pageNumber: 1,
    isDateField: true,
    fontSize: 10,
    color: 'black',
    fontFamily: 'Helvetica',
    backgroundColor: '#daeaf7ff',
    borderColor: '#303030',
    alignment: 'Left',
    isReadOnly: false,
    visibility: 'visible',
    isRequired: false,
    isPrint: true,
    tooltip: '',
    thickness: 1,
    actions: {
      format: { script: 'AFDate_FormatEx("m/d/yy")' }
    }
  } as any);
});

// Add a Time field
document.getElementById('btnAddTimeField')?.addEventListener('click', () => {
  pdfviewer.formDesignerModule.addFormField('Textbox', {
    name: 'TimeField1',
    bounds: { X: 146, Y: 250, Width: 200, Height: 24 },
    pageNumber: 1,
    isDateField: true,
    fontSize: 10,
    color: 'black',
    fontFamily: 'Helvetica',
    backgroundColor: '#daeaf7ff',
    borderColor: '#303030',
    alignment: 'Left',
    isReadOnly: false,
    visibility: 'visible',
    isRequired: false,
    isPrint: true,
    tooltip: '',
    thickness: 1,
    actions: {
      format: { script: 'AFTime_FormatEx("HH:MM")' }
    }
  } as any);
});
