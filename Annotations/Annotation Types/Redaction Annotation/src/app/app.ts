import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation,
  LinkAnnotation, ThumbnailView, BookmarkView, TextSelection,
  TextSearch, FormFields, FormDesigner, PageOrganizer
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner, PageOrganizer
);

// Create viewer (Standalone). For server-backed, set serviceUrl and omit resourceUrl.
const viewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});

// Default redaction settings
viewer.redactionSettings = {
  overlayText: 'Confidential',
  markerFillColor: '#FF0000',
  markerBorderColor: '#000000',
  isRepeat: false,
  fillColor: '#F8F8F8',
  fontColor: '#333333',
  fontSize: 14,
  fontFamily: 'Symbol',
  textAlign: 'Right'
};

viewer.appendTo('#PdfViewer');

/* --------------- Events --------------- */
viewer.annotationAdd = (args) => {
  console.log('Annotation added:', args);
};

/* --------------- Button actions --------------- */

// Add a redaction annotation programmatically
(document.getElementById('addRedactAnnot') as HTMLButtonElement)
  .addEventListener('click', () => {
    viewer.annotation.addAnnotation('Redaction', {
      bound: { x: 200, y: 480, width: 150, height: 75 },
      pageNumber: 1,
      markerFillColor: '#0000FF',
      markerBorderColor: 'white',
      fillColor: 'red',
      overlayText: 'Confidential',
      fontColor: 'yellow',
      fontFamily: 'Times New Roman',
      fontSize: 8,
      beforeRedactionsApplied: false
    });
  });

// Edit the first redaction annotation found
(document.getElementById('editRedactAnnotation') as HTMLButtonElement)
  .addEventListener('click', () => {
    for (const annot of viewer.annotationCollection) {
      if (annot.subject === 'Redaction') {
        annot.overlayText = 'EditedAnnotation';
        annot.markerFillColor = '#22FF00';
        annot.markerBorderColor = '#000000';
        annot.isRepeat = true;
        annot.fillColor = '#F8F8F8';
        annot.fontColor = '#333333';
        annot.fontSize = 14;
        annot.fontFamily = 'Symbol';
        annot.textAlign = 'Right';
        annot.beforeRedactionsApplied = false;
        viewer.annotation.editAnnotation(annot);
        break;
      }
    }
  });

// Delete a redaction by id (deletes the first redaction it finds)
(document.getElementById('deleteAnnotationbyId') as HTMLButtonElement)
  .addEventListener('click', () => {
    const target = viewer.annotationCollection.find(a => a.subject === 'Redaction');
    if (target) {
      viewer.annotationModule.deleteAnnotationById(target.annotationId);
    }
  });

// Add page redactions (marks pages; apply to finalize)
(document.getElementById('addPageRedactions') as HTMLButtonElement)
  .addEventListener('click', () => {
    viewer.annotation.addPageRedactions([1, 3, 5, 7]);
  });

// Apply redaction (permanently removes content)
(document.getElementById('redact') as HTMLButtonElement)
  .addEventListener('click', () => {
    viewer.annotation.redact();
  });