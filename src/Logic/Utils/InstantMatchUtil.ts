import { MBatsmanInstantMatch, MBowlerInstantMatch } from "../Model/MInstantMatch";

export function createBatsManInstantMatch(name:string,striker:boolean,non_striker:boolean):MBatsmanInstantMatch{
    return {
        name,
        runs:0,
        balls:0,
        fours:0,
        sixes:0,
        striker,
        non_striker,
        strike_rate : 0
    };
}

export function createBowlerInstantMatch(name:string,isCurrentBowler:boolean):MBowlerInstantMatch{
    return{
        name,
        overs:0,
        balls:0,
        maiden:0,
        runs:0,
        wicket:0,
        economy :0
    }
}