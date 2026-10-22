import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner, PageOrganizer
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner, PageOrganizer
);

// Create the viewer
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',
  enableToolbar: true
});

pdfviewer.appendTo('#PdfViewer');

// Enable Callout Annotation mode
document.getElementById('btnEnableCalloutMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Callout');
});

// Exit Callout Annotation mode
document.getElementById('btnExitCalloutMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

// Add a Callout annotation programmatically
document.getElementById('btnAddCallout')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('Callout', {
    offset: { x: 200, y: 200 },
    pageNumber: 1,
    opacity: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    author: 'Guest',
    calloutLines: [
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 200, y: 250 }
    ],
    lineEndingStyle: 'Open'
  } as any);
});

// Edit an existing Callout annotation
document.getElementById('btnEditCallout')?.addEventListener('click', () => {
  const annots = pdfviewer.annotationCollection || [];
  for (let i = 0; i < annots.length; i++) {
    const annot = annots[i];
    if (annot.subject === 'Callout') {
      annot.bounds = { x: 300, y: 300, width: 200, height: 40, top: 300, left: 300 } as any;
      annot.dynamicText = 'Callout edited';
      annot.author = 'Syncfusion';
      annot.strokeColor = 'red';
      annot.fillColor = 'yellow';
      annot.textAlign = 'Center';
      pdfviewer.annotation.editAnnotation(annot);
      break;
    }
  }
});
