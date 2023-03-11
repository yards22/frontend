export interface MInstantMatch{
    match_id : number,
    owner_id:number,
    visitor_team:string,
    host_team:string,
    total_overs:number,
    venue:string,
    toss_details:{
        toss_won_by:string,
        opted_to:string
    },
    players_in_action:{
       bowler:MBowlerInstantMatch,
       striker_batsman:MBatsmanInstantMatch,
       non_striker_batsman:MBatsmanInstantMatch,
    }
    current_innings : number,
    batting_order :string[],
    innings_one : {
      score : number,
      wickets : number,
      run_rate : number,
    }
    innings_two : {
      score : number,
      wickets : number,
      run_rate : number,
    },
    overs : number,
    balls : number,
    current_over : number[]
}

export interface MBatsmanInstantMatch{
    name:string,
    runs:number,
    balls:number,
    fours:number,
    sixes:number,
    striker : boolean,
    non_striker : boolean,
    strike_rate : number,
}


export interface MBowlerInstantMatch{
    name :string,
    overs:number,
    balls:number,
    maiden:number,
    runs:number,
    wicket:number,
    economy : number,
}


export interface MScoreItem{
    match_id: string,
    owner_id:number,
    innings_details:{
        innings_id:number,
        overs:number,
        balls:number,
        batting_team:string,
        bowling_team:string,
      },
      players_in_action:{
        bowler:MBowlerInstantMatch,
        striker_batsman:MBatsmanInstantMatch,
        non_striker_batsman:MBatsmanInstantMatch, 
      },
      extra_details:{
        is_extra:boolean,
        extra_type?:string, 
      },
      runs_details:{
        runs_scored:number,
        is_boundary?:boolean,
        boundary_type?:string,
        scored_by:string,
        wagon_direction?:string,
       },
       wicket_details:{ 
        is_wicket:boolean,
        wicket_type?:string,
        wicket_of?:string,
        wicket_by?:string,
        is_fielder?:boolean,
        fielded_by?:string,
      },
      undo:boolean,
}

export interface MCreatingTheMatchArgs{
    owner_id:number,
    visitor_team:string,
    host_team:string,
    total_overs:number,
    venue:string,
    toss_details:{
        toss_won_by:string,
        opted_to:string
    },
    players_in_action:{
       bowler:MBowlerInstantMatch,
       striker_batsman:MBatsmanInstantMatch,
       non_striker_batsman:MBatsmanInstantMatch,
    }
    current_innings : number,
    batting_order :string[],
    innings_one : {
      score : number,
      wickets : number,
      run_rate : number,
    }
    innings_two : {
      score : number,
      wickets : number,
      run_rate : number,
    },
    overs : number,
    balls : number,
    current_over : number[]
}