interface DownloadSettings {
  text: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

interface CanvasSize {
  width: number;
  height: number;
}

export function downloadEmoji(
  settings: DownloadSettings,
  canvasSize: CanvasSize
): void {
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 背景を描画
  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

  // テキスト描画
  const lines = settings.text.split("\n");
  const maxWidth = canvasSize.width * 0.95;
  const maxHeight = canvasSize.height * 0.95;
  let fontSize = 200;
  const lineHeightRatio = 1.15;

  while (fontSize > 1) {
    ctx.font = `700 ${fontSize}px ${settings.fontFamily}`;
    const lineHeight = fontSize * lineHeightRatio;
    const totalHeight = lines.length * lineHeight;
    if (totalHeight <= maxHeight) break;
    fontSize -= 1;
  }

  ctx.font = `700 ${fontSize}px ${settings.fontFamily}`;
  const maxLineWidth = Math.max(
    ...lines.map((line) => ctx.measureText(line).width)
  );
  const scaleX = maxLineWidth > maxWidth ? maxWidth / maxLineWidth : 1;

  ctx.fillStyle = settings.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * lineHeightRatio;
  const totalHeight = lines.length * lineHeight;
  const startY = (canvasSize.height - totalHeight) / 2 + lineHeight / 2;

  ctx.save();
  ctx.translate(canvasSize.width / 2, 0);
  ctx.scale(scaleX, 1);
  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.fillText(line, 0, y);
  });
  ctx.restore();

  // ダウンロード実行
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
}
