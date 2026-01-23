import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for clean conditional class names.
 * Use this instead of template literals for any conditional class logic.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
