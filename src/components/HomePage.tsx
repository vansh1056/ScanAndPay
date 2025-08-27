import React, { useState } from 'react';
import { FileText, QrCode, X } from 'lucide-react';
import PDFUploader from './PDFUploader';
import QRScanner from './QRScanner';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pageCounts, setPageCounts] = useState<number[]>([]);
  const [scannedIP, setScannedIP] = useState<string>('');
  const [manualIP, setManualIP] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<string>("");

  const pricePerPage = 2;
  const totalPages = pageCounts.reduce((sum, count) => sum + count, 0);
  const totalPrice = totalPages * pricePerPage;

  const handleQRScan = (ip: string) => {
    setScannedIP(ip);
    setIsScanning(false);
    setStep(2);
  };

  const handleManualIPSubmit = () => {
    if (manualIP.trim() !== '') {
      setScannedIP(manualIP.trim());
      setStep(2);
    }
  };

  const handlePDFUpload = (newFile: File, pages: number) => {
    setPdfFiles(prev => [...prev, newFile]);
    setPageCounts(prev => [...prev, pages]);
    setStep(3);
  };

  const handleRemoveFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
    setPageCounts(prev => prev.filter((_, i) => i !== index));
  };

  const handlePaymentAndPrint = async () => {
    if (pdfFiles.length === 0) {
      alert("Please upload a PDF first.");
      return;
    }

    // Step 1: Open UPI payment link
    window.location.href = `upi://pay?pa=receiver@upi&pn=ScanPay&am=${totalPrice}&cu=INR`;

    // Step 2: Upload file to backend (ngrok URL)
    setStatus("Uploading file to printer...");

    const formData = new FormData();
formData.append("file", file);
formData.append("printer_ip", scannedIP);
formData.append("printer_name", "HP LaserJet Pro MFP M126nw[47F853]"); // for now, fixed

await fetch("https://54daf125775d.ngrok-free.app/print", {
  method: "POST",
  body: formData,
});


    try {
        const response = await fetch("https://54daf125775d.ngrok-free.app/print",{
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ File sent to printer successfully!");
      } else {
        setStatus("❌ Failed to send file to printer.");
      }
    } catch (error) {
      setStatus("⚠️ Error connecting to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden text-white py-10 px-4">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="w-full h-full bg-[conic-gradient(at_top_right,_#1e3a8a,_#9333ea,_#1e3a8a)] animate-spin-slow opacity-10"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-10 z-10">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          {['Connect', 'Upload', 'Payment'].map((label, idx) => (
            <div key={idx} className="flex-1">
              <motion.div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2
                  ${step === idx + 1 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : step > idx + 1 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-700'}`}
                animate={{ scale: step === idx + 1 ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {idx + 1}
              </motion.div>
              <p className="text-center text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Step 1: QR / Manual IP */}
        {step === 1 && (
          <motion.div className="bg-gray-800 shadow-lg rounded-xl p-6 text-center"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <QrCode className="mx-auto h-12 w-12 text-green-400 mb-4 animate-pulse" />
            <h2 className="text-2xl font-semibold mb-2">Connect to Printer</h2>
            <p className="text-gray-300 mb-4">Scan QR code or enter printer IP manually.</p>

            {!isScanning && (
              <button
                onClick={() => setIsScanning(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                Start Camera
              </button>
            )}

            {isScanning && (
              <QRScanner
                onScan={handleQRScan}
                isScanning={isScanning}
                setIsScanning={setIsScanning}
                constraints={{ video: { facingMode: { exact: 'environment' } } }}
              />
            )}

            <div className="mt-4 flex justify-center">
              <input
                type="text"
                placeholder="Enter printer IP"
                value={manualIP}
                onChange={e => setManualIP(e.target.value)}
                className="border border-gray-600 rounded p-2 mr-2 w-48 bg-gray-700 text-white"
              />
              <button
                onClick={handleManualIPSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                Connect
              </button>
            </div>

            {scannedIP && (
              <p className="mt-3 text-xs text-gray-400">Selected printer: {scannedIP}</p>
            )}
          </motion.div>
        )}

        {/* Step 2: Upload PDF */}
        {step === 2 && (
          <motion.div className="bg-gray-800 shadow-lg rounded-xl p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FileText className="mx-auto mb-4 h-12 w-12 text-blue-400 animate-bounce" />
            <h2 className="text-2xl font-semibold mb-4">Upload Your Document</h2>
            <p className="text-gray-300 mb-6">Drag & drop PDF files or click below to upload.</p>

            <PDFUploader onPDFUpload={handlePDFUpload} />

            {pdfFiles.length > 0 && (
              <div className="mt-6 space-y-2 bg-gray-700 p-4 rounded-lg">
                {pdfFiles.map((file, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-900 p-2 rounded hover:bg-gray-800 transition">
                    <span>
                      <strong>{file.name}</strong> – {pageCounts[idx]} page(s)
                    </span>
                    <button onClick={() => handleRemoveFile(idx)} className="text-red-400 hover:text-red-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <p className="font-bold text-blue-400 mt-2 animate-pulse">Total: ₹{totalPrice}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3: Payment & Print */}
        {step === 3 && (
          <motion.div className="bg-gray-800 shadow-lg rounded-xl p-6 text-center space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold">Payment & Print</h2>
            <p className="text-gray-300">Pages: {totalPages} | Total: ₹{totalPrice}</p>

            <motion.button
              onClick={handlePaymentAndPrint}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block shadow-md hover:shadow-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pay & Print
            </motion.button>

            {status && <p className="text-sm text-gray-400">{status}</p>}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
