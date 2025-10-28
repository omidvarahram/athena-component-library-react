# Athena Component Library React

Professional, themeable, accessible React component library with TypeScript and Tailwind CSS support.

## Features

- 🎨 **Themeable**: Light and dark theme support
- ♿ **Accessible**: WCAG 2.1 compliant components
- 🚀 **Performance**: Tree-shakeable and optimized
- 📱 **Responsive**: Mobile-first design with 7 breakpoints
- 🔧 **TypeScript**: Full type safety and IntelliSense
- 🎯 **Tailwind CSS**: Utility-first styling with custom design tokens

## Installation

```bash
npm install athena-component-library-react
# or
yarn add athena-component-library-react
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0 typescript@>=5.0.0 tailwindcss@>=3.0.0
```

## Usage

### Basic Setup

First, wrap your app with the ThemeProvider:

```tsx
import { ThemeProvider } from 'athena-component-library-react';

function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Using Components

```tsx
import { Button, Card, Input, useTheme } from 'athena-component-library-react';

function MyComponent() {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
      <Button onClick={toggleTheme}>
        Current theme: {mode}
      </Button>
    </Card>
  );
}
```

### Custom Theme

```tsx
import { ThemeProvider, ThemeConfig } from 'athena-component-library-react';

const customTheme: ThemeConfig = {
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#DEE2E6',
  text: '#212529',
  textSecondary: '#6C757D',
  accent: '#007BFF',
  accentHover: '#0056B3',
  accentLight: '#E3F2FD',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  hoverBg: '#F8F9FA',
  activeBg: '#E9ECEF',
  inputBg: '#FFFFFF',
  inputBorder: '#CED4DA',
  inputFocus: '#007BFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  codeBg: '#F8F9FA',
  codeText: '#212529',
  buttonBg: '#007BFF',
  buttonBgHover: '#0056B3',
  buttonText: '#FFFFFF',
  linkColor: '#007BFF',
  linkHover: '#0056B3',
};

function App() {
  return (
    <ThemeProvider 
      defaultMode="custom" 
      customTheme={customTheme}
      persistTheme={true}
    >
      <YourAppContent />
    </ThemeProvider>
  );
}
```

## Components

### Foundation
- Typography
- Colors
- Spacing
- Shadows
- Borders

### Layout
- Container
- Grid
- Stack
- Divider
- Spacer

### Interactive
- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Slider

### Navigation
- Header
- Nav
- Breadcrumb
- Pagination
- Tabs

### Feedback
- Alert
- Toast
- Modal
- Tooltip
- Loading

### Data Display
- Card
- Table
- List
- Badge
- Avatar
- Image

### Form
- Form
- Field
- Fieldset
- Search

## License

MIT
