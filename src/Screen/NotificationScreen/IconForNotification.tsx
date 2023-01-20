import { MantineTheme } from "@mantine/core";
import { Heart, MessageCircle, Users, Zap, Info } from "react-feather";

export function getIcon(type: string, mantineTheme: MantineTheme) {
  switch (type) {
    case "LIKE": {
      return (
        <Heart
          color={mantineTheme.colors["red"][9]}
          fill={mantineTheme.colors["red"][4]}
        />
      );
    }
    case "REPLY": {
      return (
        <MessageCircle
          color={mantineTheme.colors["yellow"][9]}
          fill={mantineTheme.colors["yellow"][4]}
        />
      );
    }
    case "COMMENT": {
      return (
        <MessageCircle
          color={mantineTheme.colors["teal"][9]}
          fill={mantineTheme.colors["teal"][4]}
        />
      );
    }
    case "SHARE": {
      return (
        <Heart
          color={mantineTheme.colors["red"][9]}
          fill={mantineTheme.colors["red"][4]}
        />
      );
    }
    case "FOLLOW": {
      return (
        <Users
          color={mantineTheme.colors["violet"][9]}
          fill={mantineTheme.colors["violet"][4]}
        />
      );
    }
    case "NEW": {
      return (
        <Zap
          color={mantineTheme.colors["yellow"][9]}
          fill={mantineTheme.colors["yellow"][4]}
        />
      );
    }
    default: {
      return (
        <Info
          color={mantineTheme.colors["gray"][9]}
          fill={mantineTheme.colors["gray"][4]}
        />
      );
    }
  }
}
