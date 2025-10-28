/**
 * Color configuration interface (theme-specific)
 */
export interface ColorConfig {
  /** Primary background color */
  bg: string;
  /** Alternative background color for cards/surfaces */
  bgAlt: string;
  /** Surface color for elevated elements */
  surface: string;
  /** Border color for dividers and outlines */
  border: string;
  /** Primary text color */
  text: string;
  /** Secondary text color for muted content */
  textSecondary: string;
  /** Primary accent color for buttons and links */
  accent: string;
  /** Accent color for hover states */
  accentHover: string;
  /** Light accent color for backgrounds and highlights */
  accentLight: string;
  /** Success state color */
  success: string;
  /** Warning state color */
  warning: string;
  /** Error state color */
  error: string;
  /** Background color for hover states */
  hoverBg: string;
  /** Background color for active states */
  activeBg: string;
  /** Background color for input fields */
  inputBg: string;
  /** Border color for input fields */
  inputBorder: string;
  /** Focus color for input fields */
  inputFocus: string;
  /** Shadow color for drop shadows */
  shadow: string;
  /** Overlay color for modals and backdrops */
  overlay: string;
  /** Background color for code blocks */
  codeBg: string;
  /** Text color for code blocks */
  codeText: string;
  /** Button background color */
  buttonBg: string;
  /** Button background color for hover states */
  buttonBgHover: string;
  /** Button text color */
  buttonText: string;
  /** Link color */
  linkColor: string;
  /** Link color for hover states */
  linkHover: string;
}
