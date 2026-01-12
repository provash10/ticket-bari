export const ensureVisibleText = (isDarkMode, variant = 'primary') => {
  const textColors = {
    primary: isDarkMode ? 'text-white' : 'text-gray-900',
    secondary: isDarkMode ? 'text-gray-100' : 'text-gray-800', 
    tertiary: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    quaternary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    accent: isDarkMode ? 'text-blue-300' : 'text-blue-700',
    success: isDarkMode ? 'text-green-300' : 'text-green-700',
    warning: isDarkMode ? 'text-yellow-300' : 'text-yellow-700',
    error: isDarkMode ? 'text-red-300' : 'text-red-700',
    info: isDarkMode ? 'text-blue-300' : 'text-blue-700'
  };
  
  return textColors[variant] || textColors.primary;
};

export const ensureVisibleBackground = (isDarkMode, variant = 'primary') => {
  const backgrounds = {
    primary: isDarkMode ? 'bg-gray-800' : 'bg-white',
    secondary: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    tertiary: isDarkMode ? 'bg-gray-600' : 'bg-gray-100',
    quaternary: isDarkMode ? 'bg-gray-500' : 'bg-gray-200',
    card: isDarkMode ? 'bg-gray-800/95' : 'bg-white/95',
    overlay: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    modal: isDarkMode ? 'bg-gray-800' : 'bg-white',
    dropdown: isDarkMode ? 'bg-gray-700' : 'bg-white',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    active: isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
  };
  
  return backgrounds[variant] || backgrounds.primary;
};

export const ensureVisibleBorder = (isDarkMode, variant = 'primary') => {
  const borders = {
    primary: isDarkMode ? 'border-gray-600' : 'border-gray-200',
    secondary: isDarkMode ? 'border-gray-500' : 'border-gray-300',
    tertiary: isDarkMode ? 'border-gray-400' : 'border-gray-400',
    accent: isDarkMode ? 'border-blue-400' : 'border-blue-500',
    success: isDarkMode ? 'border-green-400' : 'border-green-500',
    warning: isDarkMode ? 'border-yellow-400' : 'border-yellow-500',
    error: isDarkMode ? 'border-red-400' : 'border-red-500',
    info: isDarkMode ? 'border-blue-400' : 'border-blue-500',
    focus: isDarkMode ? 'focus:border-blue-400' : 'focus:border-blue-500'
  };
  
  return borders[variant] || borders.primary;
};

export const ensureVisibleButton = (isDarkMode, variant = 'primary') => {
  const buttons = {
    primary: isDarkMode 
      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700' 
      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700',
    secondary: isDarkMode 
      ? 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700' 
      : 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700',
    success: isDarkMode 
      ? 'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700' 
      : 'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700',
    warning: isDarkMode 
      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600 hover:border-yellow-700' 
      : 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600 hover:border-yellow-700',
    error: isDarkMode 
      ? 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700' 
      : 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700',
    outline: isDarkMode 
      ? 'border-gray-400 text-gray-100 hover:bg-gray-700 hover:text-white hover:border-gray-300' 
      : 'border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500',
    ghost: isDarkMode
      ? 'text-gray-100 hover:bg-gray-700 hover:text-white'
      : 'text-gray-700 hover:bg-gray-100',
    link: isDarkMode
      ? 'text-blue-300 hover:text-blue-200 underline'
      : 'text-blue-600 hover:text-blue-800 underline'
  };
  
  return buttons[variant] || buttons.primary;
};

export const ensureVisibleInput = (isDarkMode) => {
  return isDarkMode 
    ? 'bg-gray-700 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500';
};

export const ensureVisibleCard = (isDarkMode, variant = 'default') => {
  const cards = {
    default: isDarkMode 
      ? 'bg-gray-800 border-gray-600 text-gray-100'
      : 'bg-white border-gray-200 text-gray-900',
    elevated: isDarkMode
      ? 'bg-gray-800/95 border-gray-600 text-gray-100 shadow-2xl shadow-black/20'
      : 'bg-white/95 border-gray-200 text-gray-900 shadow-2xl shadow-gray-500/10',
    glass: isDarkMode
      ? 'bg-gray-800/80 border-gray-600/50 text-gray-100 backdrop-blur-sm'
      : 'bg-white/80 border-gray-200/50 text-gray-900 backdrop-blur-sm'
  };
  
  return cards[variant] || cards.default;
};

