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
    batting_order :string[]
}

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
    batting_order :string[]
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


