import { Text } from "@mantine/core";
interface NavbarMobileItemProps {
  title: string;
  icon: JSX.Element;
}

function NavbarMobileItem(props: NavbarMobileItemProps) {
  return (
    <Text
      style={{
        fontSize: "20px",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        width: "100%",
      }}
    >
      {props.icon}
      <div style={{ width: "20px" }} />
      {props.title}
    </Text>
  );
}

export default NavbarMobileItem;
