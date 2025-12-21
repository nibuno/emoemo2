import { useEffect, useRef } from "react";
import type { CanvasSize } from "../types";

interface PreviewSettings {
  text: string;
  textColor: string;
  backgroundColor: string;
}

interface PreviewProps {
  settings: PreviewSettings;
  canvasSize: CanvasSize;
  fontFamily: string;
  fontLabel: string;
}

function Preview({ settings, canvasSize, fontFamily, fontLabel }: PreviewProps) {
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
      ctx.font = `700 ${fontSize}px ${fontFamily}`;

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
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = fontSize * lineHeightRatio;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvasSize.height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line, canvasSize.width / 2, y);
    });
  }, [settings, canvasSize, fontFamily]);

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
    <div className="flex flex-col items-center">
      <div
        className="text-sm font-medium text-gray-700 mb-2"
        style={{ fontFamily, fontWeight: 700 }}
      >
        {fontLabel}
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border-2 border-gray-300 rounded-lg shadow-md"
        style={{ imageRendering: "pixelated" }}
      />
      <button
        onClick={handleDownload}
        disabled={!settings.text.trim()}
        className={`mt-2 p-2 rounded-lg transition-colors duration-200 ${
          settings.text.trim()
            ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        title="ダウンロード"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
    </div>
  );
}

export default Preview;
