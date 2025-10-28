/**
 * Shadow configuration interface
 */
export interface ShadowConfig {
  /** Shadow levels for elevation system */
  elevation: {
    0: string;   // No shadow
    1: string;   // Subtle shadow
    2: string;   // Light shadow
    3: string;   // Medium shadow
    4: string;   // Strong shadow
    5: string;   // Very strong shadow
    6: string;   // Maximum shadow
  };
  
  /** Component-specific shadows */
  component: {
    /** Button shadows */
    button: {
      default: string;
      hover: string;
      active: string;
      disabled: string;
    };
    /** Card shadows */
    card: {
      default: string;
      hover: string;
      selected: string;
    };
    /** Modal shadows */
    modal: {
      backdrop: string;
      content: string;
    };
    /** Tooltip shadows */
    tooltip: string;
    /** Dropdown shadows */
    dropdown: string;
  };
}

/**
 * Z-index configuration for layering
 */
export interface ZIndexConfig {
  /** Z-index values for different component layers */
  values: {
    /** Base layer */
    base: number;           // 0
    /** Dropdown menus */
    dropdown: number;       // 1000
    /** Sticky elements */
    sticky: number;         // 1100
    /** Fixed elements */
    fixed: number;          // 1200
    /** Modal backdrop */
    modalBackdrop: number;  // 1300
    /** Modal content */
    modal: number;          // 1400
    /** Popover */
    popover: number;        // 1500
    /** Snackbar */
    snackbar: number;       // 1600
    /** Tooltip */
    tooltip: number;        // 1700
  };
}
