export const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  ms: number,
): ((...args: T) => void) => {
  let isActive = false;

  return (...args: T) => {
    if (isActive) return;

    isActive = true;
    setTimeout(() => {
      callback(...args);
      isActive = false;
    }, ms);
  };
};
