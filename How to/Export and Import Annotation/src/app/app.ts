import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-pdfviewer-lib";

pdfviewer.appendTo('#PdfViewer');

enum AnnotationDataFormat {
    Json = 'Json',
    Xfdf = 'Xfdf'
  }

let ExportXfdf = document.getElementById('ExportXfdf');
if (ExportXfdf) {
    ExportXfdf.addEventListener('click', function () {
        // export the annotation in XFDF format.
        pdfviewer.exportAnnotation(AnnotationDataFormat.Xfdf);
    });
}

let ExportJSON = document.getElementById('ExportJSON');
if (ExportJSON) {
    ExportJSON.addEventListener('click', function () {
        // export the annotation in JSON format.
        pdfviewer.exportAnnotation(AnnotationDataFormat.Json);
    });
}
let exportObject: any;
let ExportAnnotationsAsObject = document.getElementById('export');
//Export annotation as object.
if (ExportAnnotationsAsObject) {
    ExportAnnotationsAsObject.addEventListener('click', () => {
        pdfviewer.exportAnnotationsAsObject().then(function (value: any) {
            exportObject = value;
        });
    });
}

let Import = document.getElementById('import');
//Import annotation that are exported as object.
if (Import) {
    Import.addEventListener('click', () => {
        pdfviewer.importAnnotation(JSON.parse(exportObject));
    });
}