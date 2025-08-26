import React, { useState } from 'react';
import { FileText, QrCode, CreditCard, Send, X, Zap, Upload } from 'lucide-react';
import PDFUploader from './PDFUploader';
import QRScanner from './QRScanner';

const HomePage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: QR/IP, 3: Payment
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pageCounts, setPageCounts] = useState<number[]>([]);
  const [manualIP, setManualIP] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

  const pricePerPage = 2;
  const totalPages = pageCounts.reduce((sum, count) => sum + count, 0);
  const totalPrice = totalPages * pricePerPage;

  const handlePDFUpload = (newFile: File, pages: number) => {
    setPdfFiles(prev => [...prev, newFile]);
    setPageCounts(prev => [...prev, pages]);
    setStep(2);
  };

  const handleRemoveFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
    setPageCounts(prev => prev.filter((_, i) => i !== index));
  };

  const handleQRScan = (ip: string) => {
    setManualIP(ip);
    setStep(3);
  };

  const handleManualIPSubmit = () => {
    if (manualIP.trim() !== '') {
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          {['Upload', 'Connect', 'Payment'].map((label, idx) => (
            <div key={idx} className="flex-1">
              <div className={`w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center mb-2
                ${step === idx + 1 ? 'bg-blue-600' : step > idx + 1 ? 'bg-green-600' : 'bg-gray-300'}`}>
                {idx + 1}
              </div>
              <p className="text-center text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-fadeIn">
            <FileText className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h2 className="text-2xl font-semibold mb-4">Upload Your Document</h2>
            <p className="text-gray-600 mb-6">Drag & drop PDF files or click below to upload.</p>
            <PDFUploader onPDFUpload={handlePDFUpload} />

            {pdfFiles.length > 0 && (
              <div className="mt-6 space-y-2 bg-blue-50 p-4 rounded-lg">
                {pdfFiles.map((file, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded">
                    <span>
                      <strong>{file.name}</strong> – {pageCounts[idx]} page(s)
                    </span>
                    <button onClick={() => handleRemoveFile(idx)} className="text-red-500 hover:text-red-700">
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
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-fadeIn">
            <QrCode className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Connect to Printer</h2>
            <p className="text-gray-600 mb-4">Scan QR code or enter printer IP manually.</p>

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
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-fadeIn space-y-4">
            <h2 className="text-2xl font-semibold">Payment & Print</h2>
            <p className="text-gray-600">Pages: {totalPages} | Total: ₹{totalPrice}</p>

            <a
              href={`upi://pay?pa=receiver@upi&pn=ScanPay&am=${totalPrice}&cu=INR`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Pay & Print
            </a>

            <p className="text-sm text-gray-500">
              After payment, documents will be sent to printer automatically.
            </p>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Upload className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Easy Upload</h3>
            <p className="text-gray-600 text-sm">Drag & drop PDFs or click to upload instantly.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <QrCode className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">QR Scan</h3>
            <p className="text-gray-600 text-sm">Scan printer QR or enter IP to connect directly.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Zap className="h-12 w-12 mx-auto text-orange-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Instant Print</h3>
            <p className="text-gray-600 text-sm">Send documents directly to printer after payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
