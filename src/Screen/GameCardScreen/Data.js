
const date= new Date()

const games=[

    {
        id:1,
        team_1: "Team A",
        team_2: "Team B",
        status : "Game over",
        winningTeam :"Team A",
        losingTeam :"Team B",
        team_1_score : 100,
        team_1_wickets : 7,  
        team_2_score : 50,
        team_2_wickets : 10,
        date : date.toString()

    },   {
        id:2,
        team_1: "Team C",
        team_2: "Team D",
        status : "Game over",
        winningTeam :"Team C",
        losingTeam :"Team D",
        team_1_score : 101,
        team_1_wickets : 6,  
        team_2_score : 51,
        team_2_wickets : 9,
        date : date.toString()

    },   {
        id:3,
        team_1: "Team A",
        team_2: "Team C",
        status : "Game over",
        winningTeam :"Team C",
        losingTeam :"Team A",
        team_1_score : 105,
        team_1_wickets : 5,  
        team_2_score : 52,
        team_2_wickets : 8,
        date : date.setDate(date.getDate()-1).toString()

    },   {
        id:4,
        team_1: "Team A",
        team_2: "Team B",
        status : "On Going",
        winningTeam :" ",
        losingTeam :" ",
        team_1_score : 108,
        team_1_wickets : 4,  
        team_2_score : 52,
        team_2_wickets : 11,
        date : date.setDate(date.getDate()-1).toString()
    },

]
export const summary={
    batsman:{
        A:{
            name:"AB",
  runs:33,
  balls:16,
  fours:3,
  sixes:2,
  strike_rate:206.25,
  is_strike:true
 },
        B:{
            name:"CD",
            runs:19,
  balls:16,
  fours:1,
  sixes:0,
  strike_rate:101.11,
  is_strike:false
        }
      },
      bowler:{
        A:{
            name:"EF",
            overs:2.2,
  balls:16,
  maiden:0,
  runs:29,
  wicket:2,
  nb:1,
  wd:1,
  economy:12.11,
  is_cur_bowler:true
        },
        B:{
            name:"GH",
            overs:2.5,
            balls:17,
            maiden:0,
            runs:29,
            wicket:2,
            nb:1,
            wd:1,
            economy:12.11,
            is_cur_bowler:false
        }
      },
      previous_balls: [1, 1, 1 ,1 ,1 ,1,-1 , 1,1,1,1 ,1 ,1, -1 ,1,1,1]


}