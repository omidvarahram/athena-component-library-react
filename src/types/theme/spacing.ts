/**
 * Spacing configuration interface
 * Based on 4px base unit for consistent spacing
 */
export interface SpacingConfig {
  /** Spacing scale (multiples of 4px) */
  space: {
    0: string;   // 0px
    1: string;   // 4px
    2: string;   // 8px
    3: string;   // 12px
    4: string;   // 16px
    5: string;   // 20px
    6: string;   // 24px
    7: string;   // 28px
    8: string;   // 32px
    9: string;   // 36px
    10: string;  // 40px
    11: string;  // 44px
    12: string;  // 48px
    14: string;  // 56px
    16: string;  // 64px
    20: string;  // 80px
    24: string;  // 96px
    28: string;  // 112px
    32: string;  // 128px
    36: string;  // 144px
    40: string;  // 160px
    44: string;  // 176px
    48: string;  // 192px
    52: string;  // 208px
    56: string;  // 224px
    60: string;  // 240px
    64: string;  // 256px
    72: string;  // 288px
    80: string;  // 320px
    96: string;  // 384px
  };
  
  /** Component-specific spacing */
  component: {
    /** Button padding */
    button: {
      sm: { x: string; y: string };
      md: { x: string; y: string };
      lg: { x: string; y: string };
    };
    /** Input padding */
    input: {
      sm: { x: string; y: string };
      md: { x: string; y: string };
      lg: { x: string; y: string };
    };
    /** Card padding */
    card: {
      sm: string;
      md: string;
      lg: string;
    };
  };
}
