import { useState } from "react";
import classes from "./mapOverlay.module.css";
import DefaultButton from "@components/atoms/buttons/DefaultButton";

type Props = {
  shouldOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  startOpen?: boolean;
  closeable?: boolean;
};

export default function BaseMapOverlay({
  onClose,
  children,
  title,
  closeable = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseClick = () => {
    if (onClose) {
      onClose();
    }
    setIsOpen(false);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className={classes.mapOverlay}>
      <h1>{title}</h1>
      {children}
      {closeable && <DefaultButton onClick={onCloseClick}>Lukk</DefaultButton>}
    </div>
  );
}
