import { MBatsman, MBowler } from "../Model/MInstantMatch";

export function createBatsMan(batsmanName:string,isStriker:boolean,isNonStriker:boolean):MBatsman{
    return {
        batsmanName,
        isStriker,
        isNonStriker,
        noOfFours : 0,
        runsScored : 0,
        noOfSixes : 0,
        ballsFaced : 0,
        strikeRate : 0
    };
}

export function createBowler(bowlerName:string,isCurrentBowler:boolean):MBowler{
    return{
        bowlerName,
        noOfOvers:0,
        noOfMaidenOvers:0,
        noOfRunsGiven:0,
        noOfWickets:0,
        economyRate:0,
        isCurrentBowler
    }
}