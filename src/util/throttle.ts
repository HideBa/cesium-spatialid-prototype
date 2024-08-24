export const throttle = (func: (...args: unknown[]) => void, limit: number): (() => void) => {
  let inThrottle: boolean;
  return (...args: unknown[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}