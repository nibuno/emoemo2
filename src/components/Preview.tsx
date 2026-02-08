import { useEffect, useRef } from "react";
import type { CanvasSize } from "../types";
import { renderTextToCanvas } from "../utils/textRenderer";

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

    // 高解像度ディスプレイ対応
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    // テキストが空の場合はプレースホルダーを表示
    const isEmpty = !settings.text.trim();
    const displayText = isEmpty ? "テキストを\n入力してね" : settings.text;
    const lines = displayText.split("\n");

    renderTextToCanvas(ctx, {
      lines,
      fontFamily,
      textColor: isEmpty ? "#aaaaaa" : settings.textColor,
      backgroundColor: settings.backgroundColor,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
    });
  }, [settings, canvasSize, fontFamily]);

  const handleDownload = () => {
    // ダウンロード用に128x128固定のCanvasを作成
    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = canvasSize.width;
    downloadCanvas.height = canvasSize.height;
    const ctx = downloadCanvas.getContext("2d");
    if (!ctx) return;

    renderTextToCanvas(ctx, {
      lines: settings.text.split("\n"),
      fontFamily,
      textColor: settings.textColor,
      backgroundColor: settings.backgroundColor,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
    });

    // ダウンロード実行
    downloadCanvas.toBlob((blob) => {
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
        className="border-2 border-gray-300 rounded-lg shadow-md"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
      <button
        onClick={handleDownload}
        disabled={!settings.text.trim()}
        className={`mt-2 p-2 rounded-lg transition-colors duration-200 ${
          settings.text.trim()
            ? 'text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        style={settings.text.trim() ? { backgroundColor: settings.textColor } : undefined}
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
