import React from "react";
import classes from './defaultButton.module.css';

type Props = { children: React.ReactNode; onClick: () => void };

function DefaultButton({ children, onClick }: Props) {
  return <button className={classes.defaultButton} onClick={onClick}>{children}</button>;
}

export default DefaultButton;
