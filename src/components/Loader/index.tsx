import { useCallback, useEffect, useRef, useState } from 'react';
import { LoaderContainer, Loading, LoadingImg } from './styles';
import Load from '../../assets/loading.svg';

interface LoaderProps {
  isLoading?: boolean;
  /** Tempo máximo (ms) que o loader ficará visível — segurança contra travamento */
  timeout?: number;
}

const DEFAULT_TIMEOUT = 30_000; // 30 s

export default function Loader({
  isLoading = false,
  timeout = DEFAULT_TIMEOUT,
}: LoaderProps) {
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimedOut(false);
      clearTimer();
      timerRef.current = setTimeout(() => {
        setTimedOut(true);
      }, timeout);
    } else {
      clearTimer();
      setTimedOut(false);
    }

    return clearTimer;
  }, [isLoading, timeout, clearTimer]);

  const visible = isLoading && !timedOut;

  if (!visible) return null;

  return (
    <LoaderContainer>
      <Loading>
        <LoadingImg src={Load} />
      </Loading>
    </LoaderContainer>
  );
}
