/**
 * Shape configuration interface
 */
export interface ShapeConfig {
  /** Border radius values */
  borderRadius: {
    none: string;    // 0px
    sm: string;      // 2px
    base: string;    // 4px
    md: string;      // 6px
    lg: string;      // 8px
    xl: string;      // 12px
    '2xl': string;   // 16px
    '3xl': string;   // 24px
    full: string;    // 9999px
  };
  
  /** Component-specific border radius */
  component: {
    /** Button border radius */
    button: {
      sm: string;
      md: string;
      lg: string;
      pill: string;  // Fully rounded
    };
    /** Input border radius */
    input: {
      sm: string;
      md: string;
      lg: string;
    };
    /** Card border radius */
    card: {
      sm: string;
      md: string;
      lg: string;
    };
    /** Modal border radius */
    modal: {
      sm: string;
      md: string;
      lg: string;
    };
  };
}
