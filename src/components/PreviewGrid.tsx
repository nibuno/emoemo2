import { useState, useEffect, useCallback } from "react";
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

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? FONTS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === FONTS.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="p-6">
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          type="button"
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="前のフォント"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <Preview
          settings={settings}
          canvasSize={canvasSize}
          fontFamily={selectedFont.value}
          fontLabel={selectedFont.label}
        />
        <button
          type="button"
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="次のフォント"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
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
