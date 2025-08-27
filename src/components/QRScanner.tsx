import React, { useEffect, useRef } from 'react';

type QRScannerProps = {
  onScan: (text: string) => void;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  constraints?: MediaStreamConstraints; // optional; HomePage can pass preferred facingMode
};

const stopStream = (stream?: MediaStream | null) => {
  if (!stream) return;
  for (const track of stream.getTracks()) {
    try { track.stop(); } catch {}
  }
};

const QRScanner: React.FC<QRScannerProps> = ({ onScan, isScanning, setIsScanning, constraints }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const detectorRef = useRef<BarcodeDetector | null>(null);

  // build a detector if supported
  const setupDetector = async () => {
    // @ts-expect-error - BarcodeDetector may not exist in all TS lib versions
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      // @ts-ignore
      const formats = (await (window as any).BarcodeDetector?.getSupportedFormats?.()) || [];
      if (formats.includes('qr_code') || formats.length === 0) {
        // @ts-ignore
        detectorRef.current = new window.BarcodeDetector({ formats: ['qr_code'] });
      }
    }
  };

  useEffect(() => {
    setupDetector();
  }, []);

  useEffect(() => {
    if (!isScanning) {
      // cleanup when hidden
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopStream(streamRef.current);
      streamRef.current = null;
      return;
    }

    let cancelled = false;

    const start = async () => {
      try {
        // Try strict constraints first (rear cam), then fall back.
        const tryConstraints: MediaStreamConstraints[] = [
          constraints ?? { video: { facingMode: { exact: 'environment' } } },
          { video: { facingMode: 'environment' } },
          { video: true }
        ];

        let stream: MediaStream | null = null;
        let lastError: unknown = null;

        for (const c of tryConstraints) {
          try {
            stream = await navigator.mediaDevices.getUserMedia(c);
            break;
          } catch (e) {
            lastError = e;
          }
        }

        if (!stream) {
          console.error('Camera access failed:', lastError);
          alert('Failed to start camera. Please allow camera permission in browser settings and try again.');
          setIsScanning(false);
          return;
        }

        if (cancelled) {
          stopStream(stream);
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const detect = async () => {
          if (!videoRef.current) return;
          try {
            if (detectorRef.current) {
              const detections = await detectorRef.current.detect(videoRef.current);
              const match = detections.find(d => (d as any).rawValue);
              const text = (match as any)?.rawValue as string | undefined;
              if (text) {
                onScan(text);
                return; // stop after successful scan
              }
            }
          } catch (e) {
            // If BarcodeDetector fails, just continue; user can enter IP manually.
            // console.warn('Detector error', e);
          }
          rafRef.current = requestAnimationFrame(detect);
        };

        // kick off loop (only if detector available)
        if (detectorRef.current) {
          rafRef.current = requestAnimationFrame(detect);
        }
      } catch (err: any) {
        console.error('getUserMedia error:', err);
        const name = err?.name || 'Error';
        const msg =
          name === 'NotAllowedError'
            ? 'Camera permission was denied. Click the lock icon in the address bar and allow the Camera, then reload.'
            : name === 'NotFoundError'
            ? 'No camera was found on this device.'
            : name === 'OverconstrainedError'
            ? 'Requested camera constraints are not supported on this device.'
            : 'Failed to start camera.';
        alert(msg);
        setIsScanning(false);
      }
    };

    start();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stopStream(streamRef.current);
      streamRef.current = null;
    };
  }, [isScanning, setIsScanning, constraints, onScan]);

  return (
    <div className="mt-4 flex flex-col items-center">
      <video
        ref={videoRef}
        className="w-full max-w-md rounded-lg border border-gray-700"
        playsInline
        muted
      />
      <button
        onClick={() => setIsScanning(false)}
        className="mt-3 bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-600 transition-all"
      >
        Stop Camera
      </button>
      {/* Small hint if detector is missing */}
      {!detectorRef.current && (
        <p className="mt-2 text-xs text-gray-400">
          Tip: If QR doesn’t auto-detect, enter the printer IP manually.
        </p>
      )}
    </div>
  );
};

export default QRScanner;
