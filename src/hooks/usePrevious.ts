import { useEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<T>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  if (!mounted) {
    ref.current = value;
  }

  return ref.current as T;
}

export default usePrevious;
