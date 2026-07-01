import type { User } from "../../types";

export const formatProfileDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export const getProfileDisplayName = (user: User) =>
  [user.first_name, user.last_name].filter(Boolean).join(" ") ||
  user.user_name;

export const getProfileInitials = (displayName: string) =>
  displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const getProfileFields = (user: User) =>
  [
    { label: "Email", value: user.email },
    { label: "Username", value: user.user_name },
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Age", value: user.age },
    { label: "Account Created", value: formatProfileDate(user.created_at) },
  ].filter(({ value }) => value);
