import { useState } from 'react';
import './App.css';
import SettingsPanel from './components/SettingsPanel';
import TextInput from './components/TextInput';
import Preview from './components/Preview';
import type { EmojiSettings } from './types';

function App() {
  const [settings, setSettings] = useState<EmojiSettings>({
    text: '',
    fontSize: 48,
    fontFamily: 'Arial',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>emoemo</h1>
      </header>
      <div className="app-content">
        <div className="column">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>
        <div className="column">
          <TextInput
            text={settings.text}
            onTextChange={(text) => setSettings({ ...settings, text })}
          />
        </div>
        <div className="column">
          <Preview settings={settings} canvasSize={{ width: 128, height: 128 }} />
        </div>
      </div>
    </div>
  );
}

export default App;
