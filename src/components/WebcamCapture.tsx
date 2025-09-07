import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface WebcamCaptureProps {
  onVideoRef: (video: HTMLVideoElement | null) => void;
  isActive: boolean;
  onToggle: () => void;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onVideoRef,
  isActive,
  onToggle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        onVideoRef(videoRef.current);
      }
      setStream(mediaStream);
      setError('');
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    onVideoRef(null);
  };

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onToggle}
          className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-200"
        >
          {isActive ? <CameraOff size={20} /> : <Camera size={20} />}
        </button>
      </div>

      <div className="relative aspect-video">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm">
            <p className="text-red-400 text-center px-4">{error}</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        />

        {!isActive && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <Camera size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">Click to start camera</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};