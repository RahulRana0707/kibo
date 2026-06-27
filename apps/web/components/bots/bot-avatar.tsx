import { Avatar, AvatarFallback, AvatarImage } from "@kibo/ui/components/avatar"

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "KB"
  )
}

export function BotAvatar({
  name,
  avatarUrl,
  className,
}: {
  name: string
  avatarUrl: string | null
  className?: string
}) {
  return (
    <Avatar className={className}>
      {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}
