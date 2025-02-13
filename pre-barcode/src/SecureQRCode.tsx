import React, { useState } from "react";
import QRCode from "react-qr-code";  // ✅ Using react-qr-code
import CryptoJS from "crypto-js";

// Secret key (keep it secure)
const SECRET_KEY = "my-secure-key";

const SecureQRCode: React.FC = () => {
  // Example certificate data
  const certificateData = {
    id: "CERT-12345",
    name: "John Doe",
    issueDate: "2025-02-12",
    expiryDate: "2026-02-12",
  };

  // Encrypt function (AES-256)
  const encryptData = (data: object): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  // Decrypt function
  const decryptData = (encryptedData: string): string | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null; // Decryption failed
    }
  };

  // Generate encrypted QR code content
  const encryptedQRCode = encryptData(certificateData);

  // State for verification
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isTampered, setIsTampered] = useState<boolean>(false);

  // Simulated scan function
  const handleScan = () => {
    const decrypted = decryptData(encryptedQRCode);
    if (decrypted) {
      setScannedData(decrypted);
      setIsTampered(false);
    } else {
      setScannedData(null);
      setIsTampered(true);
    }
  };

  return (
    <div className="flex justify-center">
        <div className="p-4 border border-gray-300 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Secure QR Code for Certificate</h2>

        {/* Generate QR Code */}
        <QRCode value={encryptedQRCode} size={200} className=""/>

        <div>
        <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleScan}
        >
            Simulate Scan & Verify
        </button>
        </div>

        {/* Verification Result */}
        {scannedData && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-500">
            <h3 className="font-semibold">Valid Certificate Data:</h3>
            <pre className="text-sm">{scannedData}</pre>
            </div>
        )}

        {isTampered && (
            <div className="mt-4 p-2 bg-red-100 text-red-800 border border-red-500">
            <h3 className="font-semibold">⚠️ QR Code has been tampered with!</h3>
            <p>Decryption failed, indicating data modification.</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default SecureQRCode;
