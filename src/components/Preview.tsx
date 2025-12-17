import { useEffect, useRef } from 'react';
import type { EmojiSettings, CanvasSize } from '../types';

interface PreviewProps {
  settings: EmojiSettings;
  canvasSize: CanvasSize;
}

function Preview({ settings, canvasSize }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvasをクリア
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // テキストを描画
    ctx.fillStyle = settings.textColor;
    ctx.font = `${settings.fontSize}px ${settings.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      settings.text,
      canvasSize.width / 2,
      canvasSize.height / 2
    );
  }, [settings, canvasSize]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">プレビュー</h2>
      <div className="flex justify-center mt-4">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="border-2 border-gray-300 rounded-lg shadow-lg"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <p className="text-center mt-3 text-sm text-gray-500 font-medium">
        {canvasSize.width} × {canvasSize.height} px
      </p>
    </div>
  );
}

export default Preview;