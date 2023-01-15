import { Loader } from "@mantine/core";

function Loading() {
  return (
    <div
      style={{
        height: "50%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Loader />
    </div>
  );
}

export default Loading;
