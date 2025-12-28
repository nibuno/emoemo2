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

    // 高解像度ディスプレイ対応
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // テキストが空の場合はプレースホルダーを表示
    const isEmpty = !settings.text.trim();
    const displayText = isEmpty ? "テキストを\n入力してね" : settings.text;

    // 自動フォントサイズ計算（高さ優先：できるだけ大きく表示し、横幅が溢れる場合のみ圧縮）
    const lines = displayText.split("\n");
    const maxWidth = canvasSize.width * 0.95;
    const maxHeight = canvasSize.height * 0.95;
    let fontSize = 200;
    const lineHeightRatio = 1.15;

    // フォントサイズを調整（縦方向のみ考慮）
    while (fontSize > 1) {
      ctx.font = `700 ${fontSize}px ${fontFamily}`;
      const lineHeight = fontSize * lineHeightRatio;
      const totalHeight = lines.length * lineHeight;

      if (totalHeight <= maxHeight) {
        break;
      }
      fontSize -= 1;
    }

    // 横幅をチェックしてscaleXを計算
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
    const maxLineWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width)
    );
    const scaleX = maxLineWidth > maxWidth ? maxWidth / maxLineWidth : 1;

    // プレースホルダーの場合は薄いグレー
    ctx.fillStyle = isEmpty ? "#aaaaaa" : settings.textColor;
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = fontSize * lineHeightRatio;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvasSize.height - totalHeight) / 2 + lineHeight / 2;

    // 横方向圧縮を適用して描画
    ctx.save();
    ctx.translate(canvasSize.width / 2, 0);
    ctx.scale(scaleX, 1);
    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line, 0, y);
    });
    ctx.restore();
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
