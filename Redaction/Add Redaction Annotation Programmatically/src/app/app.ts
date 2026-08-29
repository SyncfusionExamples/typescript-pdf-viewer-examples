import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, RedactionSettings } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib",
});

//Adding Redaction Tool using Toolbar Settings
viewer.toolbarSettings.toolbarItems = ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool', 'RedactionEditTool', 'FormDesignerEditTool', 'SearchOption', 'PrintOption', 'DownloadOption'];
viewer.appendTo('#PdfViewer');

//Add Redaction Annotation Programmatically
   document.getElementById('addAnnot')?.addEventListener('click', function(){
       viewer.annotation.addAnnotation("Redaction", {
           bound: { x: 200, y: 480,width: 150, height: 75 },
           pageNumber: 1,
           markerOpacity: 0.5,
           markerFillColor: '#0000FF',
           markerBorderColor: 'white',
           fillColor: 'red',
           overlayText: 'text',
           fontColor: 'yellow',
           isRepeat: true,
           fontFamily: 'Times New Roman',
           fontSize: 8,
           textAlignment: 'Left',
           beforeRedactionsApplied: false
       } as unknown as RedactionSettings);
   });

//Delete Redaction annotation by id
document.getElementById('deleteAnnotationbyId')?.addEventListener('click', () => {
    viewer.annotationModule.deleteAnnotationById(
      viewer.annotationCollection[0].annotationId
    );
  });

//Applying Default Redaction Settings 
viewer.redactionSettings= {
        overlayText: 'Confidential',
        markerFillColor: '#FF0000',
        markerBorderColor: '#000000',
        isRepeat: false,
        fillColor: '#F8F8F8',
        fontColor: '#333333',
        fontSize: 14,
        fontFamily: 'Symbol',
        textAlignment: 'Right'
    };

//Event Listener to Edit Redaction Annotation
let editRedactAnnotation = document.getElementById('editRedactAnnotation');
if (editRedactAnnotation) {
 editRedactAnnotation.addEventListener('click', function () {
    if (viewer) {
        for (let i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].subject === "Redaction") {
                viewer.annotationCollection[i].overlayText= 'EditedAnnotation';
                viewer.annotationCollection[i].markerFillColor= '#22FF00';
                viewer.annotationCollection[i].markerBorderColor= '#000000';
                viewer.annotationCollection[i].isRepeat= true;
                viewer.annotationCollection[i].fillColor= '#F8F8F8';
                viewer.annotationCollection[i].fontColor= '#333333';
                viewer.annotationCollection[i].fontSize= 14;
                viewer.annotationCollection[i].fontFamily= 'Symbol';
                viewer.annotationCollection[i].textAlignment= 'Right';
                viewer.annotationCollection[i].beforeRedactionsApplied= true;
                viewer.annotation.editAnnotation(viewer.annotationCollection[i]);
            }
        }
    }
});
}

//Event Listener to Apply Page Redaction 
document.getElementById('addPageRedactions')?.addEventListener('click', () => {
    viewer.annotation.addPageRedactions([1, 3, 5, 7]); // Redacts pages 1, 3, 5, and 7(Enter the pages to Redact)
});

//Event Listener to Apply Redaction
document.getElementById('redact')?.addEventListener('click', () => {
    viewer.annotation.redact();
});
