# GXQS OMEGA Design System & Component Library

**Version**: 1.0  
**Status**: Production Ready Specifications  
**Target**: Enterprise + Retail UI Excellence

---

## Part 1: Design Tokens

### 1.1 Color Tokens (Complete Palette)

**Quantum Accents** (Primary):

```css
/* Electric blue - primary actions, highlights */
--color-quantum-50: #f0fbff --color-quantum-100: #e0f7ff --color-quantum-200: #bef3ff
  --color-quantum-300: #84eaff --color-quantum-400: #48deff --color-quantum-500: #00d9ff
  /* PRIMARY */ --color-quantum-600: #00b8d4 --color-quantum-700: #0096aa
  --color-quantum-800: #007788 --color-quantum-900: #005566
  /* Electric purple - secondary actions */ --color-electric-50: #faf5ff
  --color-electric-100: #f3e8ff --color-electric-200: #e9d5ff --color-electric-300: #d8b4fe
  --color-electric-400: #b794f6 --color-electric-500: #9f7aea --color-electric-600: #805ad5
  --color-electric-700: #6b21a8 --color-electric-800: #553399 --color-electric-900: #3c0066
  /* Neon green - success states */ --color-neon-50: #f0fff4 --color-neon-100: #e0ffe8
  --color-neon-200: #b3ffd1 --color-neon-300: #80ffb3 --color-neon-400: #4dff99
  --color-neon-500: #00ff88 /* SUCCESS */ --color-neon-600: #00cc6a --color-neon-700: #009944
  --color-neon-800: #006633 --color-neon-900: #003322;
```

**Neutrals - Dark Mode** (Default):

```css
/* Pure dark backgrounds */
--color-neutral-50: #f8fafc --color-neutral-100: #f1f5f9 --color-neutral-200: #e2e8f0
  --color-neutral-300: #cbd5e1 --color-neutral-400: #94a3b8 --color-neutral-500: #64748b
  --color-neutral-600: #475569 --color-neutral-700: #334155 /* --color-text-secondary */
  --color-neutral-800: #1e293b /* --color-bg-tertiary */ --color-neutral-900: #0f172a
  /* --color-bg-secondary */ /* GXQS dark palette */ --color-dark-bg-primary: #0a0e27
  /* Darkest, main bg */ --color-dark-bg-secondary: #1a1f3a /* Card backgrounds */
  --color-dark-bg-tertiary: #2a2f45 /* Hover states */ --color-dark-surface: #323951
  /* Elevated surfaces */ --color-dark-text-primary: #ffffff /* 100% opacity */
  --color-dark-text-secondary: #a0aec0 /* 65% opacity */ --color-dark-text-tertiary: #718096
  /* 45% opacity */ --color-dark-border: #2d3748 /* Subtle borders */
  --color-dark-border-hover: #4a5568 /* Border hover */ --color-dark-divider: #1a202c
  /* Light dividers */ --color-dark-shadow: rgba(0, 0, 0, 0.3);
```

**Neutrals - Light Mode** (Alternative):

```css
--color-light-bg-primary: #ffffff --color-light-bg-secondary: #f8fafc
  --color-light-bg-tertiary: #e2e8f0 --color-light-surface: #f1f5f9
  --color-light-text-primary: #0f172a --color-light-text-secondary: #475569
  --color-light-text-tertiary: #94a3b8 --color-light-border: #cbd5e1
  --color-light-border-hover: #94a3b8 --color-light-divider: #e2e8f0
  --color-light-shadow: rgba(0, 0, 0, 0.05);
```

**Semantic Tokens**:

