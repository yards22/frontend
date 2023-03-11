import { Observer } from 'mobx-react-lite'
import React from 'react'
import { useStores } from '../../../../Logic/Providers/StoresProviders'
import CurrentStatsCard from './CurrentStatsCard'

function CurrentStatsIndex() {
    const stores = useStores()
    const {instantMatchStore} = stores
    const {currentInstantMatch} = instantMatchStore

    function firstInningsTeamStats(){
        let score = currentInstantMatch.innings_one.score
        let wickets = currentInstantMatch.innings_one.wickets
        let run_rate = currentInstantMatch.innings_one.run_rate
        let overs = currentInstantMatch.current_innings === 1 ? currentInstantMatch.overs : 20
        let balls = currentInstantMatch.current_innings === 1 ? currentInstantMatch.balls : 0
        let teamName =  currentInstantMatch.batting_order[0] 
        let innings = currentInstantMatch.current_innings
        return {
            score,
            wickets,
            run_rate,
            overs,
            balls,
            teamName,
            innings
        }
    }

    function secondInningsTeamStats(){
        let score = currentInstantMatch.innings_two.score
        let wickets = currentInstantMatch.innings_two.wickets
        let run_rate = currentInstantMatch.innings_two.run_rate
        let overs =  currentInstantMatch.overs 
        let balls = currentInstantMatch.balls
        let teamName =  currentInstantMatch.batting_order[1]
        let innings = currentInstantMatch.current_innings
        return {
            score,
            wickets,
            run_rate,
            overs,
            balls,
            teamName,
            innings
        }
    }
    return (
        <Observer>
            {()=>{
                
                return(
                    <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <CurrentStatsCard 
                            {...firstInningsTeamStats()}
                        />
                        {
                            currentInstantMatch.current_innings === 2 && 
                            <CurrentStatsCard
                                {...secondInningsTeamStats()}
                            />

                        }
                    </div>
                )
            }

            }
        </Observer>

    )
}

export default CurrentStatsIndex