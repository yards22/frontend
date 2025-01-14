import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MUINotification } from "../../Logic/Model/MNotification";
import { getIcon } from "./IconForNotification";

interface NotificationTileProps extends MUINotification {}

const SNotificationTile = styled(Link)`
  min-height: 70px;
  padding: 5px 10px;
  display: flex;
  text-decoration: none;
  color: inherit;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
  cursor: pointer;
  background: ${(p) => p.theme.bgColor};
  :hover {
    background: ${(p) => p.theme.hoverColor};
  }
`;

const SBullDot = styled.div`
  background: ${(p) => p.theme.bgColor};
  width: 8px;
  height: 8px;
  margin: 0 10px;
  border-radius: 3px;
`;
function NotificationTile(props: NotificationTileProps) {
  const mantineTheme = useMantineTheme();
  let url = "";
  if (props.extra.post_id) url = `/post?post_id=${props.extra.post_id}`;
  else url = "/followers";

  if (props.type === "COMMENT" || props.type === "REPLY")
    url += "&open_comments=true";
  return (
    <SNotificationTile
      to={url}
      theme={{
        bgColor:
          props.status === "Unseen"
            ? mantineTheme.colors["blue"][0]
            : mantineTheme.colors["gray"][0],
        hoverColor:
          props.status === "Unseen"
            ? mantineTheme.colors["blue"][1]
            : mantineTheme.colors["gray"][1]
      }}
    >
      <SBullDot
        theme={{
          bgColor:
            props.status !== "Read"
              ? mantineTheme.colors["blue"][8]
              : "transparent"
        }}
      />
      <div className="flex h-[70px] w-[70px] items-center justify-center p-2">
        {getIcon(props.type, mantineTheme)}
      </div>
      <div style={{ marginLeft: "10px", width: "100%" }}> {props.content}</div>
      <Text color="dimmed" size={"xs"} className="ml-2 min-w-[10%] text-right">
        {props.happened}
      </Text>
    </SNotificationTile>
  );
}

export default NotificationTile;
