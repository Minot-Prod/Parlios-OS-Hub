type AgentAvatarProps = {
  name: string;
  color?: "amber" | "cyan" | "green" | "purple" | "red" | "white";
};

const colorMap: Record<NonNullable<AgentAvatarProps["color"]>, string> = {
  amber: "/parlios/avatars/avatar-amber.svg",
  cyan: "/parlios/avatars/avatar-cyan.svg",
  green: "/parlios/avatars/avatar-green.svg",
  purple: "/parlios/avatars/avatar-purple.svg",
  red: "/parlios/avatars/avatar-red.svg",
  white: "/parlios/avatars/avatar-white.svg",
};

export default function AgentAvatar({ name, color = "cyan" }: AgentAvatarProps) {
  const src = colorMap[color] ?? colorMap["cyan"];

  return (
    <div className="agent-avatar">
      <img src={src} alt={name} className="agent-avatar-img" />
    </div>
  );
}
