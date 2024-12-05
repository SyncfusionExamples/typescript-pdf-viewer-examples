import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib",
});

// Append the PdfViewer to the DOM
pdfviewer.appendTo('#PdfViewer');

// Add an event listener to the button
document.getElementById('getBase64')?.addEventListener('click', base64ofloadedDocument);

// Function to get Base64 of the loaded document
function base64ofloadedDocument() {
    pdfviewer.saveAsBlob().then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64data = reader.result;
            console.log(base64data);
        };
         // Read the blob as a data URL to get Base64
        reader.readAsDataURL(blob);
    })
}