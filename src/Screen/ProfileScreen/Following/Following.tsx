import { Button, Card , Text } from '@mantine/core'
import styled from 'styled-components'
import ProfileAvatar from '../../../Atoms/ProfileAvatar'
import { DummyFollowingList } from '../../../Data/Dummies/Following'

const SFollowing = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
interface FollowingProps{
    handleCurrentRenderingInProfileRoute : (p:string) => void
}

function Following(props:FollowingProps) {
  return (
    <SFollowing>
        <Text
          size={"md"}
          style = {{
            cursor : "pointer"
          }}
          onClick = {()=> props.handleCurrentRenderingInProfileRoute("Profile")}
        >
            {"<- Back"}
        </Text>
        {
            DummyFollowingList.map((each:{username:string,profile_pic_uri:string})=>{
                return(
                    <Card
                      style={{
                        display : "flex",
                        margin : "5px",
                        alignItems : "center"
                      }}
                    >
                        <ProfileAvatar imageUrl={each.profile_pic_uri}/>
                        <div
                         style={{
                            width : "100%",
                            display : "flex",
                            justifyContent : "space-between",
                            alignItems : "center"
                         }}
                        >
                           <Text ml={18}>{each.username}</Text>
                           <Button
                             variant="light"
                             size={"sm"}
                           >
                              UnFollow
                            </Button>
                        </div>
                    </Card>
                )
            })
        }
    </SFollowing>
  )
}

export default Following