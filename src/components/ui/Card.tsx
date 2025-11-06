import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md ${
        hover ? 'hover:shadow-2xl hover:scale-105' : ''
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
