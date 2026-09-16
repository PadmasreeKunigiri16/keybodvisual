import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  icon,
  action,
}) => {
  return (
    <div className={`glass-panel rounded-xl p-5 shadow-lg border border-slate-700/50 ${className}`}>
      {(title || icon || action) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">{icon}</div>}
            <div>
              {title && <h3 className="text-base font-semibold text-slate-100">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
