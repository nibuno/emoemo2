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
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">設定</h2>

      <div className="mb-6">
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
          フォント
        </label>
        <select
          id="fontFamily"
          value={settings.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Times New Roman'">Times New Roman</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-2">
          フォントサイズ: <span className="text-blue-600 font-semibold">{settings.fontSize}px</span>
        </label>
        <input
          id="fontSize"
          type="range"
          min="20"
          max="100"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-2">
          文字色
        </label>
        <input
          id="textColor"
          type="color"
          value={settings.textColor}
          onChange={(e) => handleChange('textColor', e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-2">
          背景色
        </label>
        <input
          id="backgroundColor"
          type="color"
          value={settings.backgroundColor}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SettingsPanel;