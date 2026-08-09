import {
  BookA,
  Code2,
  Cog,
  Home,
  LucideProps,
  PenLineIcon,
  UserPen,
} from "lucide-react";

export type Route = {
  name: string;
  path: string;
  external?: boolean;
  icon?: React.ComponentType<LucideProps>;
  underConstruction?: boolean;
  visible?: boolean;
};

export const routes: Route[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: BookA },
  { name: "Projects", path: "/projects", icon: Code2, underConstruction: true },
  { name: "Writing", path: "/writing", icon: PenLineIcon },
  { name: "Site Info", path: "/info", icon: Cog },
  {
    name: "Guestbook",
    path: "/guest-book",
    icon: UserPen,
    underConstruction: true,
  },
  {
    name: "Github",
    path: "https://github.com/zachurich",
    external: true,
  },
  {
    name: "Dribbble",
    path: "https://dribbble.com/zachurich",
    external: true,
  },
  {
    name: "bluesky",
    path: "https://bsky.app/profile/zachurich.bsky.social",
    external: true,
  },
  {
    name: "Instagram",
    path: "https://www.instagram.com/zachurich/",
    external: true,
  },
  {
    name: "Steam",
    path: "https://steamcommunity.com/id/zachurich/",
    external: true,
  },
];
