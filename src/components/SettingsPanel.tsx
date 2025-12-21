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
    <div className="px-12 py-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          テキスト
        </label>
        <textarea
          value={settings.text}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="好きなテキストを入力..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-sm"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          文字色
        </label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: '#000000', label: '黒' },
            { value: '#FF0000', label: '赤' },
            { value: '#EAB308', label: '黄' },
            { value: '#84CC16', label: '黄緑' },
            { value: '#16A34A', label: '緑' },
            { value: '#06B6D4', label: '水色' },
            { value: '#2563EB', label: '青' },
            { value: '#9333EA', label: '紫' },
            { value: '#EC4899', label: 'ピンク' },
            { value: '#EA580C', label: 'オレンジ' },
          ].map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleChange('textColor', color.value)}
              title={color.label}
              className={`w-8 h-8 rounded-full transition-all ${
                settings.textColor === color.value
                  ? 'ring-2 ring-offset-2 ring-teal-600'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default SettingsPanel;