import {
  PdfViewer,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer,
  ActionType,
  GoToActionModel
} from '@syncfusion/ej2-pdfviewer';

// Inject required modules
PdfViewer.Inject(
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  ThumbnailView,
  BookmarkView,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
);

// Initialize viewer
const pdfviewer: PdfViewer = new PdfViewer({
  documentPath:
    window.location.origin + '/form_document.pdf',

  resourceUrl:
    'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',

  documentLoad: function () {
    refreshButtonFields();
  },

  formFieldAdd: function () {
    refreshButtonFields();
  },

  formFieldRemove: function () {
    refreshButtonFields();
  }
});

pdfviewer.appendTo('#PdfViewer');

function refreshButtonFields(): void {
  const dropdown = document.getElementById(
    'buttonFields'
  ) as HTMLSelectElement;

  if (!dropdown) {
    return;
  }

  dropdown.innerHTML = '';

  const fields = Array.isArray(pdfviewer.formFieldCollections)
    ? pdfviewer.formFieldCollections
    : [];

  const buttonFields: any[] = [];

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].type === 'ButtonField') {
      buttonFields.push(fields[i]);
    }
  }

  if (buttonFields.length === 0) {
    const emptyOption = document.createElement('option');

    emptyOption.text = 'No Button Field';
    emptyOption.value = '';

    dropdown.appendChild(emptyOption);
    return;
  }

  for (let i = 0; i < buttonFields.length; i++) {
    const option = document.createElement('option');

    option.value = buttonFields[i].id;
    option.text =
      buttonFields[i].name ||
      buttonFields[i].value ||
      buttonFields[i].id;

    dropdown.appendChild(option);
  }
}

function addButtonField(): void {
  const fields = Array.isArray(pdfviewer.formFieldCollections)
    ? pdfviewer.formFieldCollections
    : [];

  let count = 0;

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].type === 'ButtonField') {
      count++;
    }
  }

  pdfviewer.formDesignerModule.addFormField('ButtonField', {
    name: 'Submit' + (count + 1),
    pageNumber: 1,
    bounds: {
      X: 100,
      Y: 350,
      Width: 120,
      Height: 32
    },
    value: 'Submit',
    text: 'Submit',
    tooltip: 'Click to submit',
    actions: {
      mouseUp: {
        action: ActionType.GoTo,
        destinationPageNumber: 5,
        destinationLocation: {
          x: 100,
          y: 100
        },
        zoomValue: 2
      } as GoToActionModel
    }
  });

  refreshButtonFields();
}

function enableButtonMode(): void {
  pdfviewer.formDesignerModule.setFormFieldMode('ButtonField');
}

function getSelectedField(): any {
  const selectedId = (
    document.getElementById('buttonFields') as HTMLSelectElement
  ).value;

  if (!selectedId) {
    return null;
  }

  const fields = Array.isArray(pdfviewer.formFieldCollections)
    ? pdfviewer.formFieldCollections
    : [];

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id === selectedId) {
      return fields[i];
    }
  }

  return selectedId;
}

function editButtonField(): void {
  const field = getSelectedField();

  if (!field) {
    alert('Select a button field');
    return;
  }

  pdfviewer.formDesignerModule.updateFormField(field, {
    value: 'Submit Button',
    text: 'Submit Button',
    alignment: 'Left',
    tooltip: 'Updated Submit Button',
    actions: {
      mouseUp: {
        action: ActionType.GoTo,
        destinationPageNumber: 7,
        destinationLocation: {
          x: 100,
          y: 100
        },
        zoomValue: 1
      } as GoToActionModel
    }
  });

  refreshButtonFields();
}

function deleteSelectedField(): void {
  const field = getSelectedField();

  if (!field) {
    alert('Select a button field');
    return;
  }

  pdfviewer.formDesignerModule.deleteFormField(field);

  refreshButtonFields();
}

// Expose functions to HTML onclick handlers
(window as any).addButtonField = addButtonField;
(window as any).enableButtonMode = enableButtonMode;
(window as any).editButtonField = editButtonField;
(window as any).deleteSelectedField = deleteSelectedField;