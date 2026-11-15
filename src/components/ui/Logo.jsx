/*
 * Field13 marks. Drawn as paths and rects only, so they never depend on a font
 * loading and render the same in the nav, the favicon and exported files.
 *
 *   grid  : F13 built from cells on a 10 x 5 field (concept A)
 *   serif : a serif F with a mono 13 set like a footnote (concept B)
 */

export const LOGO_VARIANT = 'grid'; // 'serif' | 'grid'

const COBALT = '#0E2A8F';

/* ---------- A: field grid ---------- */
const GLYPHS = [
  { x: 0, rows: ['###', '#..', '##.', '#..', '#..'] }, // F
  { x: 4, rows: ['##', '.#', '.#', '.#', '.#'] },       // 1
  { x: 7, rows: ['###', '..#', '.##', '..#', '###'] }   // 3
];
const ON = new Set(GLYPHS.flatMap((g) => g.rows.flatMap((r, y) => [...r].map((c, i) => (c === '#' ? `${g.x + i},${y}` : null)).filter(Boolean))));

const GridCells = ({ fill, dots }) => {
  const out = [];
  for (let y = 0; y < 5; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      if (ON.has(`${x},${y}`)) out.push(<rect key={`${x}-${y}`} x={x + 0.07} y={y + 0.07} width="0.86" height="0.86" rx="0.12" fill={fill} />);
      else if (dots) out.push(<circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r="0.09" fill={dots} />);
    }
  }
  return out;
};

/* ---------- B: serif F + footnote 13 (32-unit box) ---------- */
const SerifF = ({ fill }) => (
  <g fill={fill}>
    <rect x="9" y="7" width="2.4" height="18" />
    <rect x="6.8" y="7" width="14.7" height="1.5" />
    <rect x="20.3" y="7" width="1.2" height="3.6" />
    <rect x="11.4" y="15.3" width="6.3" height="1.35" />
    <rect x="17.2" y="13.9" width="0.95" height="4.1" />
    <rect x="6.8" y="23.6" width="7" height="1.4" />
  </g>
);
const Footnote13 = ({ stroke }) => (
  <g fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M23.3 7.9 L24.5 7 V12.6 M23.2 12.6 H25.8" />
    <path d="M26.6 7.2 H28.9 L27.4 9.3 C29.4 9.2 29.5 12.7 27.5 12.7 C27 12.7 26.6 12.5 26.3 12.2" />
  </g>
);

/**
 * The mark on its own.
 * tile: draws it on a cobalt rounded square (favicon / app icon).
 */
export const Mark = ({ variant = LOGO_VARIANT, tile = false, size = 22, title }) => {
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  if (variant === 'grid') {
    return tile ? (
      <svg width={size} height={size} viewBox="-1 -3.5 12 12" {...label}>
        <rect x="-1" y="-3.5" width="12" height="12" rx="2.7" fill={COBALT} />
        <GridCells fill="#FFFFFF" />
      </svg>
    ) : (
      <svg width={size * 2} height={size} viewBox="0 0 10 5" {...label}>
        <GridCells fill="#C9D5FF" dots="rgba(255,255,255,0.22)" />
      </svg>
    );
  }
  return tile ? (
    <svg width={size} height={size} viewBox="0 0 32 32" {...label}>
      <rect width="32" height="32" rx="8" fill={COBALT} />
      <SerifF fill="#FFFFFF" />
      <Footnote13 stroke="#C9D5FF" />
    </svg>
  ) : (
    <svg width={size * (25 / 20)} height={size} viewBox="5.5 6 25 20" {...label}>
      <SerifF fill="currentColor" />
      <Footnote13 stroke="#9DB3FF" />
    </svg>
  );
};

/** Mark + FIELD13 wordmark, as used in the nav and footer. */
const Logo = ({ variant = LOGO_VARIANT, size = 22 }) => (
  <span className={`f13-logo-lockup is-${variant}`}>
    <Mark variant={variant} tile={variant === 'serif'} size={size} />
    <span className="f13-logo-word">FIELD13</span>
  </span>
);

export default Logo;
