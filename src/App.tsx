import { useState } from 'react';
import './App.css';
import SettingsPanel from './components/SettingsPanel';
import TextInput from './components/TextInput';
import Preview from './components/Preview';
import type { EmojiSettings } from './types';

function App() {
  const [settings, setSettings] = useState<EmojiSettings>({
    text: '',
    fontFamily: 'Arial',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-bold">emoemo</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 flex-shrink-0 bg-white shadow-md overflow-y-auto">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>
        <div className="flex-1 min-w-0 bg-gray-50 overflow-y-auto flex items-start justify-center">
          <div className="w-full max-w-2xl">
            <TextInput
              text={settings.text}
              onTextChange={(text) => setSettings({ ...settings, text })}
            />
          </div>
        </div>
        <div className="w-96 flex-shrink-0 bg-white shadow-md overflow-y-auto">
          <Preview settings={settings} canvasSize={{ width: 128, height: 128 }} />
        </div>
      </div>
    </div>
  );
}

export default App;
