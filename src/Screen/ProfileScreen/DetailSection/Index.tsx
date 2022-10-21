import { Card } from "@mantine/core";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import UsernameInterestsAndBio from "./UsernameInterestsAndBio";
import ProfilePicAndStats from "./ProfilePicAndStats";
import ProfileCardButtons from "./ProfileCardButtons";

function DetailSectionIndex() {
  const stores = useStores();
  return (
    <Card
      shadow={!stores.appStore.isPhone ? "md" : "xs"}
      p="lg"
      radius={"md"}
      withBorder={!stores.appStore.isPhone}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: stores.appStore.isPhone ? "0" : "",
        alignItems: "center",
        marginTop: stores.appStore.isPhone ? "0" : "10px",
      }}
    >
      <ProfilePicAndStats />
      <UsernameInterestsAndBio />
      <ProfileCardButtons />
    </Card>
  );
}

export default DetailSectionIndex;
