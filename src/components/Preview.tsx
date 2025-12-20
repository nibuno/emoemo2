import { useEffect, useRef } from "react";
import type { EmojiSettings, CanvasSize } from "../types";

interface PreviewProps {
  settings: EmojiSettings;
  canvasSize: CanvasSize;
}

function Preview({ settings, canvasSize }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvasをクリア
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // テキストが空の場合は描画しない
    if (!settings.text.trim()) return;

    // 複数行対応
    const lines = settings.text.split("\n");

    // 自動フォントサイズ計算
    const maxWidth = canvasSize.width * 0.9; // 余白を考慮して90%
    const maxHeight = canvasSize.height * 0.9;
    let fontSize = 100; // 初期値は大きめに設定
    const lineHeightRatio = 1.2;

    // フォントサイズを調整
    while (fontSize > 1) {
      ctx.font = `700 ${fontSize}px ${settings.fontFamily}`;

      // 最も長い行の幅を測定
      const maxLineWidth = Math.max(
        ...lines.map((line) => ctx.measureText(line).width),
      );

      // 総高さを計算
      const lineHeight = fontSize * lineHeightRatio;
      const totalHeight = lines.length * lineHeight;

      // 幅と高さの両方が収まるかチェック
      if (maxLineWidth <= maxWidth && totalHeight <= maxHeight) {
        break;
      }

      fontSize -= 1;
    }

    // テキストを描画
    ctx.fillStyle = settings.textColor;
    ctx.font = `700 ${fontSize}px ${settings.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = fontSize * lineHeightRatio;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvasSize.height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line, canvasSize.width / 2, y);
    });
  }, [settings, canvasSize]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = settings.text ? `${settings.text}.png` : "emoji.png";

      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="p-6">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="border-2 border-gray-300 rounded-lg shadow-lg"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <p className="text-center mt-3 text-sm text-gray-500 font-medium">
        {canvasSize.width} × {canvasSize.height} px
      </p>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-200"
        >
          ダウンロード
        </button>
      </div>
    </div>
  );
}

export default Preview;
