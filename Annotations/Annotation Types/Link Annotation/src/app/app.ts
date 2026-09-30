//import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/35.1.37/dist/ej2-pdfviewer-lib",
});
pdfviewer.appendTo('#PdfViewer');

const addInternalLinkButton = document.getElementById('AddInternalLink');
if (addInternalLinkButton) {
    addInternalLinkButton.addEventListener('click', () => {
        pdfviewer.annotation.addAnnotation('Link', {
            offset: { x: 200, y: 480 },
            pageNumber: 1,
            width: 150,
            height: 75,
            destinationPageIndex: 4,
            destinationLocation: { x: 100, y: 200 },
            zoomValue: 4,
            strokeColor: '#1433e3'
        }as any);
    });
}

const addExternalLinkButton = document.getElementById('AddExternalLink');
if (addExternalLinkButton) {
    addExternalLinkButton.addEventListener('click', () => {
        pdfviewer.annotation.addAnnotation('Link', {
            offset: { x: 450, y: 480 },
            pageNumber: 1,
            width: 150,
            height: 75,
            url: 'https://www.syncfusion.com',
            strokeColor: '#FF0000'
        }as any);
    });
}

const editLinkButton = document.getElementById('EditLink');
if (editLinkButton) {
    editLinkButton.addEventListener('click', () => {
        const linkAnnotation = pdfviewer.annotationCollection.find((item) => item.subject === 'Link');
        if (linkAnnotation) {
            linkAnnotation.strokeColor = '#1fcbd4';
            linkAnnotation.thickness = 2;
            linkAnnotation.bounds = { left: 100, top: 100, width: 100, height: 100 };
            linkAnnotation.url = 'https://www.google.com';
            linkAnnotation.destinationPageIndex = 3;
            linkAnnotation.destinationLocation = { x: 300, y: 300 };
            linkAnnotation.zoomValue = 1;
            pdfviewer.annotation.editAnnotation(linkAnnotation);
        }
    });
}

const deleteLinkButton = document.getElementById('DeleteLink');
if (deleteLinkButton) {
    deleteLinkButton.addEventListener('click', () => {
        const linkAnnotation = pdfviewer.annotationCollection.find((item) => item.subject === 'Link');
        if (linkAnnotation) {
            pdfviewer.annotation.deleteAnnotationById(linkAnnotation.annotationId);
        }
    });
}