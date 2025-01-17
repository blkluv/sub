import type { ButtonProps } from "@mui/material";
import { Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import type { FC, MouseEventHandler } from "react";
import React, { useCallback, useMemo } from "react";
import { WalletIcon } from "./WalletIcon";

export const WalletDisconnectButton: FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  type = "button",
  children,
  disabled,
  onClick,
  ...props
}) => {
  const { wallet, disconnect, disconnecting } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented)
        disconnect().catch(() => {
          // Silently catch because any errors are caught by the context `onError` handler
        });
    },
    [onClick, disconnect]
  );

  const content = useMemo(() => {
    if (children) return children;
    if (disconnecting) return "Disconnecting ...";
    if (wallet) return "Disconnect";
    return "Disconnect Wallet";
  }, [children, disconnecting, wallet]);

  return (
    <Button
      color={color}
      variant={variant}
      type={type}
      onClick={handleClick}
      disabled={disabled || !wallet}
      startIcon={<WalletIcon wallet={wallet} />}
      {...props}
    >
      {content}
    </Button>
  );
};
