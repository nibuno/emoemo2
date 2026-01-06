import { useState } from "react";
import "./App.css";
import Preview from "./components/Preview";
import { downloadEmoji } from "./utils/download";
import ApiKeyDialog from "./components/ApiKeyDialog";
import type { EmojiSettings } from "./types";

const FONTS = [
  { value: "'Noto Sans JP'", label: "ゴシック" },
  { value: "'M PLUS Rounded 1c'", label: "丸ゴシック" },
  { value: "'Noto Serif JP'", label: "明朝体" },
  { value: "'Zen Kaku Gothic New'", label: "モダン" },
  { value: "'Mochiy Pop One'", label: "ポップ" },
  { value: "'Hachi Maru Pop'", label: "手書き" },
];

const COLORS = [
  { value: "#000000", label: "黒" },
  { value: "#FF0000", label: "赤" },
  { value: "#EAB308", label: "黄" },
  { value: "#84CC16", label: "黄緑" },
  { value: "#16A34A", label: "緑" },
  { value: "#06B6D4", label: "水色" },
  { value: "#2563EB", label: "青" },
  { value: "#9333EA", label: "紫" },
  { value: "#EC4899", label: "ピンク" },
  { value: "#EA580C", label: "オレンジ" },
];

const CANVAS_SIZE = { width: 128, height: 128 };

function App() {
  const [settings, setSettings] = useState<EmojiSettings>({
    text: "",
    fontFamily: "'Noto Sans JP'",
    textColor: "#000000",
    backgroundColor: "#ffffff",
  });

  // TODO: おまかせ機能復活時に有効化
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);

  const selectedFont = FONTS.find((f) => f.value === settings.fontFamily) || FONTS[0];

  const handleDownload = () => {
    downloadEmoji(settings, CANVAS_SIZE);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* ヘッダー */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8 cursor-default hover:animate-wiggle inline-block">
          emoemo
        </h1>

        {/* 2カラムレイアウト */}
        <div className="flex gap-8">
          {/* 左側: 設定エリア */}
          <div className="w-80">
            {/* テキスト入力 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                テキスト
              </label>
              <textarea
                value={settings.text}
                onChange={(e) => setSettings((prev) => ({ ...prev, text: e.target.value }))}
                placeholder={"テキストを\n入力してね"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-sm"
                rows={3}
              />
            </div>

            {/* 色選択 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                文字色
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, textColor: color.value }))}
                    title={color.label}
                    className={`w-8 h-8 rounded-full transition-all ${
                      settings.textColor === color.value
                        ? "ring-offset-2"
                        : "hover:scale-110"
                    }`}
                    style={{
                      backgroundColor: color.value,
                      boxShadow:
                        settings.textColor === color.value
                          ? `0 0 0 2px white, 0 0 0 4px ${color.value}`
                          : undefined,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* フォント選択 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                フォント
              </label>
              <div className="flex flex-wrap gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.value}
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, fontFamily: font.value }))}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      settings.fontFamily === font.value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    style={{ fontFamily: font.value, fontWeight: 700 }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ダウンロードボタン */}
            <div>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!settings.text.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  settings.text.trim()
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
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
                <span>ダウンロード</span>
              </button>
            </div>
          </div>

          {/* 右側: プレビュー */}
          <div className="flex-shrink-0 flex items-start">
            <Preview
              settings={settings}
              canvasSize={CANVAS_SIZE}
              fontFamily={selectedFont.value}
            />
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="flex-shrink-0 border-t border-gray-200 bg-white py-3 px-4 text-center text-sm text-gray-500">
        Made with ☕ by{" "}
        <a
          href="https://github.com/nibuno"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          @nibuno
        </a>
        {" | "}
        <a
          href="https://github.com/nibuno/emoemo2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          GitHub
        </a>
      </footer>

      {/* TODO: おまかせ機能復活時に有効化 */}
      <ApiKeyDialog
        isOpen={isApiKeyDialogOpen}
        onClose={() => setIsApiKeyDialogOpen(false)}
        onSave={() => {}}
      />
    </div>
  );
}

export default App;
