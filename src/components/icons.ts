// Lucide-Icons v0.460.0 (ISC-Lizenz, Copyright Lucide Contributors, https://lucide.dev/license),
// übernommen aus dem Design System „Depotlabor“. Ohne shield-check und badge-check: keine Siegel als Vertrauenszeichen.
export type IconNode = readonly (readonly [string, Readonly<Record<string, string>>])[];

export const ICONS = {
  "menu": [["line", {x1: "4", x2: "20", y1: "12", y2: "12"}], ["line", {x1: "4", x2: "20", y1: "6", y2: "6"}], ["line", {x1: "4", x2: "20", y1: "18", y2: "18"}]],
  "x": [["path", {d: "M18 6 6 18"}], ["path", {d: "m6 6 12 12"}]],
  "chevron-down": [["path", {d: "m6 9 6 6 6-6"}]],
  "chevron-right": [["path", {d: "m9 18 6-6-6-6"}]],
  "chevron-left": [["path", {d: "m15 18-6-6 6-6"}]],
  "external-link": [["path", {d: "M15 3h6v6"}], ["path", {d: "M10 14 21 3"}], ["path", {d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],
  "search": [["circle", {cx: "11", cy: "11", r: "8"}], ["path", {d: "m21 21-4.3-4.3"}]],
  "info": [["circle", {cx: "12", cy: "12", r: "10"}], ["path", {d: "M12 16v-4"}], ["path", {d: "M12 8h.01"}]],
  "triangle-alert": [["path", {d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}], ["path", {d: "M12 9v4"}], ["path", {d: "M12 17h.01"}]],
  "circle-check": [["circle", {cx: "12", cy: "12", r: "10"}], ["path", {d: "m9 12 2 2 4-4"}]],
  "file-check": [["path", {d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}], ["path", {d: "M14 2v4a2 2 0 0 0 2 2h4"}], ["path", {d: "m9 15 2 2 4-4"}]],
  "megaphone": [["path", {d: "m3 11 18-5v12L3 14v-3z"}], ["path", {d: "M11.6 16.8a3 3 0 1 1-5.8-1.6"}]],
  "arrow-up-down": [["path", {d: "m21 16-4 4-4-4"}], ["path", {d: "M17 20V4"}], ["path", {d: "m3 8 4-4 4 4"}], ["path", {d: "M7 4v16"}]],
  "arrow-up": [["path", {d: "m5 12 7-7 7 7"}], ["path", {d: "M12 19V5"}]],
  "arrow-down": [["path", {d: "M12 5v14"}], ["path", {d: "m19 12-7 7-7-7"}]],
  "play": [["polygon", {points: "6 3 20 12 6 21 6 3"}]],
  "mail": [["rect", {width: "20", height: "16", x: "2", y: "4", rx: "2"}], ["path", {d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]],
  "calendar": [["path", {d: "M8 2v4"}], ["path", {d: "M16 2v4"}], ["rect", {width: "18", height: "18", x: "3", y: "4", rx: "2"}], ["path", {d: "M3 10h18"}]],
  "book-open": [["path", {d: "M12 7v14"}], ["path", {d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]],
  "calculator": [["rect", {width: "16", height: "20", x: "4", y: "2", rx: "2"}], ["line", {x1: "8", x2: "16", y1: "6", y2: "6"}], ["line", {x1: "16", x2: "16", y1: "14", y2: "18"}], ["path", {d: "M16 10h.01"}], ["path", {d: "M12 10h.01"}], ["path", {d: "M8 10h.01"}], ["path", {d: "M12 14h.01"}], ["path", {d: "M8 14h.01"}], ["path", {d: "M12 18h.01"}], ["path", {d: "M8 18h.01"}]],
  "plus": [["path", {d: "M5 12h14"}], ["path", {d: "M12 5v14"}]],
  "minus": [["path", {d: "M5 12h14"}]],
  "check": [["path", {d: "M20 6 9 17l-5-5"}]],
  "circle-alert": [["circle", {cx: "12", cy: "12", r: "10"}], ["line", {x1: "12", x2: "12", y1: "8", y2: "12"}], ["line", {x1: "12", x2: "12.01", y1: "16", y2: "16"}]],
  "refresh-cw": [["path", {d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}], ["path", {d: "M21 3v5h-5"}], ["path", {d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}], ["path", {d: "M8 16H3v5"}]],
  "briefcase": [["path", {d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}], ["rect", {width: "20", height: "14", x: "2", y: "6", rx: "2"}]],
  "users": [["path", {d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}], ["circle", {cx: "9", cy: "7", r: "4"}], ["path", {d: "M22 21v-2a4 4 0 0 0-3-3.87"}], ["path", {d: "M16 3.13a4 4 0 0 1 0 7.75"}]],
  "laptop": [["path", {d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"}]],
  "scale": [["path", {d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}], ["path", {d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"}], ["path", {d: "M7 21h10"}], ["path", {d: "M12 3v18"}], ["path", {d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"}]],
} as const satisfies Record<string, IconNode>;

export type IconName = keyof typeof ICONS;
