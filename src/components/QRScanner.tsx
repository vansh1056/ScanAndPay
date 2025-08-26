import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QrCode, Camera, StopCircle, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (result: string) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, isScanning, setIsScanning }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>('');
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);

  // 📷 Load available cameras safely
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("❌ getUserMedia is not supported in this browser.");
      setError("Camera access is not supported in this browser or insecure context (use HTTPS or localhost).");
      return;
    }

    const loadCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .map((device) => ({
            id: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(-4)}`
          }));
        setCameras(videoDevices);
        if (videoDevices.length === 0) {
          setError('No cameras found. Please ensure camera permissions are granted.');
        }
      } catch (error) {
        console.error("📷 Error accessing camera:", error);
        setError("Unable to access the camera. Please check permissions.");
      }
    };

    loadCameras();
  }, []);

  // 🟢 Start/stop scanning when state changes
  const startScanningInternal = React.useCallback(async () => {
    if (cameras.length === 0) {
      setError('No cameras found. Please ensure camera permissions are granted.');
      setIsScanning(false);
      return;
    }

    try {
      setError('');
      scannerRef.current = new Html5Qrcode('qr-reader');

      await scannerRef.current.start(
        cameras[0].id,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          console.log('Scanned:', decodedText);
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/;
          if (ipRegex.test(decodedText)) {
            onScan(decodedText);
          } else {
            onScan(decodedText); // Accept all for now
          }
          setIsScanning(false);
        },
        (err) => {
          console.warn('QR scan error:', err); // Ignore frequent errors
        }
      );
    } catch (err) {
      console.error('Error starting scanner:', err);
      setError('Failed to start camera. Please check permissions and reload the page.');
      setIsScanning(false);
    }
  }, [cameras, onScan, setIsScanning]);

  useEffect(() => {
    if (isScanning) {
      startScanningInternal();
    } else {
      stopScanningInternal();
    }
  }, [isScanning, cameras, startScanningInternal]);

  const stopScanningInternal = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const handleManualIP = () => {
    const ip = prompt('Enter printer IP address manually:');
    if (ip) {
      onScan(ip);
    }
  };

  return (
    <div className="w-full">
      {!isScanning ? (
        <div className="text-center space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Scan the QR code on your printer to connect
            </p>
            <div className="space-y-2">
              <button
                onClick={startScanning}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto"
              >
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </button>
              <button
                onClick={handleManualIP}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Enter IP manually
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div id="qr-reader" className="w-full"></div>
          <div className="text-center">
            <button
              onClick={stopScanning}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop Scanning
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
