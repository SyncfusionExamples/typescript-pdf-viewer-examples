# DateTime Picker Form Field in TypeScript PDF Viewer

This sample demonstrates the **DateTime Picker** form field in the Syncfusion TypeScript PDF Viewer. It shows how to add date and time fields programmatically using the `formDesigner` module.

## What is covered

- **Add a Date field programmatically** using `addFormField('Textbox', { ... isDateField: true, actions: { format: { script: 'AFDate_FormatEx("m/d/yy")' } } })`.
- **Add a Time field programmatically** using `addFormField('Textbox', { ... isDateField: true, actions: { format: { script: 'AFTime_FormatEx("HH:MM")' } } })`.
- Common appearance properties: `fontSize`, `color`, `fontFamily`, `backgroundColor`, `borderColor`, `alignment`, `visibility`, `isRequired`, `isPrint`, `thickness`, `tooltip`.
- Fields accept values by direct typing or through the integrated calendar/time dropdown, with strict format validation (invalid values are rejected).

## Supported format strings

| Format String | Example Output |
|---|---|
| `m/d/yy` | `10/19/26` |
| `mm/dd/yyyy` | `10/19/2026` |
| `HH:MM` | `14:30` |
| `HH:MM:ss` | `14:30:45` |

## Getting Started

```
npm install
```

## Running

```
npm run start
```

## Learn more

- [Create Form Fields in TypeScript PDF Viewer UG](https://help.syncfusion.com/document-processing/pdf/pdf-viewer/typescript/getting-started)
- [Form Designer overview](https://ej2.syncfusion.com/typescript/documentation/api/pdfviewer/formdesigner)
