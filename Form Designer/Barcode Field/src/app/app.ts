import {
  PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields,
  FormDesigner
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
  ThumbnailView, BookmarkView, TextSelection, TextSearch,
  FormFields, FormDesigner
);

// Initialize viewer
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath: 'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf',
  resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',
  documentLoad: function () {
    refreshBarcodeFields();
  },

  formFieldAdd: function () {
    refreshBarcodeFields();
  },

  formFieldRemove: function () {
    refreshBarcodeFields();
  }
});

pdfviewer.appendTo('#PdfViewer');


function refreshBarcodeFields() {

  var dropdown: HTMLElement | null = document.getElementById('barcodeFields');
  if (dropdown) {
    dropdown.innerHTML = '';

    var fields = Array.isArray(pdfviewer.formFieldCollections)
      ? pdfviewer.formFieldCollections
      : [];

    var barcodeFields = [];

    for (var i = 0; i < fields.length; i++) {

      if (fields[i].type === 'Barcode') {
        barcodeFields.push(fields[i]);
      }
    }

    if (barcodeFields.length === 0) {

      var emptyOption = document.createElement('option');
      emptyOption.text = 'No Barcode Field';
      emptyOption.value = '';

      dropdown.appendChild(emptyOption);
      return;
    }

    for (var j = 0; j < barcodeFields.length; j++) {

      var option: any = document.createElement('option');

      option.value = barcodeFields[j].id;
      option.text =
        barcodeFields[j].name +
        ' (' +
        barcodeFields[j].symbology +
        ')';

      dropdown.appendChild(option);
    }
  }

}

function addBarcodeField(symbology: any) {

  var fields = Array.isArray(pdfviewer.formFieldCollections)
    ? pdfviewer.formFieldCollections
    : [];

  var count = 0;

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].type === 'Barcode') {
      count++;
    }
  }

  pdfviewer.formDesignerModule.addFormField('Barcode', {
    name: 'Barcode' + (count + 1),
    bounds: {
      X: 100,
      Y: 150,
      Width: 200,
      Height: 80
    },
    pageNumber: 1,
    symbology: symbology
  });

  refreshBarcodeFields();
}

function enableBarcodeMode() {

  pdfviewer.formDesignerModule.setFormFieldMode('Barcode');
}

function getSelectedField() {

  var selectedId: string =
    (document.getElementById('barcodeFields') as HTMLInputElement).value;

  if (!selectedId) {
    return null;
  }

  var fields = Array.isArray(pdfviewer.formFieldCollections)
    ? pdfviewer.formFieldCollections
    : [];

  for (var i = 0; i < fields.length; i++) {

    if (fields[i].id === selectedId) {
      return fields[i];
    }
  }

  return selectedId;
}

function updateSymbology(symbology: any) {

  var field = getSelectedField();

  if (!field) {
    alert('Select a barcode field');
    return;
  }

  pdfviewer.formDesignerModule.updateFormField(field, {
    symbology: symbology
  });

  refreshBarcodeFields();
}

function deleteSelectedField() {

  var field = getSelectedField();

  if (!field) {
    alert('Select a barcode field');
    return;
  }

  pdfviewer.formDesignerModule.deleteFormField(field);

  refreshBarcodeFields();
}
// expose functions to HTML onclick handlers
(window as any).addBarcodeField = addBarcodeField;
(window as any).enableBarcodeMode = enableBarcodeMode;
(window as any).updateSymbology = updateSymbology;
(window as any).deleteSelectedField = deleteSelectedField