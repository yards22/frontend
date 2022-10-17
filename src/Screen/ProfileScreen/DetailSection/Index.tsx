import { Card } from "@mantine/core";
import { MProfile } from "../../../Logic/Model/MProfile";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import InterestsAndBio from "./UsernameInterestsAndBio";
import ProfilePicAndStats from "./ProfilePicAndStats";
import ProfileCardButtons from "./ProfileCardButtons";

interface ProfileDetailsSectionIndexProps {
  profileInfo: MProfile | null;
  handleCurrentRenderingInProfileRoute: (current: string) => void;
}

function ProfileDetailsSectionIndex(props: ProfileDetailsSectionIndexProps) {
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
      <InterestsAndBio />
      <ProfileCardButtons />
    </Card>
  );
}

export default ProfileDetailsSectionIndex;
