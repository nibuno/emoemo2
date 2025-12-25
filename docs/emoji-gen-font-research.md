# emoji-gen フォント生成方式の調査

## 概要

[emoji-gen/web-main](https://github.com/emoji-gen/web-main) および [emoji-gen/libemoji](https://github.com/emoji-gen/libemoji) のフォント生成方式を調査した結果をまとめる。

## 技術スタック

| 項目 | 技術 |
|------|------|
| フロントエンド | Vue.js |
| バックエンド | Python (aiohttp) |
| グラフィックス | **Skia** (C++ライブラリ) |
| 絵文字生成ライブラリ | libemoji (C++) |

## アーキテクチャ

```
Frontend (Vue.js)
    ↓ API リクエスト
Backend (Python/aiohttp)
    ↓ 呼び出し
libemoji (C++/Skia)
    ↓ 画像生成
PNG/WebP 出力
```

emoji-genはサーバーサイドでSkiaを使って画像を生成している。これに対し、emoemo2はクライアントサイドのCanvas APIで完結している。

## libemoji のフォントサイズ計算ロジック

### ソースファイル構成

- `EgGenerator.cpp` - メインジェネレータ
- `EgLine.cpp` - 行ごとのレンダリングロジック（**フォントサイズ計算の核心**）

### フォントサイズ決定アルゴリズム

#### 1. 可変モード（measureAdjusted）

```
最小サイズ = 行高 × 0.9
最大サイズ = 行高 × 10

for size = 最小サイズ to 最大サイズ step 0.5:
    if テキスト高さ <= 行高:
        採用
```

- 行高を基準にフォントサイズを探索
- 0.5px単位で段階的に増加
- 行高を超えない最大サイズを選定

#### 2. 固定モード（measureSizeFixed）

- 指定されたフォントサイズをそのまま使用
- テキスト幅がコンテナ幅を超える場合のみ調整

### 横方向圧縮（scaleX）ロジック

テキスト幅がコンテナ幅を超える場合、**フォントサイズを下げるのではなく横方向に圧縮**する：

```
初期scaleX = コンテナ幅 / テキスト幅

for scaleX = 初期値 downto 0 step 0.0001:
    if 圧縮後の幅 <= コンテナ幅:
        採用
```

この方式により：
- 縦方向のスペースを最大限活用
- 横長のテキストでも縦サイズを維持
- 日本語の絵文字で効果的（文字数が少ないが幅が広くなりがち）

### レンダリング処理

1. 指定寸法でSkSurfaceを作成
2. 背景色でクリア
3. 各行を測定（measure）
4. 固定サイズモードの場合、全行で最小フォントサイズに統一
5. 各行を描画（draw）
6. PNG/WebPにエンコード

## emoemo2 との比較

| 項目 | emoji-gen | emoemo2（現状） |
|------|-----------|-----------------|
| 描画エンジン | Skia (C++) | Canvas API (JavaScript) |
| 実行場所 | サーバーサイド | クライアントサイド |
| フォントサイズ探索 | 行高基準 × 0.5px刻み | 100pxから1px刻みで減少 |
| 横方向圧縮 | あり（scaleX） | なし |
| 使用可能領域 | 不明（設定依存） | 90% |

## emoemo2 への適用案

### 案1: 使用可能領域の拡大（シンプル）

```typescript
// Before
const maxWidth = canvasSize.width * 0.9;
const maxHeight = canvasSize.height * 0.9;

// After
const maxWidth = canvasSize.width * 0.95;
const maxHeight = canvasSize.height * 0.95;
```

メリット：実装が簡単
デメリット：余白が減る

### 案2: 横方向圧縮の導入（emoji-gen方式）

```typescript
// 縦方向に収まるフォントサイズを決定
let fontSize = calculateVerticalFit(lines, maxHeight);

// 横幅が足りない場合はscaleXで圧縮
const maxLineWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
let scaleX = 1;
if (maxLineWidth > maxWidth) {
  scaleX = maxWidth / maxLineWidth;
}

// 描画
ctx.save();
ctx.scale(scaleX, 1);
lines.forEach((line, index) => {
  const y = startY + index * lineHeight;
  ctx.fillText(line, (canvasSize.width / 2) / scaleX, y);
});
ctx.restore();
```

メリット：縦方向を最大活用、emoji-genと同等の品質
デメリット：実装が複雑、横長文字が潰れる

### 案3: 両方の組み合わせ

領域拡大 + 横圧縮の両方を適用することで、最大限のフォントサイズを実現。

## 参考リンク

- [emoji-gen/web-main](https://github.com/emoji-gen/web-main) - Webアプリ本体
- [emoji-gen/libemoji](https://github.com/emoji-gen/libemoji) - 絵文字生成ライブラリ
- [Skia Graphics Library](https://skia.org/) - Google製グラフィックスライブラリ

## 調査日

2025-12-25