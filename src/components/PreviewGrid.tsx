import { useState } from "react";
import Preview from "./Preview";
import PreviewThumbnail from "./PreviewThumbnail";
import type { CanvasSize } from "../types";

interface PreviewSettings {
  text: string;
  textColor: string;
  backgroundColor: string;
}

interface PreviewGridProps {
  settings: PreviewSettings;
  canvasSize: CanvasSize;
}

const FONTS = [
  { value: "'Noto Sans JP'", label: "ゴシック" },
  { value: "'M PLUS Rounded 1c'", label: "丸ゴシック" },
  { value: "'Noto Serif JP'", label: "明朝体" },
  { value: "'Zen Kaku Gothic New'", label: "モダン" },
  { value: "'Mochiy Pop One'", label: "ポップ" },
  { value: "'Hachi Maru Pop'", label: "手書き" },
];

function PreviewGrid({ settings, canvasSize }: PreviewGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedFont = FONTS[selectedIndex];

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <Preview
          settings={settings}
          canvasSize={canvasSize}
          fontFamily={selectedFont.value}
          fontLabel={selectedFont.label}
        />
      </div>
      <div className="flex justify-center gap-2">
        {FONTS.map((font, index) => (
          <PreviewThumbnail
            key={font.value}
            settings={settings}
            canvasSize={canvasSize}
            fontFamily={font.value}
            fontLabel={font.label}
            isSelected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewGrid;
