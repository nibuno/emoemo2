interface TextRenderOptions {
  lines: string[];
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  canvasWidth: number;
  canvasHeight: number;
}

/**
 * テキストの実ピクセル境界を検出し、透明部分をトリミングした領域を返す
 */
function findTextBounds(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): { top: number; bottom: number; left: number; right: number } | null {
  const { data } = ctx.getImageData(0, 0, width, height);

  let top = 0;
  let bottom = height - 1;
  let left = 0;
  let right = width - 1;

  // 上端
  topLoop: for (top = 0; top < height; top++) {
    for (let x = 0; x < width; x++) {
      if (data[(top * width + x) * 4 + 3] > 0) break topLoop;
    }
  }
  if (top >= height) return null; // ピクセルが存在しない

  // 下端
  bottomLoop: for (bottom = height - 1; bottom >= top; bottom--) {
    for (let x = 0; x < width; x++) {
      if (data[(bottom * width + x) * 4 + 3] > 0) break bottomLoop;
    }
  }

  // 左端
  leftLoop: for (left = 0; left < width; left++) {
    for (let y = top; y <= bottom; y++) {
      if (data[(y * width + left) * 4 + 3] > 0) break leftLoop;
    }
  }

  // 右端
  rightLoop: for (right = width - 1; right >= left; right--) {
    for (let y = top; y <= bottom; y++) {
      if (data[(y * width + right) * 4 + 3] > 0) break rightLoop;
    }
  }

  return { top, bottom, left, right };
}

/**
 * テキストをできるだけ大きく描画する
 * 大きめに描画 → 実ピクセル範囲をトリミング → キャンバスにフィットさせることで
 * フォントメトリクスの余白を除去し、文字を最大限大きく表示する
 */
export function renderTextToCanvas(
  ctx: CanvasRenderingContext2D,
  options: TextRenderOptions,
): void {
  const { lines, fontFamily, textColor, backgroundColor, canvasWidth, canvasHeight } = options;

  // 背景を描画
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  if (lines.length === 0 || lines.every((l) => l === "")) return;

  // 1. オフスクリーンキャンバスに大きめフォントで描画
  const fontSize = Math.round(canvasWidth * 1.5);
  const lineHeight = fontSize * 1.15;

  const offscreen = document.createElement("canvas");
  const maxLineLen = Math.max(...lines.map((l) => l.length || 1));
  offscreen.width = fontSize * maxLineLen * 2;
  offscreen.height = Math.round(lineHeight * lines.length + fontSize);

  const offCtx = offscreen.getContext("2d");
  if (!offCtx) return;

  offCtx.font = `700 ${fontSize}px ${fontFamily}`;
  offCtx.fillStyle = textColor;
  offCtx.textBaseline = "top";

  lines.forEach((line, index) => {
    offCtx.fillText(line, 0, index * lineHeight);
  });

  // 2. 実ピクセル境界を検出してトリミング
  const bounds = findTextBounds(offCtx, offscreen.width, offscreen.height);
  if (!bounds) return;

  const cropWidth = bounds.right - bounds.left + 1;
  const cropHeight = bounds.bottom - bounds.top + 1;

  // 3. トリミングした領域をキャンバスにフィットさせて描画
  const padding = 0.04;
  const maxWidth = canvasWidth * (1 - padding * 2);
  const maxHeight = canvasHeight * (1 - padding * 2);

  const scale = Math.min(maxWidth / cropWidth, maxHeight / cropHeight);
  const drawWidth = cropWidth * scale;
  const drawHeight = cropHeight * scale;
  const drawX = (canvasWidth - drawWidth) / 2;
  const drawY = (canvasHeight - drawHeight) / 2;

  ctx.drawImage(
    offscreen,
    bounds.left, bounds.top, cropWidth, cropHeight,
    drawX, drawY, drawWidth, drawHeight,
  );
}
