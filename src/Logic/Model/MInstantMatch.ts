export interface MInstantMatch{
    matchId : number,
    created_by: string,
    currentInnings : number,
    hostTeam ?: string,
    visitorTeam ?: string,
    tossWonTeam ?: string,
    teamOptedTo ?: string,
    battingOrder ?:string[],
    currentBatingTeam ?:string,
    currentBowlingTeam ?:string,
    strikerBatsman ?: string,
    nonStrikerBatsman ?: string,
    currentBowler ?: string,
    hostTeamBatsMan ?: MBatsman[],
    hostTeamBowlers ? : MBowler[],
    visitorTeamBatsMan ?: MBatsman[],
    visitorTeamBowlers ?: MBowler[],
    events ?: string[],
}

export interface MBatsman{
    batsmanName : string,
    runsScored : number,
    ballsFaced : number,
    noOfFours : number,
    noOfSixes : number,
    gotOutByBowler ?: string,
    wayBatsmanGotOut ?:string,
    helpedPlayerForWicket ?:string,
    strikeRate : number,
    isStriker : boolean,
    isNonStriker : boolean
}

export interface MBowler{
    bowlerName : string,
    noOfOvers : number,
    noOfMaidenOvers : number,
    noOfRunsGiven : number,
    noOfWickets : number,
    economyRate : number,
    isCurrentBowler : boolean
}

export interface MSettingUpScoreCard{
    battingTeam : string,
    bowlingTeam : string,
    strikerBatsman : MBatsman,
    nonStrikerBatsman : MBatsman,
    currentBowler : MBowler 
}