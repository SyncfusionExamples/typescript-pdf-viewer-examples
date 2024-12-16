import { pdf } from '@syncfusion/ej2';
import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, TextSearchHighlightEventArgs, RectangleBounds, RectangleBoundsModel, RectangleSettings } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

const pdfviewer: PdfViewer = new PdfViewer({
    documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl:'https://cdn.syncfusion.com/ej2/28.1.33/dist/ej2-pdfviewer-lib'
});

pdfviewer.appendTo('#PdfViewer');

// Highlight event handler for text search, which adds a rectangle annotation where the text is found
pdfviewer.textSearchHighlight = function(args: TextSearchHighlightEventArgs): void {
    console.log(args);
    const pageNumber: number = args.pageNumber;
    const bounds: RectangleBoundsModel = args.bounds;
    pdfviewer.annotation.addAnnotation('Rectangle', {
        offset: { x: bounds.left,  y: bounds.top },
        pageNumber: pageNumber, 
        width: bounds.width, 
        height: bounds.height,
    } as RectangleSettings);
};

// Add event listener to "searchText" button to trigger a search for the term 'PDF'
const searchTextButton = document.getElementById('searchText');
if (searchTextButton) {
    searchTextButton.addEventListener('click', function() {
        pdfviewer.textSearchModule.searchText('PDF', false);
    });
}

// Add event listener to "searchNext" button to navigate to the next search result
const searchNextButton = document.getElementById('searchNext');
if (searchNextButton) {
    searchNextButton.addEventListener('click', function() {
    pdfviewer.textSearch.searchNext();
    });
}

// Add event listener to "searchCancel" button to cancel the current text search operation
const searchCancelButton = document.getElementById('searchCancel');
if (searchCancelButton) {
    searchCancelButton.addEventListener('click', function() {
    pdfviewer.textSearch.cancelTextSearch();
    });
}
