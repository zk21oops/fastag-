import { ReactNode, HTMLAttributes } from 'react';
import { animations } from '../styles/design-tokens';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({ hoverable = false, children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl p-6
        ${animations.card.default}
        ${hoverable ? `hover:${animations.card.hover} cursor-pointer` : ''}
        shadow-md
        ${hoverable ? 'hover:shadow-xl' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
