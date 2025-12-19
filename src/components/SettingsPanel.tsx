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
          <option value="'Noto Sans JP'">ゴシック</option>
          <option value="'M PLUS Rounded 1c'">丸ゴシック</option>
          <option value="'Noto Serif JP'">明朝体</option>
        </select>
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