export interface MInstantMatch{
    matchId : number,
    created_by: string,
    currentInnings : number,
    hostTeam ?: string,
    visitorTeam ?: string,
    tossWonTeam ?: string,
    noOfOvers ?:string,
    teamOptedTo ?: string,
    battingOrder ?:string[],
    currentBatingTeam ?:string,
    currentBowlingTeam ?:string,
    strikerBatsman : MBatsman,
    nonStrikerBatsman : MBatsman,
    currentBowler : MBowler,
    hostTeamBatsMan ?: MBatsman[],
    hostTeamBowlers ? : MBowler[],
    visitorTeamBatsMan ?: MBatsman[],
    visitorTeamBowlers ?: MBowler[],
    events : string[],
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

export interface MTeam{
    teamName : string,
    runs : number,
    wickets : number,
    batsMen : MBatsman[],
    bowler : MBowler[],
    extras : MExtras,
}

export interface MExtras{
    total : number,
    Nb : number,
    W : number,
    B : number,
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

export interface MCreatingTheMatchArgs{
    currentInnings : number,
    hostTeam : string,
    visitorTeam : string,
    tossWonTeam : string,
    noOfOvers :string,
    teamOptedTo : string,
    battingOrder :string[],
    currentBatingTeam :string,
    currentBowlingTeam :string,
    strikerBatsman : MBatsman,
    nonStrikerBatsman : MBatsman,
    currentBowler : MBowler,
    events : string[]
}