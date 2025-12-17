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
    <div style={{ padding: '1rem' }}>
      <h2>プレビュー</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            border: '1px solid #ccc',
            imageRendering: 'pixelated',
          }}
        />
      </div>
      <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#666' }}>
        {canvasSize.width} × {canvasSize.height} px
      </p>
    </div>
  );
}

export default Preview;