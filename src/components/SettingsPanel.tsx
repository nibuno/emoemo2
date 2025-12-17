import type { EmojiSettings } from '../types';

interface SettingsPanelProps {
  settings: EmojiSettings;
  onSettingsChange: (settings: EmojiSettings) => void;
}

function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const handleChange = (key: keyof EmojiSettings, value: string | number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h2>設定</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="fontFamily" style={{ display: 'block', marginBottom: '0.5rem' }}>
          フォント
        </label>
        <select
          id="fontFamily"
          value={settings.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Times New Roman'">Times New Roman</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="fontSize" style={{ display: 'block', marginBottom: '0.5rem' }}>
          フォントサイズ: {settings.fontSize}px
        </label>
        <input
          id="fontSize"
          type="range"
          min="20"
          max="100"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="textColor" style={{ display: 'block', marginBottom: '0.5rem' }}>
          文字色
        </label>
        <input
          id="textColor"
          type="color"
          value={settings.textColor}
          onChange={(e) => handleChange('textColor', e.target.value)}
          style={{ width: '100%', height: '2rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="backgroundColor" style={{ display: 'block', marginBottom: '0.5rem' }}>
          背景色
        </label>
        <input
          id="backgroundColor"
          type="color"
          value={settings.backgroundColor}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          style={{ width: '100%', height: '2rem' }}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;