import React, { useState } from 'react';
import { FileText, QrCode, CreditCard, Send, X } from 'lucide-react';
import PDFUploader from './PDFUploader';
import QRScanner from './QRScanner';

const HomePage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: QR/IP, 3: Payment
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pageCounts, setPageCounts] = useState<number[]>([]);
  const [scannedIP, setScannedIP] = useState<string>('');
  const [manualIP, setManualIP] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const pricePerPage = 2;
  const totalPages = pageCounts.reduce((sum, count) => sum + count, 0);
  const totalPrice = totalPages * pricePerPage;

  // Step 1: Upload PDF
  const handlePDFUpload = (newFile: File, pages: number) => {
    setPdfFiles(prev => [...prev, newFile]);
    setPageCounts(prev => [...prev, pages]);
    setStep(2); // move to QR/IP step
  };

  const handleRemoveFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
    setPageCounts(prev => prev.filter((_, i) => i !== index));
  };

  // Step 2: QR Scan or Manual IP
  const handleQRScan = (ip: string) => {
    setScannedIP(ip);
    setStep(3); // move to Payment step
  };

  const handleManualIPSubmit = () => {
    if (manualIP.trim() !== '') {
      setScannedIP(manualIP.trim());
      setStep(3);
    }
  };

  // Step 3: Payment & Print
  const handleSendToPrinter = async () => {
    if (pdfFiles.length === 0 || !scannedIP) return;

    setIsSending(true);

    try {
      // Upload each file individually
      for (let i = 0; i < pdfFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', pdfFiles[i]);

        const response = await fetch(`http://${scannedIP}:5000/print`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          alert(`Failed to print ${pdfFiles[i].name}.`);
          continue;
        }
      }

      alert(`Documents sent to printer at ${scannedIP}!\nPages: ${totalPages}\nTotal: ₹${totalPrice}`);

      // Reset
      setPdfFiles([]);
      setPageCounts([]);
      setScannedIP('');
      setManualIP('');
      setStep(1);
    } catch (error) {
      alert('Error sending documents: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Scan & Pay</h1>

      {/* Step 1: Upload */}
      {step === 1 && (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h2 className="text-2xl font-semibold mb-4">Upload your document</h2>
          <p className="text-gray-600 mb-6">Upload PDF(s) to start printing instantly.</p>
          <PDFUploader onPDFUpload={handlePDFUpload} />

          {pdfFiles.length > 0 && (
            <div className="mt-6 space-y-2 bg-blue-50 p-4 rounded-lg">
              {pdfFiles.map((file, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-2 rounded">
                  <span>
                    <strong>{file.name}</strong> – {pageCounts[idx]} page(s)
                  </span>
                  <button
                    onClick={() => handleRemoveFile(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <p className="font-bold text-blue-900 mt-2">Total: ₹{totalPrice}</p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: QR / Manual IP */}
      {step === 2 && (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center space-y-6">
          <QrCode className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="text-2xl font-semibold">Connect to Printer</h2>
          <p className="text-gray-600">Scan printer QR or enter IP manually.</p>

          <QRScanner onScan={handleQRScan} isScanning={isScanning} setIsScanning={setIsScanning} />

          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter printer IP"
              value={manualIP}
              onChange={e => setManualIP(e.target.value)}
              className="border border-gray-300 rounded p-2 mr-2 w-48"
            />
            <button
              onClick={handleManualIPSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Connect
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment & Print */}
      {step === 3 && (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Payment & Print</h2>
          <p className="text-gray-600">Pages: {totalPages} | Total: ₹{totalPrice}</p>

          {/* Payment Button (UPI link example) */}
          <button
            onClick={handleSendToPrinter}
            disabled={isSending}
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSending ? 'Sending...' : 'Pay & Print'}
          </button>

          <p className="text-sm text-gray-500 mt-2">
            After payment, documents will be sent to printer automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
