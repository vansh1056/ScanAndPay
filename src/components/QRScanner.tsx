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
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((d) => d.kind === "videoinput");

        if (cameras.length === 0) {
          setError("No camera found on this device.");
          return;
        }

        // Prefer back camera if available
        let cameraId = cameras[0].deviceId;
        const backCamera = cameras.find((c) =>
          c.label.toLowerCase().includes("back")
        );
        if (backCamera) {
          cameraId = backCamera.deviceId;
        }

        scannerRef.current = new Html5Qrcode("qr-reader");

        await scannerRef.current.start(
          { deviceId: { exact: cameraId } },
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
        setError(
          "Failed to access camera. Make sure you're using HTTPS and allowed camera permissions."
        );
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
