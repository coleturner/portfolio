import { useRef, useState, useCallback, useEffect } from 'react';

export default function useColorScheme(defaultScheme = 'unset') {
  const mediaRef = useRef(null);
  const [scheme, setScheme] = useState(defaultScheme);

  const listener = useCallback((e) => {
    setScheme(e.matches ? 'dark' : 'light');
  });

  useEffect(() => {
    mediaRef.current = window.matchMedia('(prefers-color-scheme: dark)');
    mediaRef.current.addEventListener('change', listener);

    setScheme(mediaRef.current.matches ? 'dark' : 'light');

    return () => {
      mediaRef.current.removeListener(listener);
    };
  });

  return scheme;
}