```css
/* Status colors */
--color-success: var(--color-neon-500);
--color-warning: #ff9d3d;
--color-error: #ff2e63;
--color-info: var(--color-quantum-500);
--color-critical: #ff0000;

/* Functionality */
--color-primary: var(--color-quantum-500);
--color-primary-hover: var(--color-quantum-600);
--color-primary-active: var(--color-quantum-700);
--color-primary-disabled: var(--color-neutral-600);

--color-secondary: var(--color-electric-500);
--color-secondary-hover: var(--color-electric-600);

--color-danger: var(--color-error);
--color-success-bg: rgba(0, 255, 136, 0.1);
--color-error-bg: rgba(255, 46, 99, 0.1);
--color-warning-bg: rgba(255, 157, 61, 0.1);
--color-info-bg: rgba(0, 217, 255, 0.1);
```

### 1.2 Spacing Tokens

```css
/* Base: 4px increment system */
--space-0: 0px --space-1: 4px /* Button padding, tiny gaps */ --space-2: 8px
  /* Icon spacing, small elements */ --space-3: 12px /* Input padding, component gaps */
  --space-4: 16px /* Standard padding, card spacing */ --space-5: 20px /* Section margins */
  --space-6: 24px /* Large component padding */ --space-8: 32px /* Large gaps, section spacing */
  --space-10: 40px /* Extra large gaps */ --space-12: 48px /* Major section gaps */ --space-16: 64px
  /* Page/container padding */ --space-20: 80px /* Largest gaps */ --space-24: 96px
  /* Full page margins */ /* Semantic spacing */ --spacing-xs: var(--space-2);
--spacing-sm: var(--space-3);
--spacing-md: var(--space-4);
--spacing-lg: var(--space-6);
--spacing-xl: var(--space-8);
--spacing-2xl: var(--space-12);
```

### 1.3 Typography Tokens

```css
/* Font families */
--font-family-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-family-mono: "IBM Plex Mono", "Courier New", monospace;
--font-family-display: "Geist", var(--font-family-sans);

/* Font sizes */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;
--font-size-4xl: 36px;
--font-size-5xl: 48px;

/* Line heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;

/* Font weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Text styles (using font-family) */
--text-xs: {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  letter-spacing: 0.5px;
}

--text-sm: {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  letter-spacing: 0px;
}

--text-base: {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  letter-spacing: 0px;
}

--text-lg: {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-normal);
  letter-spacing: -0.3px;
}

--text-mono-sm: {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
  letter-spacing: 0px;
}
```

### 1.4 Elevation & Shadow System

```css
/* Shadows (elevation levels) */
--shadow-none: none;

--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow effects (quantum accent) */
--glow-quantum-sm: 0 0 6px rgba(0, 217, 255, 0.3);

--glow-quantum-md: 0 0 12px rgba(0, 217, 255, 0.4), 0 0 24px rgba(0, 217, 255, 0.2);

--glow-quantum-lg: 0 0 24px rgba(0, 217, 255, 0.5), 0 0 48px rgba(0, 217, 255, 0.3);

--glow-success: 0 0 8px rgba(0, 255, 136, 0.4);

--glow-error: 0 0 8px rgba(255, 46, 99, 0.4);
```

### 1.5 Border Radius System

```css
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;

/* Component-specific */
--radius-button: var(--radius-lg);
--radius-card: var(--radius-xl);
--radius-modal: var(--radius-2xl);
--radius-input: var(--radius-md);
--radius-badge: var(--radius-sm);
--radius-avatar: var(--radius-full);
```

### 1.6 Animation Tokens

```css
/* Durations */
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
--duration-slowest: 800ms;

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Transitions */
--transition-fast: all var(--duration-fast) var(--ease-in-out);
--transition-normal: all var(--duration-normal) var(--ease-in-out);
--transition-slow: all var(--duration-slow) var(--ease-in-out);

/* Animations */
--animation-pulse: {
  keyframes: {
    0%, 100%: { opacity: 1 }
    50%: { opacity: 0.5 }
  }
  duration: var(--duration-slower);
  iteration-count: infinite;
}

--animation-fade-in: {
  keyframes: {
    0%: { opacity: 0 }
    100%: { opacity: 1 }
  }
  duration: var(--duration-normal);
}

--animation-slide-up: {
  keyframes: {
    0%: { transform: translateY(8px); opacity: 0 }
    100%: { transform: translateY(0); opacity: 1 }
  }
  duration: var(--duration-normal);
}

--animation-glow: {
  keyframes: {
    0%, 100%: { box-shadow: 0 0 12px rgba(0, 217, 255, 0.4) }
    50%: { box-shadow: 0 0 24px rgba(0, 217, 255, 0.6) }
  }
  duration: var(--duration-slower);
  iteration-count: infinite;
}
```

