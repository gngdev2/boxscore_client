import React, { useEffect, useState } from "react";
import GameStatsService from "../services/gameStats.service";
import "./boxscore.scss";

const Boxscore = ({leagueVars}) => {
    const [data, setData] = useState({});

    const getData = () => {
        GameStatsService.get(leagueVars.league)
            .then((res) => {
                const instance = res.data.instance;
                setData(formatData(instance, leagueVars.categories()));
            })
            .catch((err) => {
                console.error(err);
            });

        const formatData = (stats, categories) => {
            const data = [];
            ['home', 'away'].forEach(team => {
                data[team] = {};
                categories.forEach(category => {
                    const name = `${team}_${category}`;
                    if (stats.hasOwnProperty(name)) {
                        data[team][category] = stats[name];
                    }
                });
            });

            data.event_information = stats.event_information;
            data.league = stats.league;

            return data;
        }
    };

    useEffect(getData, [])

    const getTeamSummary = (type, team, league) => {
        return (
            <div className={`boxscore__details__team boxscore__details__team--${type} ${league?.toLowerCase()} ${team?.abbreviation.toLowerCase()}`}>
                <p>
                    <strong>{team?.last_name}</strong><small>{team?.abbreviation}</small>
                </p>
            </div>
        )
    }

    const unitArray = _ => [...Array(leagueVars.units).keys()];

    return (
        <>
            <div className="boxscore__team boxscore__team--header">
                <label></label>
                <div className="boxscore__team__units">
                    {unitArray().map(number => {
                        return <span key={`${number}`}>{number + 1}</span>
                    })}
                </div>
                <div className="boxscore__team__results">
                    {leagueVars.results.header()}
                </div>
            </div>

            {data.home && data.away && Object.entries({ away: data.away, home: data.home }).map(([team, segment]) => {
                return (
                    <div className={`boxscore__team boxscore__team--${team}`} key={team}>
                        <label>{segment.team?.abbreviation}</label>
                        <div className="boxscore__team__units">
                            {unitArray().map((score, i) => {
                                return (
                                    <span key={`score_${i}`}>{(segment.period_scores[i] ?? '-')}</span>
                                )
                            })}
                        </div>
                        <div className="boxscore__team__results">
                            {leagueVars.results.score(segment)}
                        </div>
                    </div>
                )
            })}

            <div className="boxscore__details">
                {getTeamSummary('away', data.away?.team, data.league)}
                <div className="boxscore__details__info">
                    {leagueVars.getPeriodOutput(data.event_information?.start_date_time, data.event_information?.status)}
                </div>
                {getTeamSummary('home', data.home?.team, data.league)}
            </div>
        </>
    )
}

export default Boxscore;