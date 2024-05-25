import { useEffect, useState } from "react";
import styles from "./loadingIndicator.module.css";

type Props = {
  isLoading: boolean;
};

function LoadingIndicator({ isLoading }: Props) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (isLoading) {
      const timeOut = setTimeout(() => setDisplay(true), 500);
      return () => {
        clearTimeout(timeOut);
      };
    } else {
      setDisplay(false);
    }
  }, [isLoading]);

  if (!display || !isLoading) {
    return null;
  }
  return <div className={styles.loadingIndicator}>Laster...</div>;
}

export default LoadingIndicator;
