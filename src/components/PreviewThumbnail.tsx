import { useEffect, useRef } from "react";
import type { CanvasSize } from "../types";

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

    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    if (!settings.text.trim()) return;

    const lines = settings.text.split("\n");
    const maxWidth = canvasSize.width * 0.9;
    const maxHeight = canvasSize.height * 0.9;
    let fontSize = 100;
    const lineHeightRatio = 1.2;

    while (fontSize > 1) {
      ctx.font = `700 ${fontSize}px ${fontFamily}`;
      const maxLineWidth = Math.max(
        ...lines.map((line) => ctx.measureText(line).width)
      );
      const lineHeight = fontSize * lineHeightRatio;
      const totalHeight = lines.length * lineHeight;

      if (maxLineWidth <= maxWidth && totalHeight <= maxHeight) {
        break;
      }
      fontSize -= 1;
    }

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

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg transition-all ${
        isSelected
          ? "bg-teal-100 ring-2 ring-teal-600"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="rounded border border-gray-200"
        style={{ width: 64, height: 64, imageRendering: "pixelated" }}
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
