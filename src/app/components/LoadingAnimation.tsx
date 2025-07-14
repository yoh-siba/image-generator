'use client';

import { useState, useEffect } from 'react';

const tips = [
  "AI画像生成は拡散モデルという技術を使用しています",
  "詳細なプロンプトを書くほど、より正確な画像が生成されます",
  "色や雰囲気を指定すると、より好みの画像が生成できます",
  "「高品質」「4K」「詳細」などの単語を追加すると良い結果が得られます",
  "画像生成には通常30秒から1分程度かかります",
  "Imagen 4.0は最新のGoogle製画像生成モデルです"
];

export default function LoadingAnimation() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce">
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-gray-600 mb-4 font-medium">画像を生成中...</p>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
          <p className="text-sm text-gray-700 leading-relaxed">
            💡 {tips[currentTip]}
          </p>
        </div>
      </div>
    </div>
  );
}