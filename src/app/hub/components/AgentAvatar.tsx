import React from "react";

export default function AgentAvatar({ variant = "avatar-cyan.svg" }: { variant?: string }) {
  return (
    <img
      src={`/parlios/avatars/${variant}`}
      alt={variant}
      width={56}
      height={56}
      style={{ borderRadius: 12 }}
    />
  );
}
