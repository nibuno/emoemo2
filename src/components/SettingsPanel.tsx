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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          フォント
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "'Noto Sans JP'", label: 'ゴシック' },
            { value: "'M PLUS Rounded 1c'", label: '丸ゴシック' },
            { value: "'Noto Serif JP'", label: '明朝体' },
            { value: "'Zen Kaku Gothic New'", label: 'モダン' },
            { value: "'Mochiy Pop One'", label: 'ポップ' },
            { value: "'Hachi Maru Pop'", label: '手書き' },
          ].map((font) => (
            <button
              key={font.value}
              type="button"
              onClick={() => handleChange('fontFamily', font.value)}
              style={{ fontFamily: font.value, fontWeight: 700 }}
              className={`px-3 py-2 text-sm whitespace-nowrap rounded-lg border transition-colors ${
                settings.fontFamily === font.value
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          文字色
        </label>
        <div className="flex gap-2">
          {[
            { value: '#000000', label: '黒' },
            { value: '#DC2626', label: '赤' },
            { value: '#2563EB', label: '青' },
            { value: '#16A34A', label: '緑' },
            { value: '#EA580C', label: 'オレンジ' },
            { value: '#9333EA', label: '紫' },
            { value: '#EC4899', label: 'ピンク' },
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