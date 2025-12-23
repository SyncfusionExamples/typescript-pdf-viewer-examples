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
  PageOrganizer,
  StickyNotesSettings
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
  FormDesigner,
  PageOrganizer
);

// Initialize with default Sticky Notes settings
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib',
  stickyNotesSettings: { author: 'Syncfusion' } // default settings
});
//pdfviewer.enableStickyNotesAnnotation = false;  // To disable Sticky Notes feature initially
pdfviewer.appendTo('#PdfViewer');

// Add Sticky Note programmatically
document.getElementById('stickyNote')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('StickyNotes', {
    offset: { x: 100, y: 200 },
    pageNumber: 1,
    isLock: false
  } as StickyNotesSettings);
});

// Edit first Sticky Note’s bounds programmatically
document.getElementById('editSticky')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    if (pdfviewer.annotationCollection[i].shapeAnnotationType === 'sticky') {
      const width = pdfviewer.annotationCollection[i].bounds.width;
      const height = pdfviewer.annotationCollection[i].bounds.height;
      pdfviewer.annotationCollection[i].bounds = { x: 100, y: 100, width, height };
      pdfviewer.annotation.editAnnotation(pdfviewer.annotationCollection[i]);
      break;
    }
  }
});