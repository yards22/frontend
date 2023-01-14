export const DummyComments: {
  comment_id: bigint;
  username: string;
  profile_image_uri: string;
  user_id: number;
  content: string;
  replies: {
    created_at: Date;
    username: string;
    profile_image_uri: string;
    content: string;
    user_id: number;
  }[];
  created_at: Date;
}[] = [
  {
    comment_id: BigInt(2343),
    content:
      "What a game of cricket, but India really deserved to win the game. ",
    created_at: new Date(),
    user_id: 2343,
    profile_image_uri:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
    username: "govind_rt",
    replies: [
      {
        content: "True mate!",
        user_id: 234343,
        username: "darshan",
        profile_image_uri:
          "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
        created_at: new Date(),
      },
      {
        content:
          "What a game of cricket, but India really deserved to win the game.What a game of cricket, but India really deserved to win the game.What a game of cricket, but India really deserved to win the game.What a game of cricket, but India really deserved to win the game.",
        user_id: 234343,
        username: "lastavijos",
        profile_image_uri:
          "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
        created_at: new Date(),
      },
    ],
  },
  {
    comment_id: BigInt(2343),
    content: "What a game of cricket",
    created_at: new Date(),
    user_id: 2343,
    profile_image_uri:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
    username: "govind_rt",
    replies: [
      {
        content: "True mate!",
        user_id: 234343,
        username: "darshan",
        profile_image_uri:
          "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
        created_at: new Date(),
      },
      {
        content: "Not so good too, fixed I think",
        user_id: 234343,
        username: "lastavijos",
        profile_image_uri:
          "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
        created_at: new Date(),
      },
      {
        content: "Sad my team lost... 🥺",
        user_id: 234343,
        username: "parthiv_bad_boy",
        profile_image_uri:
          "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
        created_at: new Date(),
      },
    ],
  },
  {
    comment_id: BigInt(2343),
    content: "What a game of cricket",
    created_at: new Date(),
    user_id: 2343,
    profile_image_uri:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
    username: "govind_rt",
    replies: [],
  },
  {
    comment_id: BigInt(2343),
    content: "What a game of cricket",
    created_at: new Date(),
    user_id: 2343,
    profile_image_uri:
      "https://scontent.fwgc2-1.fna.fbcdn.net/v/t1.6435-1/50160298_1855090944602683_9164122129782800384_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=mWfARnjdYucAX9u_uVQ&tn=MfzLa8RPDCa4gO1X&_nc_ht=scontent.fwgc2-1.fna&oh=00_AT_-yIEv2uuAUzCKYcZdn2CnNmmZ45X_4S1qw3GDVlwOyQ&oe=635ADC0C",
    username: "govind_rt",
    replies: [],
  },
];
