import { useEffect, useRef } from "react";
import type { CanvasSize } from "../types";
import { renderTextToCanvas } from "../utils/textRenderer";

interface PreviewSettings {
  text: string;
  textColor: string;
  backgroundColor: string;
}

interface PreviewThumbnailProps {
  settings: PreviewSettings;
  canvasSize: CanvasSize;
  fontFamily: string;
  fontLabel: string;
  isSelected: boolean;
  onClick: () => void;
}

function PreviewThumbnail({
  settings,
  canvasSize,
  fontFamily,
  fontLabel,
  isSelected,
  onClick,
}: PreviewThumbnailProps) {
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

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        isSelected ? "" : "bg-gray-50 hover:bg-gray-100"
      }`}
      style={isSelected ? {
        boxShadow: `0 0 0 2px ${settings.textColor}`,
        backgroundColor: `${settings.textColor}15`
      } : undefined}
    >
      <canvas
        ref={canvasRef}
        className="rounded border border-gray-200"
        style={{ width: 64, height: 64 }}
      />
      <span
        className="mt-1 text-xs text-gray-600"
        style={{ fontFamily, fontWeight: 700 }}
      >
        {fontLabel}
      </span>
    </button>
  );
}

export default PreviewThumbnail;