---

## Part 2: Component Specifications

### 2.1 Button Component

**Variants**:

```tsx
// Solid (primary action)
<Button variant="solid" color="primary">
  Send Transaction
</Button>

// Outline (secondary action)
<Button variant="outline" color="primary">
  Learn More
</Button>

// Ghost (tertiary, minimal)
<Button variant="ghost" color="primary">
  Cancel
</Button>

// Icon-only
<Button variant="icon" aria-label="Settings">
  <SettingsIcon />
</Button>
```

**Sizes**:

```tsx
<Button size="sm">Small (28px)</Button>           {/* padding: 6px 12px */}
<Button size="md">Medium (36px)</Button>         {/* padding: 8px 16px */}
<Button size="lg">Large (44px)</Button>          {/* padding: 12px 24px */}
```

**States**:

```
default  → normal state
hover    → background brightens
active   → background darker, slight push
disabled → opacity 50%, no interaction
loading  → spinner + no interaction
```

**Accessibility**:

- Keyboard focusable (visible focus ring)
- ARIA labels for icon-only buttons
- Disabled state communicates to screen readers
- Min 44px touch target on mobile
- Sufficient color contrast (4.5:1)

### 2.2 Card Component

```tsx
<Card elevation="sm" variant="outline" interactive={true}>
  <CardHeader>
    <CardTitle>Wallet Balance</CardTitle>
    <CardSubtitle>Total holdings</CardSubtitle>
  </CardHeader>

  <CardContent>
    <div className="text-4xl font-bold">$1,234.56</div>
  </CardContent>

  <CardFooter>
    <Button size="sm">View Details</Button>
  </CardFooter>
</Card>
```

**Variations**:

- `elevation`: none, sm, md, lg (shadow depth)
- `variant`: flat, outline, elevated, interactive
- `interactive`: hover effects, cursor pointer
- `padding`: sm (12px), md (16px), lg (24px)

### 2.3 Input Component

```tsx
<Input
  label="Recipient Address"
  placeholder="0x..."
  value={address}
  onChange={handleChange}
  error={!isValidAddress}
  helperText="Invalid Ethereum address"
  icon={<AddressIcon />}
  suffix={<PasteButton />}
  disabled={false}
  required={true}
  maxLength={42}
  pattern="^0x[a-fA-F0-9]{40}$"
/>
```

**Features**:

- Label, placeholder, helper text
- Validation states (error, success, warning)
- Icons (prefix/suffix)
- Character counter
- Copy/paste support
- Accessibility attributes
- Mobile-optimized keyboard

### 2.4 Modal Component

```tsx
<Modal
  isOpen={true}
  onClose={handleClose}
  title="Confirm Transaction"
  size="md" // sm, md, lg, fullscreen
  hasCloseButton={true}
  backdrop="blur" // blur, dark, light
  onBackdropClick={handleClose}
>
  <ModalHeader>
    <ModalTitle>Confirm Transaction</ModalTitle>
    <ModalCloseButton />
  </ModalHeader>

  <ModalBody>{/* Content */}</ModalBody>

  <ModalFooter>
    <Button variant="outline" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="solid" color="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

### 2.5 Data Table Component

```tsx
<DataTable
  columns={[
    { header: 'Date', key: 'date', sortable: true },
    { header: 'From', key: 'from', truncate: true },
    { header: 'To', key: 'to', truncate: true },
    { header: 'Amount', key: 'amount', align: 'right' },
    { header: 'Status', key: 'status', render: renderStatus },
  ]}
  data={transactions}
  pageSize={20}
  sortBy="date"
  sortOrder="desc"
  striped={true}
  hoverable={true}
  selectable={true}
  onRowClick={handleRowClick}
