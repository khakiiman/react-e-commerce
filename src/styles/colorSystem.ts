/**
 * Application Color System
 * 
 * This file defines a grayscale-based color system for the entire application.
 * We use a consistent set of gray shades for various UI elements to ensure
 * harmony between light and dark themes.
 */

export const colorSystem = {
  light: {
    // Background colors
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      tertiary: 'bg-gray-100',
      elevated: 'bg-white shadow-sm',
      card: 'bg-white border border-gray-200 shadow-sm',
      input: 'bg-white border border-gray-300',
      badge: 'bg-gray-100',
      highlight: 'bg-gray-50',
      skeleton: 'bg-gray-200',
      hover: 'hover:bg-gray-100',
      activeHover: 'hover:bg-gray-200',
    },

    // Text colors
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      tertiary: 'text-gray-500',
      disabled: 'text-gray-400',
      inverse: 'text-white',
      link: 'text-gray-800 hover:text-black',
      heading: 'text-gray-900',
    },

    // Border colors
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-300',
      focus: 'focus:border-gray-500',
      input: 'border-gray-300',
    },

    // Interactive element states
    interactive: {
      default: 'bg-gray-100 text-gray-900',
      hover: 'hover:bg-gray-200',
      active: 'active:bg-gray-300',
      selected: 'bg-gray-800 text-white',
      disabled: 'bg-gray-100 text-gray-400',
      focus: 'focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
    },

    // Button variants
    button: {
      primary: 'bg-gray-900 hover:bg-black text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
      outline: 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100',
      danger: 'bg-gray-900 hover:bg-black text-white',
    },

    // Icons
    icon: {
      primary: 'text-gray-700',
      secondary: 'text-gray-500',
      tertiary: 'text-gray-400',
      interactive: 'text-gray-500 hover:text-gray-900',
    },

    // Statuses
    status: {
      error: 'bg-gray-800 text-white',
      success: 'bg-gray-700 text-white',
      warning: 'bg-gray-600 text-white',
      info: 'bg-gray-500 text-white',
    },
  },

  dark: {
    // Background colors
    background: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      tertiary: 'bg-gray-700',
      elevated: 'bg-gray-800 shadow-md',
      card: 'bg-gray-800 border border-gray-700 shadow-md',
      input: 'bg-gray-800 border border-gray-700',
      badge: 'bg-gray-700',
      highlight: 'bg-gray-800',
      skeleton: 'bg-gray-700',
      hover: 'hover:bg-gray-700',
      activeHover: 'hover:bg-gray-600',
    },

    // Text colors
    text: {
      primary: 'text-gray-100',
      secondary: 'text-gray-300',
      tertiary: 'text-gray-400',
      disabled: 'text-gray-500',
      inverse: 'text-gray-900',
      link: 'text-gray-300 hover:text-white',
      heading: 'text-gray-100',
    },

    // Border colors
    border: {
      primary: 'border-gray-700',
      secondary: 'border-gray-600',
      focus: 'focus:border-gray-500',
      input: 'border-gray-700',
    },

    // Interactive element states
    interactive: {
      default: 'bg-gray-700 text-gray-100',
      hover: 'hover:bg-gray-600',
      active: 'active:bg-gray-500',
      selected: 'bg-gray-100 text-gray-900',
      disabled: 'bg-gray-700 text-gray-500',
      focus: 'focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
    },

    // Button variants
    button: {
      primary: 'bg-gray-200 hover:bg-white text-gray-900',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
      outline: 'bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700',
      ghost: 'text-gray-300 hover:bg-gray-700',
      danger: 'bg-gray-200 hover:bg-white text-gray-900',
    },

    // Icons
    icon: {
      primary: 'text-gray-300',
      secondary: 'text-gray-400',
      tertiary: 'text-gray-500',
      interactive: 'text-gray-400 hover:text-gray-100',
    },

    // Statuses 
    status: {
      error: 'bg-gray-200 text-gray-900',
      success: 'bg-gray-300 text-gray-900',
      warning: 'bg-gray-400 text-gray-900',
      info: 'bg-gray-500 text-gray-900',
    },
  }
};

export default colorSystem; 