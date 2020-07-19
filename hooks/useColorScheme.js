import { useRef, useState, useCallback, useEffect } from 'react';

export default function useColorScheme(defaultScheme = 'unset') {
  const mediaRef = useRef(null);
  const [scheme, setScheme] = useState(defaultScheme);

  const listener = useCallback((e) => {
    setScheme(e.matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return () => {};
    }

    const match = window.matchMedia('(prefers-color-scheme: dark)');

    if (match.addListener) {
      match.addListener(listener);
    }

    setScheme(match.matches ? 'dark' : 'light');

    mediaRef.current = match;

    return () => {
      if (mediaRef.current && mediaRef.current.removeListener) {
        mediaRef.current.removeListener(listener);
      }
    };
  });

  return scheme;
}
