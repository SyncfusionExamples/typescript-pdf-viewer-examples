import {
      PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
      ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer, PerimeterSettings
    } from '@syncfusion/ej2-pdfviewer';

    // Inject required modules
    PdfViewer.Inject(
      Toolbar, Magnification, Navigation, Annotation, LinkAnnotation,
      ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer
    );

    // Create viewer
    const pdfviewer = new PdfViewer();

    // Standalone setup
    pdfviewer.documentPath = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
    pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib';

    // Default Perimeter settings
    pdfviewer.perimeterSettings = {
      fillColor: 'green',
      opacity: 0.6,
      strokeColor: 'blue',
      // Optional defaults
      thickness: 2
    };

    // Default measurement settings (scale ratio + units)
    // Example: 2 cm in drawing equals 2 cm real-world (adjust for your use-case)
    pdfviewer.measurementSettings = {
      scaleRatio: 2,
      conversionUnit: 'cm',
      displayUnit: 'cm'
    };

    // Mount viewer
    pdfviewer.appendTo('#PdfViewer');

    // Enable Perimeter drawing mode
    document.getElementById('perimeterMode')?.addEventListener('click', () => {
      pdfviewer.annotationModule.setAnnotationMode('Perimeter');
    });

    // Add a Perimeter annotation programmatically
    document.getElementById('addPerimeterAnnotation')?.addEventListener('click', () => {
      pdfviewer.annotation.addAnnotation('Perimeter', {
        // Give it a subject so we can find it later to edit
        subject: 'Perimeter calculation',
        pageNumber: 1,
        offset: { x: 200, y: 350 },
        vertexPoints: [
          { x: 200, y: 350 },
          { x: 285, y: 350 },
          { x: 286, y: 412 }
        ],
        // You can override defaults here if needed:
        // strokeColor: '#FF0000', fillColor: '#00FF00', thickness: 3, opacity: 0.7
      } as PerimeterSettings);
    });

    // Edit an existing Perimeter annotation programmatically
    document.getElementById('editPerimeterAnnotation')?.addEventListener('click', () => {
      if (!pdfviewer || !pdfviewer.annotationCollection) return;
      for (let i = 0; i < pdfviewer.annotationCollection.length; i++) {
        const annot = pdfviewer.annotationCollection[i];
        if (annot && annot.subject === 'Perimeter calculation') {
          annot.annotationSelectorSettings = annot.annotationSelectorSettings || {};
          annot.annotationSelectorSettings.resizerShape = 'Circle';
          annot.strokeColor = '#0000FF';
          annot.thickness = 2;
          annot.fillColor = '#FFFF00';
          pdfviewer.annotation.editAnnotation(annot);
        }
      }
    });

    // Notes:
    // - To adjust scale ratio/units via UI, right-click a measurement annotation to open the context menu (Scale Ratio).
    // - Supported units: Inch, Millimeter, Centimeter, Point, Pica, Feet.