export const getThemeColors = (isDarkMode) => {
  return {
    // Background colors with high contrast
    background: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
      tertiary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      quaternary: isDarkMode ? 'bg-gray-600' : 'bg-gray-200',
      gradient: isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      card: isDarkMode ? 'bg-gray-800/95' : 'bg-white/95',
      modal: isDarkMode ? 'bg-gray-800' : 'bg-white',
      overlay: isDarkMode ? 'bg-black/70' : 'bg-black/50'
    },
    
    // Text colors with maximum contrast
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-100' : 'text-gray-800',
      tertiary: isDarkMode ? 'text-gray-200' : 'text-gray-700',
      quaternary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      inverse: isDarkMode ? 'text-gray-900' : 'text-white'
    },
    
    // Border colors with good visibility
    border: {
      primary: isDarkMode ? 'border-gray-600' : 'border-gray-200',
      secondary: isDarkMode ? 'border-gray-500' : 'border-gray-300',
      tertiary: isDarkMode ? 'border-gray-400' : 'border-gray-400',
      accent: isDarkMode ? 'border-blue-400' : 'border-blue-500',
      focus: isDarkMode ? 'focus:border-blue-400' : 'focus:border-blue-500'
    },
    
    // Card colors with proper contrast
    card: {
      background: isDarkMode ? 'bg-gray-800/90' : 'bg-white/90',
      border: isDarkMode ? 'border-gray-600' : 'border-gray-200',
      shadow: isDarkMode ? 'shadow-2xl shadow-black/20' : 'shadow-2xl shadow-gray-500/10',
      hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
    },
    
    // Button colors with high contrast
    button: {
      primary: isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white',
      success: isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white',
      warning: isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white',
      error: isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white',
      outline: isDarkMode 
        ? 'border-gray-400 text-gray-100 hover:bg-gray-700 hover:text-white' 
        : 'border-gray-400 text-gray-700 hover:bg-gray-100',
      ghost: isDarkMode
        ? 'text-gray-100 hover:bg-gray-700'
        : 'text-gray-700 hover:bg-gray-100'
    },
    
    // Input colors with clear visibility
    input: {
      background: isDarkMode ? 'bg-gray-700' : 'bg-white',
      border: isDarkMode ? 'border-gray-500' : 'border-gray-300',
      text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      placeholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
      focus: isDarkMode ? 'focus:border-blue-400 focus:ring-blue-400' : 'focus:border-blue-500 focus:ring-blue-500'
    },
    
    // Status colors with high visibility
    status: {
      success: {
        bg: isDarkMode ? 'bg-green-900/50' : 'bg-green-100',
        text: isDarkMode ? 'text-green-200' : 'text-green-800',
        border: isDarkMode ? 'border-green-400' : 'border-green-300',
        icon: isDarkMode ? 'text-green-300' : 'text-green-600'
      },
      warning: {
        bg: isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100',
        text: isDarkMode ? 'text-yellow-200' : 'text-yellow-800',
        border: isDarkMode ? 'border-yellow-400' : 'border-yellow-300',
        icon: isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
      },
      error: {
        bg: isDarkMode ? 'bg-red-900/50' : 'bg-red-100',
        text: isDarkMode ? 'text-red-200' : 'text-red-800',
        border: isDarkMode ? 'border-red-400' : 'border-red-300',
        icon: isDarkMode ? 'text-red-300' : 'text-red-600'
      },
      info: {
        bg: isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-200' : 'text-blue-800',
        border: isDarkMode ? 'border-blue-400' : 'border-blue-300',
        icon: isDarkMode ? 'text-blue-300' : 'text-blue-600'
      }
    },

    // Badge colors with clear contrast
    badge: {
      default: isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-200 text-gray-800',
      primary: isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white',
      success: isDarkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white',
      warning: isDarkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-600 text-white',
      error: isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white',
      outline: isDarkMode ? 'border-gray-400 text-gray-100' : 'border-gray-400 text-gray-700'
    },

    // Table colors with good readability
    table: {
      background: isDarkMode ? 'bg-gray-800' : 'bg-white',
      header: isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-50 text-gray-900',
      row: isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50',
      cell: isDarkMode ? 'text-gray-100' : 'text-gray-900'
    }
  };
};

