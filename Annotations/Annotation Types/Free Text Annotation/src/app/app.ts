// app.ts
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
  FreeTextSettings
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
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

// Create viewer
const pdfviewer: PdfViewer = new PdfViewer();

// Standalone setup (no server)
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

// Default Free Text settings BEFORE appendTo
pdfviewer.freeTextSettings = {
  fillColor: 'green',
  borderColor: 'blue',
  fontColor: 'yellow',
  fontFamily: 'Helvetica',
  fontSize: 16,
  opacity: 0.9
};

// Mount viewer
pdfviewer.appendTo('#PdfViewer');

// UI actions
document.getElementById('addFreeTextAnnotation')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('FreeText');
});

document.getElementById('setNone')?.addEventListener('click', () => {
  pdfviewer.annotationModule.setAnnotationMode('None');
});

document.getElementById('addFreeTextProgram')?.addEventListener('click', () => {
  pdfviewer.annotation.addAnnotation('FreeText', {
    offset: { x: 120, y: 80 },
    pageNumber: 1,
    width: 200,
    height: 40,
    isLock: false,
    defaultText: 'Syncfusion',
    fontFamily: 'Helvetica',
    fontSize: 16
  } as FreeTextSettings);
});

document.getElementById('editFreeTextAnnotation')?.addEventListener('click', () => {
  for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
    const item = pdfviewer.annotationCollection[i];
    if (item.subject === 'Text Box') {
      item.dynamicText = 'Updated text';
      item.fontColor = '#ff0000';
      pdfviewer.annotation.editAnnotation(item);
    }
  }
});

/*
If you prefer Server-Backed mode, replace the Standalone setup with:
pdfviewer.serviceUrl = 'https://document.syncfusion.com/web-services/pdf-viewer/api/pdfviewer/';
pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
(and remove resourceUrl)
*/