/>
```

### 2.6 Tabs Component

```tsx
<Tabs defaultValue="transactions" variant="underline">
  <TabList>
    <Tab value="transactions">Transactions</Tab>
    <Tab value="assets">Assets</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>

  <TabPanels>
    <TabPanel value="transactions">
      <TransactionList />
    </TabPanel>
    <TabPanel value="assets">
      <AssetList />
    </TabPanel>
    <TabPanel value="settings">
      <SettingsPanel />
    </TabPanel>
  </TabPanels>
</Tabs>
```

**Variants**: `underline`, `line`, `pills`, `cards`

### 2.7 Badge Component

```tsx
<Badge color="primary" variant="solid" size="md">
  Pending
</Badge>

<Badge color="success" variant="outline" size="sm">
  ✓ Confirmed
</Badge>

<Badge color="warning" variant="soft" size="lg">
  ⚠ Warning
</Badge>
```

### 2.8 Tooltip Component

```tsx
<Tooltip
  label="This is the main wallet address"
  position="top"
  delay={200}
  maxWidth={250}
  background="dark"
>
  <button>Hover me</button>
</Tooltip>
```

### 2.9 Toast Notification

```tsx
toast.success({
  title: 'Transaction Sent',
  description: 'Your transaction has been submitted to the network',
  duration: 5000,
  action: {
    label: 'View',
    onClick: viewTransaction,
  },
});

toast.error({
  title: 'Transaction Failed',
  description: 'Insufficient funds',
  action: {
    label: 'Dismiss',
    onClick: dismiss,
  },
});
```

### 2.10 Progress Component

```tsx
<Progress
  value={65}
  max={100}
  color="primary"
  showLabel={true}
  animated={true}
  label="65%"
/>

/* For multi-stage process */
<ProgressStepper current={2} total={4}>
  <ProgressStep completed={true} label="Create Account" />
  <ProgressStep completed={false} label="Verify Email" />
  <ProgressStep completed={false} label="Setup Security" />
  <ProgressStep completed={false} label="Complete" />
</ProgressStepper>
```

---

## Part 3: Responsive Breakpoints

```css
/* Mobile-first approach */
--breakpoint-xs: 320px /* Phones */ --breakpoint-sm: 640px /* Tablets */ --breakpoint-md: 1024px
  /* Desktops */ --breakpoint-lg: 1280px /* Large screens */ --breakpoint-xl: 1536px
  /* Extra large */ /* Usage in CSS */ @media (min-width: 640px) {.card {padding: var(--space-8) ;}}
  /* Usage in Tailwind */ <div className= 'px-4 sm:px-6 md:px-8 lg:px-12' > Content adapts to screen
  size </div>;
```

---

## Part 4: Accessibility Requirements

### 4.1 Color Contrast

**Minimum ratios**:

- Large text: 3:1
- Normal text: 4.5:1
- UI components: 3:1
- Focus indicators: 3:1 minimum

**Test**:

```javascript
// Use WebAIM contrast checker
contrastRatio(foreground, background) >= 4.5;
```

### 4.2 Keyboard Navigation

**Requirements**:

- Tab order logical and visible
- Focus trap in modals
- Escape key closes overlays
- Enter activates buttons
- Arrow keys for navigation

### 4.3 Screen Reader Support

```tsx
// Always provide semantic HTML
<button aria-label="Send Transaction">
  <SendIcon />
</button>

// Use ARIA for dynamic content
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  Transaction confirmed!
</div>

// Describe form inputs
<label htmlFor="amount">Amount (in GXQS)</label>
<input id="amount" type="number" />
```

### 4.4 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Part 5: Theme Implementation

### 5.1 CSS Variables Approach

```css
/* root.css */
:root {
  /* Light theme (default) */
  --color-bg: var(--color-light-bg-primary);
  --color-text: var(--color-light-text-primary);
  --color-border: var(--color-light-border);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme */
    --color-bg: var(--color-dark-bg-primary);
    --color-text: var(--color-dark-text-primary);
    --color-border: var(--color-dark-border);
  }
}

