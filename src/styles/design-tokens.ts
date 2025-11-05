export const colors = {
  primary: {
    main: '#0F4C81',
    light: '#1976D2',
    dark: '#0A3659',
  },
  secondary: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
  accent: {
    main: '#F57C00',
    light: '#FF9800',
    dark: '#E65100',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  background: {
    primary: '#FAFAFA',
    secondary: '#F5F5F5',
    tertiary: '#EEEEEE',
  },
  surface: {
    main: '#FFFFFF',
    elevated: '#FFFFFF',
  },
  outline: {
    main: '#E0E0E0',
    light: '#EEEEEE',
    dark: '#BDBDBD',
  },
  text: {
    high: '#212121',
    medium: '#616161',
    low: '#9E9E9E',
    inverse: '#FFFFFF',
  },
};

export const animations = {
  button: {
    default: 'transition-all duration-200 ease-out',
    hover: 'transform scale-[1.02] shadow-lg',
    pressed: 'transform scale-[0.98] shadow-md',
  },
  card: {
    default: 'transition-all duration-300 ease-out',
    hover: 'transform translateY(-4px) shadow-xl',
  },
  pageLoad: {
    container: 'animate-fadeSlideUp',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};
