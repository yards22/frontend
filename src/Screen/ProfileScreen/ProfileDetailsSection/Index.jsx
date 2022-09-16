import CoverPhotoSection from "./CoverPhotoSection"
import ProfilePhoto from "./ProfilePhoto"
import UserDetailsSection from "./UserDetailsSection"
import { Card } from "@mantine/core"

function ProfileSectionIndex() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder
       style={{
         position : "relative",padding: "0px"
       }}
    >
        <CoverPhotoSection/>
        <ProfilePhoto/>
        <UserDetailsSection/>
    </Card>
  )
}

export default ProfileSectionIndex