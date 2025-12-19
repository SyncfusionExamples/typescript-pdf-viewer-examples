import {
    PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
    ThumbnailView, BookmarkView, TextSelection, TextSearch
} from '@syncfusion/ej2-pdfviewer';

// Register required modules
PdfViewer.Inject(
    Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
    ThumbnailView, BookmarkView, TextSelection, TextSearch
);

// Initialise viewer
const pdfviewer: PdfViewer = new PdfViewer({
    enableTextSearch: true,
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib'
});
pdfviewer.appendTo('#PdfViewer');

// --------- UI bindings ---------
const txtSearch     = document.getElementById('txtSearch')  as HTMLInputElement;
const chkMatchCase  = document.getElementById('chkMatchCase')  as HTMLInputElement;

(document.getElementById('btnSearch') as HTMLButtonElement).onclick = () => {
    pdfviewer.textSearch.searchText(
        txtSearch.value,
        chkMatchCase.checked
    );
};

(document.getElementById('btnNext') as HTMLButtonElement).onclick = () => {
    pdfviewer.textSearch.searchNext();
};

(document.getElementById('btnPrev') as HTMLButtonElement).onclick = () => {
    pdfviewer.textSearch.searchPrevious();
};

(document.getElementById('btnCancel') as HTMLButtonElement).onclick = () => {
    pdfviewer.textSearch.cancelTextSearch();
};