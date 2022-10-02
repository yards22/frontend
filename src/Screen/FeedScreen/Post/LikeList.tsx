import { Avatar, Text } from "@mantine/core";
import React from "react";
import LinkedUserName from "../../../Atoms/LinkedUserName";

const data: { user_id: number; profile_pic_ref: string; username: string }[] = [
  {
    user_id: 34343,
    username: "himanshu_sah",
    profile_pic_ref:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
  },
  {
    user_id: 34343,
    username: "himanshu_sah",
    profile_pic_ref:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
  },
  {
    user_id: 34343,
    username: "himanshu_sah",
    profile_pic_ref:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
  },
];
function LikeList() {
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              padding: "10px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Avatar src={item.profile_pic_ref} size="sm" />
            <LinkedUserName
              username={item.username}
              style={{ marginLeft: "15px" }}
            >
              {item.username}
            </LinkedUserName>
          </div>
        );
      })}
    </div>
  );
}

export default LikeList;
