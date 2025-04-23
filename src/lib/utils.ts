import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Big from 'big.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSuiBalance = (mistBalance: string): string => {
  const suiBalance = new Big(mistBalance).div(10 ** 9).round(2).toString();
  return suiBalance;
};

export const handleError = (error: Error) => {
  // TODO: Add sentry monitoring

  console.error('Wallet connection error:', error);
}
