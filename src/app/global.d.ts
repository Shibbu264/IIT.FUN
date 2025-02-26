declare module '*.scss';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.gif';
interface Window {
  gtag: (...args: any[]) => void;
  fbq: any;
}
