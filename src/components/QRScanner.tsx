import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [error, setError] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        // Make sure camera permissions are requested
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((d) => d.kind === "videoinput");

        if (cameras.length === 0) {
          setError("No camera found.");
          return;
        }

        // Pick the first available camera
        const cameraId = cameras[0].deviceId;

        scannerRef.current = new Html5Qrcode("qr-reader");

        await scannerRef.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanner();
          },
          (err) => {
            console.warn("QR scan error:", err);
          }
        );
      } catch (err) {
        console.error("Camera start failed:", err);
        setError("Failed to access camera. Use HTTPS or localhost.");
      }
    };

    const stopScanner = async () => {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };

    startScanner();

    // Cleanup when component unmounts
    return () => {
      stopScanner();
    };
  }, [onScan]);

  return (
    <div>
      <div id="qr-reader" style={{ width: "300px", height: "300px" }}></div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default QRScanner;
