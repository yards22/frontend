import ProfilePhoto from "./ProfilePhoto";
import UserDetailsSection from "./UserDetailsSection"
import { Card, Center, HoverCard, RingProgress } from "@mantine/core"
import { MProfile } from "../../../Logic/Model/MProfile"
import { Info } from "react-feather";

interface ProfileDetailsSectionIndexProps {
  profileInfo: MProfile | null;
}

function ProfileDetailsSectionIndex(props: ProfileDetailsSectionIndexProps) {
  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      withBorder
      style={{
        position: "relative",
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
      }}
    >
        <div
          style={{
            position : "absolute",
            top : "10px",
            right : "10px"
          }}
        >
          <HoverCard width={250} shadow="md" >
            <HoverCard.Target>
              <Info style={{
                cursor : "pointer",
                height : "20px",
                color : "gray"
              }}/>
            </HoverCard.Target>
            <HoverCard.Dropdown>
               Circle around your profile pic shows your progress for upgrading to next slab
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <RingProgress
          sections={ [{ value: 40, color: 'blue', tooltip: '40 of current tab reached' }]}
          size = {140}
          thickness = {4}
          roundCaps = {true}
          label={
            <Center>
                <ProfilePhoto 
                   profileImageUri={props.profileInfo?.profile_image_uri} 
                   userName={props.profileInfo?.username} 
                 />
            </Center>
          }
        />
        <UserDetailsSection/>
    </Card>
  );
}

export default ProfileDetailsSectionIndex;