// Role-specific theme colors with enhanced visibility
export const getRoleThemeColors = (role, isDarkMode) => {
  const baseColors = {
    admin: {
      gradient: isDarkMode ? 'from-red-600 to-pink-600' : 'from-red-500 to-pink-500',
      badge: 'bg-red-500',
      accent: isDarkMode ? 'text-red-300' : 'text-red-700',
      accentBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
      activeLink: isDarkMode ? 'bg-red-600' : 'bg-red-500',
      border: isDarkMode ? 'border-red-400' : 'border-red-300',
      hover: isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
    },
    vendor: {
      gradient: isDarkMode ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500',
      badge: 'bg-blue-500',
      accent: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      accentBg: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
      activeLink: isDarkMode ? 'bg-blue-600' : 'bg-blue-500',
      border: isDarkMode ? 'border-blue-400' : 'border-blue-300',
      hover: isDarkMode ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'
    },
    user: {
      gradient: isDarkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
      badge: 'bg-green-500',
      accent: isDarkMode ? 'text-green-300' : 'text-green-700',
      accentBg: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
      activeLink: isDarkMode ? 'bg-green-600' : 'bg-green-500',
      border: isDarkMode ? 'border-green-400' : 'border-green-300',
      hover: isDarkMode ? 'hover:bg-green-500/10' : 'hover:bg-green-50'
    }
  };
  
  return baseColors[role] || baseColors.user;
};

// Enhanced contrast text helper
export const getContrastText = (isDarkMode, intensity = 'normal') => {
  const levels = {
    highest: isDarkMode ? 'text-white' : 'text-black',
    high: isDarkMode ? 'text-gray-50' : 'text-gray-900',
    normal: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    medium: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    low: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    lowest: isDarkMode ? 'text-gray-400' : 'text-gray-500'
  };
  
  return levels[intensity] || levels.normal;
};

// Enhanced contrast background helper
export const getContrastBackground = (isDarkMode, variant = 'primary') => {
  const variants = {
    primary: isDarkMode ? 'bg-gray-800' : 'bg-white',
    secondary: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    tertiary: isDarkMode ? 'bg-gray-600' : 'bg-gray-100',
    quaternary: isDarkMode ? 'bg-gray-500' : 'bg-gray-200',
    card: isDarkMode ? 'bg-gray-800/95' : 'bg-white/95',
    elevated: isDarkMode ? 'bg-gray-800' : 'bg-white',
    overlay: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
  };
  
  return variants[variant] || variants.primary;
};

// Icon color helper with enhanced visibility
export const getIconColor = (isDarkMode, variant = 'default') => {
  const colors = {
    default: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    primary: isDarkMode ? 'text-blue-300' : 'text-blue-600',
    secondary: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    success: isDarkMode ? 'text-green-300' : 'text-green-600',
    warning: isDarkMode ? 'text-yellow-300' : 'text-yellow-600',
    error: isDarkMode ? 'text-red-300' : 'text-red-600',
    info: isDarkMode ? 'text-blue-300' : 'text-blue-600',
    muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    accent: isDarkMode ? 'text-purple-300' : 'text-purple-600'
  };
  
  return colors[variant] || colors.default;
};

// Transport type specific colors
export const getTransportColors = (type, isDarkMode) => {
  const colors = {
    bus: isDarkMode ? 'text-blue-300' : 'text-blue-600',
    train: isDarkMode ? 'text-green-300' : 'text-green-600',
    plane: isDarkMode ? 'text-red-300' : 'text-red-600',
    launch: isDarkMode ? 'text-purple-300' : 'text-purple-600',
    ship: isDarkMode ? 'text-cyan-300' : 'text-cyan-600'
  };
  
  return colors[type?.toLowerCase()] || colors.bus;
};