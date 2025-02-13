import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import QRCode from 'qrcode';

// Function to wrap text for certificate design
function wrapText(text: string, font: any, fontSize: number, pageWidth: number, margin: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth < pageWidth - 2 * margin) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines;
}

// Function to generate the QR code as a base64 image
async function generateQRCode(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(data, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) reject(err);
            resolve(url);
        });
    });
}

async function generateCertificate(name: string, course: string, date: string) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a page to the document (A4 size)
    const page = pdfDoc.addPage([595, 842]); // A4 size: 595 x 842

    // Set the fonts for various parts of the certificate
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const contentFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
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
        borderColor: rgb(0, 0, 0),
        borderWidth: 2,
    });

    // Title of the certificate
    page.drawText('Certificate of Achievement', {
        x: 100,
        y: 750,
        size: largeFontSize,
        font: titleFont,
        color: rgb(0, 0, 0),
    });

    // Course name
    page.drawText(course, {
        x: 100,
        y: 700,
        size: fontSize,
        font: contentFont,
        color: rgb(0, 0, 0),
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
            color: rgb(0, 0, 0),
        });
        yPosition -= fontSize + 2;
    }

    // Date of completion (e.g., "February 2025")
    page.drawText(`Date: ${date}`, {
        x: 100,
        y: 100,
        size: smallFontSize,
        font: contentFont,
        color: rgb(0, 0, 0),
    });

    // Optional: Add a "signature" line at the bottom (simulated with a line)
    page.drawLine({
        start: { x: 100, y: 60 },
        end: { x: 495, y: 60 },
        thickness: 1,
        color: rgb(0, 0, 0),
    });
    page.drawText('Authorized Signature', {
        x: 200,
        y: 40,
        size: smallFontSize,
        font: contentFont,
        color: rgb(0, 0, 0),
    });

    // Generate QR code and embed it
    const qrData = 'https://example.com/certificate/verification'; // Unique URL for certificate verification
    const qrCodeUrl = await generateQRCode(qrData);

    // Embed the QR code image into the PDF
    const qrImage = await pdfDoc.embedPng(qrCodeUrl);
    const qrWidth = 100; // QR code size
    const qrHeight = 100;

    page.drawImage(qrImage, {
        x: 495 - qrWidth, // Position on the page
        y: 150,
        width: qrWidth,
        height: qrHeight,
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('certificate_with_qr.pdf', pdfBytes);

    console.log('Certificate PDF with QR code generated.');
}

// Call the function to generate a certificate
generateCertificate('John Doe', 'React Development Course', 'February 2025')
    .catch(err => console.log('Error generating certificate:', err));
