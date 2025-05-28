
import { PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer, 
    ExtractTextOption} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, ThumbnailView, BookmarkView,
    TextSelection, TextSearch, Print, Annotation, FormFields, FormDesigner, PageOrganizer);

let viewer:  PdfViewer = new PdfViewer();
viewer.serviceUrl= 'https://localhost:44309/pdfviewer',
viewer.documentPath= 'Annotations.pdf',

viewer.appendTo("#PdfViewer");

// Annotation toggle state
let exportObject: string ="";
let annotationsVisible: boolean = true;

const toggleButton = document.getElementById('toggleBtn') as HTMLButtonElement | null;

toggleButton?.addEventListener('click', () => {
    console.log(exportObject);
  if (annotationsVisible) {
    // Hide annotations by exporting and deleting them
        viewer.exportAnnotationsAsObject().then((value: object) => {
        exportObject = JSON.stringify(value); // Convert object to string for later use

      const count = viewer.annotationCollection.length;
      for (let i = 0; i < count; i++) {
        // Always delete the first item as the collection shrinks
        viewer.annotationModule.deleteAnnotationById(viewer.annotationCollection[0].annotationId);
      }

      if (toggleButton) toggleButton.innerText = 'Show Annotation';
      annotationsVisible = false;
    });
  } else {
    // Restore annotations
    if (exportObject) {
        exportObject=JSON.parse(exportObject);
      viewer.importAnnotation(JSON.parse(exportObject));
    }

    if (toggleButton) toggleButton.innerText = 'Hide Annotation';
    annotationsVisible = true;
  }
});