export const ensureVisibleBadge = (isDarkMode, variant = 'default') => {
  const badges = {
    default: isDarkMode 
      ? 'bg-gray-600 text-gray-100 border-gray-500'
      : 'bg-gray-200 text-gray-800 border-gray-300',
    primary: isDarkMode
      ? 'bg-blue-600 text-white border-blue-500'
      : 'bg-blue-600 text-white border-blue-500',
    success: isDarkMode
      ? 'bg-green-600 text-white border-green-500'
      : 'bg-green-600 text-white border-green-500',
    warning: isDarkMode
      ? 'bg-yellow-600 text-white border-yellow-500'
      : 'bg-yellow-600 text-white border-yellow-500',
    error: isDarkMode
      ? 'bg-red-600 text-white border-red-500'
      : 'bg-red-600 text-white border-red-500',
    outline: isDarkMode
      ? 'border-gray-400 text-gray-100 bg-transparent'
      : 'border-gray-400 text-gray-700 bg-transparent'
  };
  
  return badges[variant] || badges.default;
};

export const ensureVisibleTable = (isDarkMode) => {
  return {
    table: isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900',
    header: isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-200',
    row: isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50',
    cell: isDarkMode ? 'text-gray-100' : 'text-gray-900'
  };
};

export const ensureVisibleModal = (isDarkMode) => {
  return {
    backdrop: isDarkMode ? 'bg-black/70' : 'bg-black/50',
    container: isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900',
    header: isDarkMode ? 'border-gray-600' : 'border-gray-200',
    footer: isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50/50'
  };
};

export const ensureVisibleAlert = (isDarkMode, variant = 'info') => {
  const alerts = {
    info: isDarkMode
      ? 'bg-blue-900/50 border-blue-400 text-blue-200'
      : 'bg-blue-50 border-blue-300 text-blue-800',
    success: isDarkMode
      ? 'bg-green-900/50 border-green-400 text-green-200'
      : 'bg-green-50 border-green-300 text-green-800',
    warning: isDarkMode
      ? 'bg-yellow-900/50 border-yellow-400 text-yellow-200'
      : 'bg-yellow-50 border-yellow-300 text-yellow-800',
    error: isDarkMode
      ? 'bg-red-900/50 border-red-400 text-red-200'
      : 'bg-red-50 border-red-300 text-red-800'
  };
  
  return alerts[variant] || alerts.info;
};

