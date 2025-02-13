"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
const fs_1 = __importDefault(require("fs"));
// Function to wrap text for certificate design
function wrapText(text, font, fontSize, pageWidth, margin) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (let word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth < pageWidth - 2 * margin) {
            currentLine = testLine;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }
    return lines;
}
function generateCertificate(name, course, date) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a new PDF document
        const pdfDoc = yield pdf_lib_1.PDFDocument.create();
        // Add a page to the document (A4 size)
        const page = pdfDoc.addPage([595, 842]); // A4 size: 595 x 842
        // Set the fonts for various parts of the certificate
        const { StandardFonts } = require('pdf-lib');
        const titleFont = yield pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const contentFont = yield pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 18;
        const largeFontSize = 36;
        const smallFontSize = 12;
        const margin = 50;
        // Set up certificate border
        const borderMargin = 30;
        page.drawRectangle({
            x: borderMargin,
            y: 842 - borderMargin - 100,
            width: 595 - 2 * borderMargin,
            height: 842 - 2 * borderMargin,
            borderColor: (0, pdf_lib_1.rgb)(0, 0, 0),
            borderWidth: 2,
        });
        // Title of the certificate
        page.drawText('Certificate of Achievement', {
            x: 100,
            y: 750,
            size: largeFontSize,
            font: titleFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Course name
        page.drawText(course, {
            x: 100,
            y: 700,
            size: fontSize,
            font: contentFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Name of the recipient (e.g., "John Doe")
        const nameLines = wrapText(name, contentFont, fontSize, 595, margin);
        let yPosition = 650;
        for (let line of nameLines) {
            page.drawText(line, {
                x: margin,
                y: yPosition,
                size: fontSize,
                font: contentFont,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            yPosition -= fontSize + 2;
        }
        // Date of completion (e.g., "February 2025")
        page.drawText(`Date: ${date}`, {
            x: 100,
            y: 100,
            size: smallFontSize,
            font: contentFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Optional: Add a "signature" line at the bottom (simulated with a line)
        page.drawLine({
            start: { x: 100, y: 60 },
            end: { x: 495, y: 60 },
            thickness: 1,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        page.drawText('Authorized Signature', {
            x: 200,
            y: 40,
            size: smallFontSize,
            font: contentFont,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
        // Save the PDF to a file
        const pdfBytes = yield pdfDoc.save();
        fs_1.default.writeFileSync('certificate.pdf', pdfBytes);
        console.log('Certificate PDF generated.');
    });
}
// Call the function to generate a certificate
generateCertificate('John Doe', 'React Development Course', 'February 2025')
    .catch(err => console.log('Error generating certificate:', err));
