# FASTag Recharge - Design System Guide

## "Serene Confidence" Color System

### Primary Colors
- **Primary Main**: `#0F4C81` - Deep, professional blue conveying trust and reliability
- **Primary Light**: `#1976D2` - Brighter blue for interactive states
- **Primary Dark**: `#0A3659` - Darker shade for emphasis

### Secondary Colors
- **Secondary Main**: `#2E7D32` - Natural green indicating success and growth
- **Secondary Light**: `#4CAF50` - Lighter green for positive feedback
- **Secondary Dark**: `#1B5E20` - Deep green for emphasis

### Accent Colors
- **Accent Main**: `#F57C00` - Vibrant orange for calls-to-action
- **Accent Light**: `#FF9800` - Lighter orange for hover states
- **Accent Dark**: `#E65100` - Deep orange for pressed states

### System Colors
**Success:**
- Main: `#2E7D32`
- Light: `#4CAF50`
- Dark: `#1B5E20`

**Error:**
- Main: `#D32F2F`
- Light: `#EF5350`
- Dark: `#C62828`

### Neutral Colors
**Background:**
- Primary: `#FAFAFA` - Main application background
- Secondary: `#F5F5F5` - Secondary surfaces
- Tertiary: `#EEEEEE` - Subtle backgrounds

**Surface:**
- Main: `#FFFFFF` - Card and component backgrounds
- Elevated: `#FFFFFF` - Elevated components

**Outline:**
- Main: `#E0E0E0` - Standard borders
- Light: `#EEEEEE` - Subtle dividers
- Dark: `#BDBDBD` - Emphasis borders

**Text:**
- High Emphasis: `#212121` - Primary text
- Medium Emphasis: `#616161` - Secondary text
- Low Emphasis: `#9E9E9E` - Disabled/helper text
- Inverse: `#FFFFFF` - Text on dark backgrounds

## Interaction Design

### Button Component States

#### Default State
- **Background**: Solid color based on variant
- **Text**: White (or primary for outline)
- **Border**: 2px for outline variant
- **Border Radius**: 8px (rounded-lg)
- **Padding**:
  - Small: 16px horizontal, 8px vertical
  - Medium: 24px horizontal, 12px vertical
  - Large: 32px horizontal, 16px vertical
- **Font**: Semi-bold, size based on button size
- **Transition**: All properties, 200ms, ease-out

#### Hover State
- **Transform**: `scale(1.02)` - Subtle growth
- **Shadow**: Large elevation shadow
- **Background**: Shifts to lighter variant color
- **Duration**: 200ms
- **Easing**: ease-out

#### Pressed/Active State
- **Transform**: `scale(0.98)` - Slight compression
- **Shadow**: Medium elevation shadow
- **Background**: Shifts to darker variant color
- **Duration**: 200ms
- **Easing**: ease-out

#### Disabled State
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Transform**: None (no hover effects)

### Card Component States

#### Resting State
- **Background**: White (`#FFFFFF`)
- **Border Radius**: 12px (rounded-xl)
- **Padding**: 24px
- **Shadow**: Medium (`0 4px 6px -1px rgba(0, 0, 0, 0.1)`)
- **Transition**: All properties, 300ms, ease-out

#### Hover State (when hoverable)
- **Transform**: `translateY(-4px)` - Lifts upward
- **Shadow**: Extra large (`0 20px 25px -5px rgba(0, 0, 0, 0.1)`)
- **Duration**: 300ms
- **Easing**: ease-out
- **Cursor**: pointer

### Page Load Animation

#### Main Content Container
- **Animation Name**: fadeSlideUp
- **Duration**: 600ms
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ease Out Expo)

**Keyframes:**
- **From**:
  - Opacity: 0
  - Transform: `translateY(20px)`
- **To**:
  - Opacity: 1
  - Transform: `translateY(0)`

### Input Fields

#### Default State
- **Border**: 2px solid `#E0E0E0`
- **Border Radius**: 8px
- **Padding**: 16px horizontal, 12px vertical
- **Transition**: All, 200ms

#### Focus State
- **Border Color**: `#0F4C81` (Primary Main)
- **Ring**: 2px offset-2 in primary color
- **Outline**: None

#### Error State
- **Border Color**: `#D32F2F` (Error Main)
- **Ring Color**: Error Main

## Typography

- **Body Line Height**: 150%
- **Heading Line Height**: 120%
- **Font Weights**: Regular (400), Medium (500), Semi-bold (600), Bold (700)

## Spacing System

Based on 8px grid:
- 2px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

## Shadows

- **Small**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Medium**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Extra Large**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Container Margins

All pages use a responsive container with side margins:
- **Mobile**: 16px (px-4)
- **Tablet**: 24px (sm:px-6)
- **Desktop**: 32px (lg:px-8)
- **Max Width**: 1280px (max-w-7xl)