// Comprehensive visibility class generator
export const getVisibilityClasses = (isDarkMode) => ({
  text: {
    primary: ensureVisibleText(isDarkMode, 'primary'),
    secondary: ensureVisibleText(isDarkMode, 'secondary'),
    tertiary: ensureVisibleText(isDarkMode, 'tertiary'),
    quaternary: ensureVisibleText(isDarkMode, 'quaternary'),
    muted: ensureVisibleText(isDarkMode, 'muted'),
    accent: ensureVisibleText(isDarkMode, 'accent'),
    success: ensureVisibleText(isDarkMode, 'success'),
    warning: ensureVisibleText(isDarkMode, 'warning'),
    error: ensureVisibleText(isDarkMode, 'error'),
    info: ensureVisibleText(isDarkMode, 'info')
  },
  bg: {
    primary: ensureVisibleBackground(isDarkMode, 'primary'),
    secondary: ensureVisibleBackground(isDarkMode, 'secondary'),
    tertiary: ensureVisibleBackground(isDarkMode, 'tertiary'),
    quaternary: ensureVisibleBackground(isDarkMode, 'quaternary'),
    card: ensureVisibleBackground(isDarkMode, 'card'),
    overlay: ensureVisibleBackground(isDarkMode, 'overlay'),
    modal: ensureVisibleBackground(isDarkMode, 'modal'),
    dropdown: ensureVisibleBackground(isDarkMode, 'dropdown'),
    hover: ensureVisibleBackground(isDarkMode, 'hover'),
    active: ensureVisibleBackground(isDarkMode, 'active')
  },
  border: {
    primary: ensureVisibleBorder(isDarkMode, 'primary'),
    secondary: ensureVisibleBorder(isDarkMode, 'secondary'),
    tertiary: ensureVisibleBorder(isDarkMode, 'tertiary'),
    accent: ensureVisibleBorder(isDarkMode, 'accent'),
    success: ensureVisibleBorder(isDarkMode, 'success'),
    warning: ensureVisibleBorder(isDarkMode, 'warning'),
    error: ensureVisibleBorder(isDarkMode, 'error'),
    info: ensureVisibleBorder(isDarkMode, 'info'),
    focus: ensureVisibleBorder(isDarkMode, 'focus')
  },
  button: {
    primary: ensureVisibleButton(isDarkMode, 'primary'),
    secondary: ensureVisibleButton(isDarkMode, 'secondary'),
    success: ensureVisibleButton(isDarkMode, 'success'),
    warning: ensureVisibleButton(isDarkMode, 'warning'),
    error: ensureVisibleButton(isDarkMode, 'error'),
    outline: ensureVisibleButton(isDarkMode, 'outline'),
    ghost: ensureVisibleButton(isDarkMode, 'ghost'),
    link: ensureVisibleButton(isDarkMode, 'link')
  },
  input: ensureVisibleInput(isDarkMode),
  card: {
    default: ensureVisibleCard(isDarkMode, 'default'),
    elevated: ensureVisibleCard(isDarkMode, 'elevated'),
    glass: ensureVisibleCard(isDarkMode, 'glass')
  },
  badge: {
    default: ensureVisibleBadge(isDarkMode, 'default'),
    primary: ensureVisibleBadge(isDarkMode, 'primary'),
    success: ensureVisibleBadge(isDarkMode, 'success'),
    warning: ensureVisibleBadge(isDarkMode, 'warning'),
    error: ensureVisibleBadge(isDarkMode, 'error'),
    outline: ensureVisibleBadge(isDarkMode, 'outline')
  },
  table: ensureVisibleTable(isDarkMode),
  modal: ensureVisibleModal(isDarkMode),
  alert: {
    info: ensureVisibleAlert(isDarkMode, 'info'),
    success: ensureVisibleAlert(isDarkMode, 'success'),
    warning: ensureVisibleAlert(isDarkMode, 'warning'),
    error: ensureVisibleAlert(isDarkMode, 'error')
  }
});

// Enhanced icon color helpers
export const getIconColor = (isDarkMode, variant = 'default') => {
  const colors = {
    default: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    primary: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    success: isDarkMode ? 'text-green-400' : 'text-green-600',
    warning: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
    error: isDarkMode ? 'text-red-400' : 'text-red-600',
    info: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    muted: isDarkMode ? 'text-gray-500' : 'text-gray-400'
  };
  
  return colors[variant] || colors.default;
};

// Enhanced gradient helpers
export const getGradient = (isDarkMode, variant = 'primary') => {
  const gradients = {
    primary: isDarkMode 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
      : 'bg-gradient-to-r from-blue-500 to-purple-500',
    secondary: isDarkMode
      ? 'bg-gradient-to-r from-gray-700 to-gray-800'
      : 'bg-gradient-to-r from-gray-200 to-gray-300',
    success: isDarkMode
      ? 'bg-gradient-to-r from-green-600 to-emerald-600'
      : 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: isDarkMode
      ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
      : 'bg-gradient-to-r from-yellow-500 to-orange-500',
    error: isDarkMode
      ? 'bg-gradient-to-r from-red-600 to-pink-600'
      : 'bg-gradient-to-r from-red-500 to-pink-500'
  };
  
  return gradients[variant] || gradients.primary;
};