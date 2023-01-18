import React from "react";
import { ChevronLeft } from "react-feather";
interface BackPageProps {
  title?: string;
  onClick?: () => void;
}
function BackPage(props: BackPageProps) {
  return (
    <div className="flex h-12 w-full items-center bg-gray-100 px-1">
      <div
        onClick={props.onClick}
        className="mr-5  flex cursor-pointer items-center justify-center rounded-full p-2 text-gray-700 transition-all hover:bg-gray-300 active:bg-gray-300"
      >
        <ChevronLeft />
      </div>
      <h4 className="text-gray-700">{props.title}</h4>
    </div>
  );
}

export default BackPage;
