import CoverPhotoSection from "./CoverPhotoSection";
import ProfilePhoto from "./ProfilePhoto";
import UserDetailsSection from "./UserDetailsSection";
import { Card } from "@mantine/core";
import { MProfile } from "../../../Logic/Model/MProfile";

interface ProfileDetailsSectionIndexProps {
  profileInfo: MProfile | null;
}

function ProfileDetailsSectionIndex(props: ProfileDetailsSectionIndexProps) {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        position: "relative",
        padding: "0px",
      }}
    >
      <CoverPhotoSection />
      <ProfilePhoto
        profileImageUri={props.profileInfo?.profile_image_uri}
        userName={props.profileInfo?.username}
      />
      <UserDetailsSection />
    </Card>
  );
}

export default ProfileDetailsSectionIndex;
