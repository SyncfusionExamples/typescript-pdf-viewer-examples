import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner} from '@syncfusion/ej2-pdfviewer';

PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

let pdfviewer: PdfViewer = new PdfViewer();
pdfviewer.documentPath = "https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf";
pdfviewer.resourceUrl = "https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib";
pdfviewer.enableFormDesigner = true;  //To disable form Designer set to `false` 
pdfviewer.appendTo('#PdfViewer');

// Access the form fields collection via button click
document.getElementById('formFieldCollection')?.addEventListener('click',function() {
    const fields = pdfviewer.formFieldCollection; // Gets all form fields
    console.log(fields)//Log the formField Collection
});
