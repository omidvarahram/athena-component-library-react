import React from 'react';
import { useTheme } from '../../providers/theme/ThemeProvider';
import { cn } from '../../utils/cn';

export interface ThemeDemoProps {
  className?: string;
}

/**
 * Demo component to showcase theme functionality
 * This component will be removed in production builds
 */
export function ThemeDemo({ className }: ThemeDemoProps) {
  const { currentTheme, colors, toggleTheme } = useTheme();

  return (
    <div className={cn('p-6 rounded-lg border', className)}>
      <h3 className="text-lg font-semibold mb-4">Theme Demo</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary mb-2">Current Theme Mode:</p>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent text-button-text">
            {currentTheme}
          </span>
        </div>
        
        <div>
          <p className="text-sm text-text-secondary mb-2">Theme Colors:</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded border mx-auto mb-1"
                style={{ backgroundColor: colors.accent }}
              />
              <span className="text-xs text-text-secondary">Accent</span>
            </div>
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded border mx-auto mb-1"
                style={{ backgroundColor: colors.success }}
              />
              <span className="text-xs text-text-secondary">Success</span>
            </div>
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded border mx-auto mb-1"
                style={{ backgroundColor: colors.warning }}
              />
              <span className="text-xs text-text-secondary">Warning</span>
            </div>
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded border mx-auto mb-1"
                style={{ backgroundColor: colors.error }}
              />
              <span className="text-xs text-text-secondary">Error</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md text-sm font-medium bg-accent text-button-text hover:bg-accent-hover transition-colors"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
