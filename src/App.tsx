import { useState } from "react";
import "./App.css";
import SettingsPanel from "./components/SettingsPanel";
import PreviewGrid from "./components/PreviewGrid";
import type { EmojiSettings } from "./types";

function App() {
  const [settings, setSettings] = useState<EmojiSettings>({
    text: "",
    fontFamily: "'Noto Sans JP'",
    textColor: "#000000",
    backgroundColor: "#ffffff",
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-900">emoemo</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 flex-shrink-0 bg-white shadow-md overflow-y-auto">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>
        <div className="flex-1 min-w-0 bg-gray-50 overflow-y-auto">
          <PreviewGrid
            settings={settings}
            canvasSize={{ width: 128, height: 128 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
