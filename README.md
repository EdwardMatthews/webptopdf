# WebP to PDF Converter

A modern web application that converts WebP images to PDF files directly in the browser. Built with Next.js, TailwindCSS, and TypeScript.

## Features

- 🚀 Convert WebP images to PDF instantly
- 🔒 Client-side processing for privacy
- 🌐 Multilingual support (English and Chinese)
- 📱 Responsive design
- ⚡ Fast and efficient conversion
- 🎨 Modern and intuitive UI
- 🆓 Completely free to use

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Sharp](https://sharp.pixelplumbing.com/) - High performance Node.js image processing
- [PDF-lib](https://pdf-lib.js.org/) - Create and modify PDF documents
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in React
- [React Dropzone](https://react-dropzone.js.org/) - HTML5 drag and drop for React

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/webp2pdf.git
cd webp2pdf
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
webp2pdf/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── components/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── locales/
│   │   │   │   ├── en/
│   │   │   │   └── zh/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── utils/
│   │       └── converter.ts
│   └── ...
├── public/
├── package.json
└── ...
```

## Features in Detail

### Image Processing
- Converts WebP images to PDF while maintaining quality
- Supports multiple files
- Client-side processing for privacy
- Automatic page sizing and image scaling

### User Interface
- Modern, responsive design
- Drag and drop file upload
- Progress indicators
- Error handling
- Smooth animations

### Internationalization
- English and Chinese language support
- Automatic language detection
- Easy language switching

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
