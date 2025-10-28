export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export type Theme = 'light' | 'dark';

// Theme types (all theme-related types are now in theme folder)
export * from './theme';
