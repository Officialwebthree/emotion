import React from 'react';
import { EmotionPrediction } from '../types/emotion';
import { Smile, Frown, Meh, Angry, Heart, Zap, Sunrise as Surprise } from 'lucide-react';

interface EmotionDisplayProps {
  predictions: EmotionPrediction[];
  isProcessing: boolean;
}

const emotionIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  happy: Smile,
  sad: Frown,
  neutral: Meh,
  angry: Angry,
  love: Heart,
  fearful: Zap,
  surprised: Surprise,
  disgusted: Frown
};

const emotionColors: Record<string, string> = {
  happy: 'text-yellow-400 bg-yellow-400/20',
  sad: 'text-blue-400 bg-blue-400/20',
  neutral: 'text-gray-400 bg-gray-400/20',
  angry: 'text-red-400 bg-red-400/20',
  love: 'text-pink-400 bg-pink-400/20',
  fearful: 'text-purple-400 bg-purple-400/20',
  surprised: 'text-orange-400 bg-orange-400/20',
  disgusted: 'text-green-400 bg-green-400/20'
};

export const EmotionDisplay: React.FC<EmotionDisplayProps> = ({
  predictions,
  isProcessing
}) => {
  const topEmotion = predictions[0];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Emotion Detection
      </h3>

      {isProcessing && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
          <span className="text-blue-400 ml-2">Processing...</span>
        </div>
      )}

      {topEmotion && (
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${emotionColors[topEmotion.emotion] || emotionColors.neutral}`}>
            {React.createElement(emotionIcons[topEmotion.emotion] || emotionIcons.neutral, {
              size: 32,
              className: emotionColors[topEmotion.emotion]?.split(' ')[0] || 'text-gray-400'
            })}
          </div>
          <h4 className="text-2xl font-bold text-white capitalize mb-1">
            {topEmotion.emotion}
          </h4>
          <p className="text-blue-300">
            {(topEmotion.confidence * 100).toFixed(1)}% confidence
          </p>
        </div>
      )}

      <div className="space-y-2">
        {predictions.slice(0, 5).map((prediction, index) => (
          <div key={prediction.emotion} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${emotionColors[prediction.emotion]?.split(' ')[1] || 'bg-gray-400/20'}`}></div>
              <span className="text-gray-300 capitalize">{prediction.emotion}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${prediction.confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400 w-12 text-right">
                {(prediction.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};