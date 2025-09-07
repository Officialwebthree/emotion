export interface EmotionPrediction {
  emotion: string;
  confidence: number;
  timestamp: number;
}

export interface PerformanceMetrics {
  accuracy: number;
  precision: Record<string, number>;
  recall: Record<string, number>;
  f1Score: Record<string, number>;
  totalPredictions: number;
}

export interface SystemStats {
  fps: number;
  latency: number;
  isProcessing: boolean;
  detectedFaces: number;
}