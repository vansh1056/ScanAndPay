import React, { useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig } from "html5-qrcode";

interface QRScannerProps {
  onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setError("");
    setScanning(true);

    try {
      // Get cameras in a mobile-friendly way
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        setError("No camera found on this device.");
        setScanning(false);
        return;
      }

      // Prefer back camera
      let cameraId = cameras[0].id;
      const backCamera = cameras.find((c) =>
        /back|rear|environment/i.test(c.label)
      );
      if (backCamera) cameraId = backCamera.id;

      // Initialize scanner
      scannerRef.current = new Html5Qrcode("qr-reader");
      const config: Html5QrcodeCameraScanConfig = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      };

      await scannerRef.current.start(
        { deviceId: { exact: cameraId } },
        config,
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (err) => console.warn("QR scan error:", err)
      );
    } catch (err) {
      console.error("Camera start failed:", err);
      setError(
        "Failed to access camera. Make sure you allow camera permissions and use HTTPS."
      );
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      }
      scannerRef.current = null;
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {!scanning ? (
        <button
          onClick={startScanner}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
        >
          Start QR Scanner
        </button>
      ) : (
        <div
          id="qr-reader"
          style={{ width: "100%", maxWidth: 400, height: 400, marginTop: 16 }}
        ></div>
      )}

      {scanning && (
        <button
          onClick={stopScanner}
          className="px-4 py-2 bg-red-600 text-white rounded-lg mt-2"
        >
          Stop Scanner
        </button>
      )}

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default QRScanner;
