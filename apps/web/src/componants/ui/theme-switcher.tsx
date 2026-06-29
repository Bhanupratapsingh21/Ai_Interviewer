// apps/web/src/components/ui/theme-switcher.tsx
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeSwitcher({ 
  className, 
  variant = 'buttons',
  size = 'md'
}: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  // Button variant (simple toggle with system option)
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => {
          if (theme === 'dark') setTheme('light');
          else if (theme === 'light') setTheme('system');
          else setTheme('dark');
        }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all',
          sizeClasses[size],
          className
        )}
        title={`Current: ${theme} (${resolvedTheme})`}
      >
        {theme === 'dark' ? (
          <Moon className="text-neutral-700 dark:text-neutral-200" size={iconSize[size]} />
        ) : theme === 'light' ? (
          <Sun className="text-neutral-700 dark:text-neutral-200" size={iconSize[size]} />
        ) : (
          <Monitor className="text-neutral-700 dark:text-neutral-200" size={iconSize[size]} />
        )}
        <span className="sr-only">
          Theme: {theme} ({resolvedTheme})
        </span>
      </button>
    );
  }

  // Buttons variant (three separate buttons)
  return (
    <div className={cn(
      'inline-flex items-center gap-1 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900',
      className
    )}>
      <button
        onClick={() => setTheme('light')}
        className={cn(
          'rounded-md p-1.5 transition-all',
          theme === 'light' 
            ? 'bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700' 
            : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
        )}
        title="Light mode"
      >
        <Sun size={iconSize[size]} className="text-neutral-700 dark:text-neutral-300" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          'rounded-md p-1.5 transition-all',
          theme === 'dark' 
            ? 'bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700' 
            : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
        )}
        title="Dark mode"
      >
        <Moon size={iconSize[size]} className="text-neutral-700 dark:text-neutral-300" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={cn(
          'rounded-md p-1.5 transition-all',
          theme === 'system' 
            ? 'bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700' 
            : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
        )}
        title="System preference"
      >
        <Monitor size={iconSize[size]} className="text-neutral-700 dark:text-neutral-300" />
      </button>
    </div>
  );
}

// Dropdown variant for use in navigation/menus
export function ThemeDropdown({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className={cn('relative', className)}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      >
        {theme === 'dark' && <Moon size={16} />}
        {theme === 'light' && <Sun size={16} />}
        {theme === 'system' && <Monitor size={16} />}
        <span className="text-sm font-medium capitalize">
          {theme}
        </span>
        <span className="text-xs text-neutral-500">({resolvedTheme})</span>
      </button>
      <div className="absolute top-full mt-1 right-0 min-w-[120px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors',
                isActive 
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100' 
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300'
              )}
            >
              <Icon size={14} />
              {option.label}
              {isActive && (
                <span className="ml-auto text-emerald-500">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}