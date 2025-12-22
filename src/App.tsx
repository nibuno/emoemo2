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
    <div className="flex h-screen bg-white">
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
        <SettingsPanel settings={settings} onSettingsChange={setSettings} />
      </div>
      <div className="flex-1 min-w-0 bg-gray-50 overflow-y-auto">
        <PreviewGrid
          settings={settings}
          canvasSize={{ width: 128, height: 128 }}
        />
      </div>
    </div>
  );
}

export default App;
