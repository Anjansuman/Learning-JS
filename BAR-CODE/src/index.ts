import { createHash } from 'crypto';
import QRCode from 'qrcode';

// Function to generate a hash from certificate data
function generateCertificateHash(certificateData: string, secretKey: string): string {
    return createHash('sha256').update(certificateData + secretKey).digest('hex');
}

// Example: Generate a QR code from the hashed certificate data
async function generateSecureQRCode(certificateData: string) {
    const secretKey = "my-secret-key";  // Keep this secret
    const hash = generateCertificateHash(certificateData, secretKey);
    
    await QRCode.toFile('certificate_qr.png', hash); // Saves as an image
    console.log("Secure QR Code generated!");
}

// Example certificate data
const certificateData = "User: John Doe, CertificateID: 12345, IssueDate: 2025-02-12";
generateSecureQRCode(certificateData);
