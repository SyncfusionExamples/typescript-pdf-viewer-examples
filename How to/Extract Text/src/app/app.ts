import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageInfoModel, ExtractTextOption } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const viewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/29.1.33/dist/ej2-pdfviewer-lib",
});
viewer.appendTo("#PdfViewer");

// Event Listener for Extract Text from Single Page
const extractTextButton = document.getElementById('extractText');
if (extractTextButton) {
extractTextButton.addEventListener('click', function () {
    viewer.extractText(1, ExtractTextOption.TextOnly).then((val) => {
        console.log('Extracted Text from Page 1:');
        console.log(val);  // Logs the extracted text from page 1
    });
});
}

// Event Listener for Extract Text from Multiple Pages
const extractTextButtons = document.getElementById('extractTexts');
if (extractTextButtons) {
extractTextButtons.addEventListener('click', function () {
    viewer.extractText(0, 2, ExtractTextOption.TextOnly).then((val) => {
        console.log('Extracted Text from Pages 0 to 2:');
        console.log(val);  // Logs the extracted text from pages 0 to 2
    });
});
}