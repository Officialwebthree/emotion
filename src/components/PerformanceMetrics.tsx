import React from 'react';
import { PerformanceMetrics as MetricsType, SystemStats } from '../types/emotion';
import { Activity, Clock, Cpu, Eye } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: MetricsType;
  systemStats: SystemStats;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  metrics,
  systemStats
}) => {
  const formatLatency = (ms: number) => `${ms.toFixed(1)}ms`;
  const formatFPS = (fps: number) => `${fps.toFixed(0)} FPS`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Activity className="text-green-400" size={24} />
          <span className="text-green-400 text-sm font-medium">ACCURACY</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {(metrics.accuracy * 100).toFixed(1)}%
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {metrics.totalPredictions} predictions
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Clock className="text-blue-400" size={24} />
          <span className="text-blue-400 text-sm font-medium">LATENCY</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {formatLatency(systemStats.latency)}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          Processing time
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Cpu className="text-orange-400" size={24} />
          <span className="text-orange-400 text-sm font-medium">FPS</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {formatFPS(systemStats.fps)}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          Frames per second
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Eye className="text-purple-400" size={24} />
          <span className="text-purple-400 text-sm font-medium">FACES</span>
        </div>
        <div className="text-2xl font-bold text-white">
          {systemStats.detectedFaces}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          Detected faces
        </div>
      </div>
    </div>
  );
};