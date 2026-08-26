# SharePoint PDF Viewer Web Part

A SharePoint Framework (SPFx) web part that integrates **Syncfusion EJ2 PDF Viewer** for viewing PDF documents stored in SharePoint. This application provides a view-only mode with a user-friendly interface for document selection and navigation.

## 📦 Installation

### Prerequisites
- A SharePoint development environment and a Microsoft 365 tenant (for testing/deployment).
- Node.js compatible with your SPFx version (check SPFx docs). This application requires 20.18.2
- Gulp: `npm install -g gulp-cli`.

### Setup Steps

1. **Clone/Extract the project**
   ```bash
   cd typescript-pdf-viewer-examples/SharePoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure PDF Source Location**
   Edit `src/webparts/pdfviewer/PdfviewerWebPart.ts`:
   - Replace `YOUR-SHAREPOINT-SITE` with your SharePoint site URL
   - Replace `{your-site-name}` with your site name
   - Replace `{documents-containing-path}` with the path to your PDF documents folder

   ```typescript
   const url = `${targetSite}/_api/web/GetFolderByServerRelativeUrl('/sites/{your-site-name}/{documents-containing-path}')/Files`;
   ```

4. **Configure Resource URL** (Optional)
   Update the `resourceUrl` in the PDF Viewer initialization:
   ```typescript
   resourceUrl: '${YOUR-LOCATION-FOR-RESOURCE}/ej2-pdfviewer-lib'
   ```

## Run the application

### Development Build

```bash
gulp serve
```

The sample will be hosted in `https://{tenantDomain}/_layouts/workbench.aspx`.

## 📖 Usage

### Adding the Web Part to a Page

1. Navigate to a SharePoint page (modern or full page)
2. Click **Edit** to enter edit mode
3. Click **+ Add a new web part**
4. Search for **"pdfviewer"** (labeled as "Advanced" category)
5. Click to add the web part
6. The web part will load available PDF documents from the configured location
7. Use the dropdown menu to select a PDF document
8. The selected document will load in the viewer

### Web Part Configuration

**Property Pane Settings**
- Navigate to the web part menu → **Edit web part**
- **Basic Settings**:
  - **Description**: Add a description for the web part (for reference)

### Toolbar Options (View-Only Mode)

The toolbar displays the following tools:
- **Open Option**: Load a different document
- **Page Navigation Tool**: Jump to specific pages
- **Magnification Tool**: Zoom controls
- **Pan Tool**: Navigate large pages
- **Print Option**: Print the document

## View-Only Mode

### Form Fields
All form fields are automatically set to **read-only** when the document loads:
```typescript
viewer.formDesignerModule.updateFormField(viewer.formFieldCollections[x], {
  isReadOnly: true,
});
```

### Disabled Features
- Annotations and sticky notes
- Page organizer
- Context menu interactions
- Direct form field editing

## 🔗 Resources

- [Syncfusion Javascript PDF Viewer](https://www.syncfusion.com/pdf-viewer-sdk/javascript-pdf-viewer)
- [Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-viewer/react/depoyment-integration/share-point)