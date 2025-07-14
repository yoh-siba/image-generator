'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingAnimation from './LoadingAnimation';
import { GeneratedImage } from '@/app/lib/imagen';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('プロンプトを入力してください');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('画像生成に失敗しました');
      }

      const result = await response.json();
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '画像生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyImageToClipboard = async () => {
    try {
      // Base64データURLをBlobに変換
      const response = await fetch(generatedImage!.url);
      const blob = await response.blob();
      
      // クリップボードに画像をコピー
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      alert('画像をコピーしました！');
    } catch (err) {
      console.error('画像のコピーに失敗しました:', err);
      alert('画像のコピーに失敗しました');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          yoh の画像生成アプリ
        </h1>

        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            プロンプト
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="生成したい画像の説明を入力してください..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
            disabled={isGenerating}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isGenerating ? '生成中...' : '生成'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="mt-8">
            <LoadingAnimation />
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <Image
                src={generatedImage.url}
                alt="生成された画像"
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            <div className="text-center">
              <button
                onClick={copyImageToClipboard}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                画像をコピー
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}