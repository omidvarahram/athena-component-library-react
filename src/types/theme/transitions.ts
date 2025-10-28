/**
 * Transition configuration interface
 */
export interface TransitionConfig {
  /** Transition durations */
  duration: {
    fastest: string;  // 75ms
    faster: string;   // 100ms
    fast: string;     // 150ms
    normal: string;   // 200ms
    slow: string;     // 300ms
    slower: string;   // 500ms
    slowest: string;  // 700ms
  };
  
  /** Easing functions */
  easing: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    /** Custom easing for smooth animations */
    smooth: string;
    /** Easing for bouncy animations */
    bounce: string;
  };
  
  /** Component-specific transitions */
  component: {
    /** Button transitions */
    button: {
      default: string;
      hover: string;
      active: string;
    };
    /** Modal transitions */
    modal: {
      backdrop: string;
      content: string;
    };
    /** Tooltip transitions */
    tooltip: string;
    /** Dropdown transitions */
    dropdown: string;
  };
}

/**
 * Animation configuration interface
 */
export interface AnimationConfig {
  /** Keyframe animations */
  keyframes: {
    /** Fade animations */
    fadeIn: string;
    fadeOut: string;
    /** Slide animations */
    slideInUp: string;
    slideInDown: string;
    slideInLeft: string;
    slideInRight: string;
    slideOutUp: string;
    slideOutDown: string;
    slideOutLeft: string;
    slideOutRight: string;
    /** Scale animations */
    scaleIn: string;
    scaleOut: string;
    /** Rotate animations */
    rotateIn: string;
    rotateOut: string;
    /** Bounce animations */
    bounceIn: string;
    bounceOut: string;
  };
  
  /** Animation classes */
  classes: {
    fadeIn: string;
    fadeOut: string;
    slideInUp: string;
    slideInDown: string;
    slideInLeft: string;
    slideInRight: string;
    scaleIn: string;
    scaleOut: string;
    bounceIn: string;
    bounceOut: string;
  };
}
