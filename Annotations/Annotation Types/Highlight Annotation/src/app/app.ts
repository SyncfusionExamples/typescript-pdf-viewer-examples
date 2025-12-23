import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner, PageOrganizer, HighlightSettings
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner, PageOrganizer
);

// Create the viewer with default Highlight settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  // If using Standalone (no service), include the resourceUrl:
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  // Default Highlight settings at initialization
  highlightSettings: {
    author: 'Guest User',
    subject: 'Important',
    color: '#ffff00',
    opacity: 0.9
  },
  // Show built-in toolbar (includes Edit Annotation group)
  enableToolbar: true
});

// For Server-Backed mode, uncomment the following line and remove resourceUrl:
// pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';

pdfviewer.appendTo('#PdfViewer');

// Enter Highlight mode
document.getElementById('btnHighlightMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('Highlight');
});

// Exit Highlight mode (normal mode)
document.getElementById('btnNormalMode')?.addEventListener('click', () => {
  pdfviewer.annotation.setAnnotationMode('None');
});

// Add a Highlight programmatically
document.getElementById('btnAddHighlight')?.addEventListener('click', () => {
  // Example values — adjust bounds to match your loaded document content
  pdfviewer.annotation.addAnnotation('Highlight', {
    bounds: [{ x: 97, y: 110, width: 350, height: 14 }],
    pageNumber: 1
  } as HighlightSettings);
});

// Edit the first existing Highlight annotation (color + opacity)
document.getElementById('btnEditFirstHighlight')?.addEventListener('click', () => {
  const annots = pdfviewer.annotationCollection || [];
  for (let i = 0; i < annots.length; i++) {
    const annot = annots[i];
    if (annot.textMarkupAnnotationType === 'Highlight') {
      annot.color = '#000fff';   // Blue
      annot.opacity = 0.8;
      pdfviewer.annotation.editAnnotation(annot);
      break;
    }
  }
});

// Undo last action
document.getElementById('btnUndo')?.addEventListener('click', () => {
  pdfviewer.undo();
});

// Redo last undone action
document.getElementById('btnRedo')?.addEventListener('click', () => {
  pdfviewer.redo();
});

// Toggle Disable/Enable Text Markup annotations (includes Highlight)
let textMarkupDisabled = false;
document.getElementById('btnToggleTextMarkup')?.addEventListener('click', (e) => {
  textMarkupDisabled = !textMarkupDisabled;
  pdfviewer.enableTextMarkupAnnotation = !textMarkupDisabled;
  // Also exit highlight mode if disabling
  if (textMarkupDisabled) {
    pdfviewer.annotation.setAnnotationMode('None');
  }
  const btn = e.currentTarget as HTMLButtonElement;
  btn.textContent = textMarkupDisabled ? 'Enable Text Markup' : 'Disable Text Markup';
});