/* Manual theme toggle */
[data-theme='light'] {
  --color-bg: var(--color-light-bg-primary);
  --color-text: var(--color-light-text-primary);
}

[data-theme='dark'] {
  --color-bg: var(--color-dark-bg-primary);
  --color-text: var(--color-dark-text-primary);
}
```

### 5.2 Using Tokens in Components

```tsx
// Button.tsx
const Button = ({ variant = 'solid', color = 'primary' }) => {
  const baseStyles = `
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-button);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    transition: var(--transition-normal);
    border: none;
    cursor: pointer;
  `;

  const colorStyles = {
    primary: `
      background: var(--color-primary);
      color: white;
      &:hover { background: var(--color-primary-hover); }
      &:active { background: var(--color-primary-active); }
    `,
    secondary: `
      background: var(--color-secondary);
      color: white;
      &:hover { background: var(--color-secondary-hover); }
    `,
  };

  return <button style={baseStyles + colorStyles[color]} />;
};
```

---

## Part 6: Brand Motion

### 6.1 Entrance Animations

```css
@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### 6.2 Interactive Animations

```css
@keyframes hover-lift {
  from {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  to {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
}

@keyframes pulse-quantum {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 217, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 217, 255, 0);
  }
}
```

---

## Part 7: Dark Mode Implementation

### 7.1 Smart Dark Mode

The system should:

1. **Respect system preference** (`prefers-color-scheme`)
2. **Allow manual override** (toggle switch)
3. **Persist user preference** (localStorage)
4. **Adapt in real-time** (no page reload)

```tsx
// ThemeProvider.tsx
export const useTheme = () => {
  const [theme, setTheme] = useState('dark'); // default GXQS theme

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('gxqs-theme');
    if (saved) setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');

    // Apply to DOM
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    localStorage.setItem('gxqs-theme', theme);
  };

  return { theme, toggleTheme };
};
```

---

## Part 8: Internationalization

### 8.1 Text Labels

All UI text must be:

- **Externalized** (no hardcoded strings)
- **Translated** (at least English, Chinese, Spanish, German, French, Japanese)
- **Contextual** (proper pluralization, dates)
- **Inclusive** (gender-neutral, culturally appropriate)

```tsx
// i18n.ts
export const translations = {
  en: {
    wallet: {
      balance: 'Balance',
      send: 'Send',
      receive: 'Receive',
      transactions: 'Transactions',
    },
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
  },
  zh: {
    wallet: {
      balance: '余额',
      send: '发送',
      receive: '接收',
      transactions: '交易',
    },
  },
};

// Usage
const t = useTranslation();
<div>{t('wallet.balance')}</div>;
```

---

## Part 9: Component Export Structure

```typescript
// @gxqs/ui/src/index.ts

export { Button, type ButtonProps } from './components/Button';
export { Card, CardHeader, CardBody, CardFooter } from './components/Card';
export { Input, type InputProps } from './components/Input';
export { Modal } from './components/Modal';
export { Tabs, TabList, Tab, TabPanels, TabPanel } from './components/Tabs';
export { Badge, type BadgeProps } from './components/Badge';
export { Toast, toast } from './components/Toast';
export { Tooltip } from './components/Tooltip';
export { DataTable, type DataTableProps } from './components/DataTable';
export { Progress, ProgressStepper } from './components/Progress';

// Hooks
export { useTheme } from './hooks/useTheme';
export { useMediaQuery } from './hooks/useMediaQuery';
export { useClickOutside } from './hooks/useClickOutside';

// Utilities
export { cn } from './utils/classnames';
export { * as colors } from './tokens/colors';
export { * as spacing } from './tokens/spacing';
```

---

_GXQS OMEGA Design System v1.0_  
_Status: Production Ready_  
_Next: UX specifications for each module_
