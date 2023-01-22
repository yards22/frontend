import React from "react";
import { Bell } from "react-feather";
import { Text } from "@mantine/core";

function NotificationBellWithCount(props: { count: number }) {
  const show = props.count > 9 ? "9+" : `${props.count}`;
  const mRight = props.count > 9 ? "right-[-12px]" : "right-[-5px]";
  return (
    <div className="relative flex h-min w-min ">
      <Bell size={"20"} />
      {show !== "0" && (
        <Text
          className={`absolute top-[-5px] z-10 flex h-4 w-fit items-center justify-center rounded-xl bg-red-600 p-1 font-bold text-white ${mRight}`}
          size={"xs"}
        >
          {show}
        </Text>
      )}
    </div>
  );
}

export default NotificationBellWithCount;
