import { Loader } from "@mantine/core";

function Loading() {
  return (
    <div className="flex h-1/2 w-full flex-col items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
