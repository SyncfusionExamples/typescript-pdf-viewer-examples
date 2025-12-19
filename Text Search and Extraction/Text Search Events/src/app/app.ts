import { PdfViewer, TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields, PageInfoModel } from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(TextSelection, TextSearch, Print, Navigation, Toolbar, Magnification, Annotation, FormDesigner, FormFields);

// ---------- viewer instance ----------
const viewer: PdfViewer = new PdfViewer({
    documentPath : 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    resourceUrl: "https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib",

    /* ----- 1. fires immediately when search begins ----- */
    textSearchStart: (args: any) => {
        console.log('textSearchStart →', args.searchText);
        // reset UI
        (document.getElementById('resultInfo') as HTMLElement).textContent = 'Searching…';
    },

    /* ----- 2. for every match that becomes active/visible ----- */
    textSearchHighlight: (args: any) => {
        console.log(`Match on page ${args.pageNumber}`, args.bounds);
    },

    /* ----- 3. after whole document scanned for current term ----- */
    textSearchComplete: (args: any) => {
        console.log('textSearchComplete →', args);
        const label = document.getElementById('resultInfo') as HTMLElement;
        if (args.isMatchFound) {
            label.textContent = `Found ${args.totalMatches} match(es)`;
        } else {
            label.textContent = 'No results';
        }
    }
});
viewer.appendTo('#pdfViewer');

// ---------- helper to fetch UI values ----------
function getSearchOptions() {
    const term  = (document.getElementById('txtSearch') as HTMLInputElement).value;
    const mCase = (document.getElementById('chkCase') as HTMLInputElement).checked;
    const whole = (document.getElementById('chkWhole') as HTMLInputElement).checked;
    return { term, mCase, whole };
}

// ---------- wire up buttons ----------
(document.getElementById('btnSearch') as HTMLButtonElement).onclick = () => {
    const o = getSearchOptions();
    viewer.textSearch.searchText(o.term, o.mCase);
};

(document.getElementById('btnNext') as HTMLButtonElement).onclick = () => {
    viewer.textSearch.searchNext();
};

(document.getElementById('btnPrev') as HTMLButtonElement).onclick = () => {
    viewer.textSearch.searchPrevious();
};