# PDF Viewer Client Application

This is a TypeScript-based client application for the Syncfusion PDF Viewer component.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## Installation

1. Navigate to the Client folder:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm start
```

This will start webpack dev server on `http://localhost:4000` and automatically open the application in your default browser.

## Build for Production

To build the application for production:

```bash
npm build
```

The build output will be generated in the `dist` folder.

## Project Structure

```
Client/
├── src/
│   ├── app/
│   │   └── app.ts          # Main application entry point
│   ├── styles/
│   │   └── styles.css      # Global styles
│   ├── index.html          # HTML template
│   └── resources/          # Static resources
├── dist/                   # Build output
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── webpack.config.js       # Webpack configuration
└── gulpfile.js            # Gulp tasks
```

## Available Features

- PDF Viewing
- Toolbar
- Navigation
- Magnification (Zoom)
- Annotations
- Form Fields
- Text Selection
- Text Search
- Print
- Bookmarks and Thumbnails

## License

This project is licensed under the Syncfusion license. See LICENSE file for details.
