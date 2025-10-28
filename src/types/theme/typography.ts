/**
 * Typography configuration interface
 */
export interface TypographyConfig {
  /** Font families for different text types */
  fontFamily: {
    /** Primary font family for body text */
    primary: string;
    /** Secondary font family for headings */
    secondary: string;
    /** Monospace font family for code */
    mono: string;
  };
  
  /** Font sizes with consistent scale */
  fontSize: {
    xs: string;    // 12px
    sm: string;    // 14px
    base: string;  // 16px
    lg: string;    // 18px
    xl: string;    // 20px
    '2xl': string; // 24px
    '3xl': string; // 30px
    '4xl': string; // 36px
    '5xl': string; // 48px
    '6xl': string; // 60px
  };
  
  /** Font weights */
  fontWeight: {
    thin: number;      // 100
    extralight: number; // 200
    light: number;     // 300
    normal: number;    // 400
    medium: number;    // 500
    semibold: number;  // 600
    bold: number;      // 700
    extrabold: number; // 800
    black: number;     // 900
  };
  
  /** Line heights */
  lineHeight: {
    none: number;      // 1
    tight: number;     // 1.25
    snug: number;      // 1.375
    normal: number;    // 1.5
    relaxed: number;   // 1.625
    loose: number;     // 2
  };
  
  /** Letter spacing */
  letterSpacing: {
    tighter: string;   // -0.05em
    tight: string;     // -0.025em
    normal: string;    // 0em
    wide: string;      // 0.025em
    wider: string;     // 0.05em
    widest: string;    // 0.1em
  };
}

/**
 * Typography variant definitions for different text elements
 */
export interface TypographyVariants {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  caption: TypographyVariant;
  overline: TypographyVariant;
  button: TypographyVariant;
  code: TypographyVariant;
}

export interface TypographyVariant {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
}
