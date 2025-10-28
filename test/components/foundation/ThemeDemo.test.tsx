import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../src/providers/theme/ThemeProvider';
import { ThemeDemo } from '../../../src/components/foundation/ThemeDemo';

// Mock CSS custom properties
const mockSetProperty = jest.fn();
Object.defineProperty(document.documentElement.style, 'setProperty', {
  writable: true,
  value: mockSetProperty,
});

Object.defineProperty(document.documentElement.style, 'getPropertyValue', {
  writable: true,
  value: jest.fn(() => ''),
});

// Mock persistence to avoid localStorage/cookie issues
jest.mock('../../../src/utils/persistence', () => ({
  persistToLocalStorage: jest.fn(),
  restoreFromLocalStorage: jest.fn(() => null),
  setCookie: jest.fn(),
  getCookie: jest.fn(() => null),
}));

const TestWrapper = ({ children, theme = 'light' }: { children: React.ReactNode; theme?: string }) => (
  <ThemeProvider theme={theme} persistence={{ enabled: false }}>
    {children}
  </ThemeProvider>
);

describe('ThemeDemo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetProperty.mockClear();
  });

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Theme Demo')).toBeInTheDocument();
  });

  it('should display current theme mode', () => {
    render(
      <TestWrapper theme="light">
        <ThemeDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Current Theme Mode:')).toBeInTheDocument();
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should display dark theme mode', () => {
    render(
      <TestWrapper theme="dark">
        <ThemeDemo />
      </TestWrapper>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should display theme colors section', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Theme Colors:')).toBeInTheDocument();
    expect(screen.getByText('Accent')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should render color swatches with correct styles', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    const colorSwatches = screen.getAllByRole('generic').filter(el => 
      el.className.includes('w-8 h-8 rounded border')
    );

    expect(colorSwatches).toHaveLength(4); // accent, success, warning, error

    // Check that each swatch has a background color style
    colorSwatches.forEach(swatch => {
      expect(swatch).toHaveStyle({ backgroundColor: expect.any(String) });
    });
  });

  it('should render toggle theme button', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should call toggleTheme when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper theme="light">
        <ThemeDemo />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initially should show light
    expect(screen.getByText('light')).toBeInTheDocument();

    // Click toggle button
    await user.click(toggleButton);

    // Should now show dark
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should toggle from dark to light', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper theme="dark">
        <ThemeDemo />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initially should show dark
    expect(screen.getByText('dark')).toBeInTheDocument();

    // Click toggle button
    await user.click(toggleButton);

    // Should now show light
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <TestWrapper>
        <ThemeDemo className="custom-class" />
      </TestWrapper>
    );

    const demoElement = container.firstChild as HTMLElement;
    expect(demoElement).toHaveClass('custom-class');
  });

  it('should have proper structure and CSS classes', () => {
    const { container } = render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    // Main container should have expected classes
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('p-6', 'rounded-lg', 'border');

    // Should have heading
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Theme Demo');
  });

  it('should display color swatches in a grid layout', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    // Find the grid container
    const gridContainer = screen.getByText('Accent').closest('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-4', 'gap-2');
  });

  it('should handle theme changes via toggle button', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper theme="light">
        <ThemeDemo />
      </TestWrapper>
    );

    // Initially should show light
    expect(screen.getByText('light')).toBeInTheDocument();

    // Click toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    // Should now show dark
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should have accessible color swatch labels', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    expect(screen.getByText('Accent')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should have proper button styling', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass(
      'px-4', 'py-2', 'rounded-md', 'text-sm', 'font-medium', 
      'bg-accent', 'text-button-text', 'hover:bg-accent-hover', 'transition-colors'
    );
  });

  it('should use click handler with fireEvent', () => {
    render(
      <TestWrapper theme="light">
        <ThemeDemo />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    
    expect(screen.getByText('light')).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should work without custom className', () => {
    render(
      <TestWrapper>
        <ThemeDemo />
      </TestWrapper>
    );

    const demoElement = screen.getByText('Theme Demo').closest('div');
    expect(demoElement).toBeInTheDocument();
    expect(demoElement).toHaveClass('p-6', 'rounded-lg', 'border');
  });
});