import { Variants } from 'framer-motion';

// Animation variants for navigation items
export const navItemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.3
    }
  }),
  hover: { 
    y: -3,
    scale: 1.05,
    transition: { 
      duration: 0.2,
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

// Animation variants for dropdown menus
export const dropdownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -5, 
    scale: 0.95,
    transition: { 
      duration: 0.2 
    }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.2,
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    scale: 0.95,
    transition: { 
      duration: 0.2 
    }
  }
};

// Animation variants for buttons
export const buttonVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

// Animation variants for page transitions
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

// Animation for the active indicator (underline)
export const activeIndicatorVariants: Variants = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30 
    }
  }
};

// Animation for badge notifications
export const badgeVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: 3,
      repeatType: "loop"
    }
  }
}; 