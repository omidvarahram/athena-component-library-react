import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Screen } from '../../../src/components/containers/Screen';

describe('Screen Component', () => {
  it('should render without crashing', () => {
    render(<Screen />);
    expect(screen.getByText('Screen')).toBeInTheDocument();
  });

  it('should display the correct text content', () => {
    render(<Screen />);
    const screenElement = screen.getByText('Screen');
    expect(screenElement).toBeInTheDocument();
    expect(screenElement).toHaveTextContent('Screen');
  });

  it('should render as a div element', () => {
    render(<Screen />);
    const screenElement = screen.getByText('Screen');
    expect(screenElement.tagName).toBe('DIV');
  });

  it('should have the expected structure', () => {
    const { container } = render(<Screen />);
    const divElement = container.querySelector('div');

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveTextContent('Screen');
  });

  it('should render consistently', () => {
    const { container: container1 } = render(<Screen />);
    const { container: container2 } = render(<Screen />);

    expect(container1.innerHTML).toBe(container2.innerHTML);
  });

  describe('accessibility', () => {
    it('should be accessible', () => {
      render(<Screen />);
      const screenElement = screen.getByText('Screen');

      // Component should be visible and accessible
      expect(screenElement).toBeVisible();
    });

    it('should have proper text content for screen readers', () => {
      render(<Screen />);
      const screenElement = screen.getByText('Screen');

      // Text content should be available for screen readers
      expect(screenElement).toHaveTextContent('Screen');
      expect(screenElement).toBeVisible();
    });
  });

  describe('component behavior', () => {
    it('should maintain consistent rendering across multiple renders', () => {
      const { rerender } = render(<Screen />);

      expect(screen.getByText('Screen')).toBeInTheDocument();

      rerender(<Screen />);
      expect(screen.getByText('Screen')).toBeInTheDocument();
    });

    it('should not have any console errors during render', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<Screen />);

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
