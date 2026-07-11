import { describe, expect, it } from 'vitest';
import indexCss from '../index.css?raw';

function getHslVariable(css: string, name: string) {
  const match = css.match(new RegExp(`--${name}:\\s*([0-9.]+)\\s+([0-9.]+)%\\s+([0-9.]+)%`));
  if (!match) throw new Error(`Missing CSS variable: --${name}`);
  return match.slice(1).map(Number) as [number, number, number];
}

function hslToRgb([hue, saturation, lightness]: [number, number, number]) {
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const component = (1 - Math.abs((hue / 60) % 2 - 1)) * chroma;
  const match = hue < 60 ? [chroma, component, 0]
    : hue < 120 ? [component, chroma, 0]
      : hue < 180 ? [0, chroma, component]
        : hue < 240 ? [0, component, chroma]
          : hue < 300 ? [component, 0, chroma]
            : [chroma, 0, component];
  const offset = l - chroma / 2;
  return match.map((value) => value + offset);
}

function relativeLuminance(rgb: number[]) {
  const linear = rgb.map((value) => (
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first: number[], second: number[]) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('forge color contrast', () => {
  it('keeps warm paper readable on forge orange', () => {
    const warmPaper = hslToRgb(getHslVariable(indexCss, 'warm-paper'));
    const forgeOrange = hslToRgb(getHslVariable(indexCss, 'forge-orange'));

    expect(contrastRatio(warmPaper, forgeOrange)).toBeGreaterThanOrEqual(4.5);
  });
});
