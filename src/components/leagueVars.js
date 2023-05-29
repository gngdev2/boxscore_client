import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const leagueVars = {
    global: {
        categories: _ => ['team', 'period_scores', 'totals', 'league'],
        getGameStartTime: time => dayjs(time).utc().local().format('MMM DD h:mmA'),
    },
    NBA: {
        league: 'NBA',
        categories: _ => [...leagueVars.global.categories(),],
        units: 4,
        results: {
            header: _ => {
                return <>
                    <span>T</span>
                </>;
            },
            score: segment => {
                return <>
                    <span>{segment.totals?.points}</span>
                </>
            },
        },
        getPeriodOutput: (startTime, status) => {
            if (!startTime) return null;

            let output = <>Tipoff<br/>{leagueVars.global.getGameStartTime(startTime)}</>;

            if (status === 'completed') {
                output = 'Final';
            } else if (dayjs().isAfter(startTime)) {
                // we don't have this information, so we'll just use a placeholder
                // also, tipoffs are almost always late, so this check wouldn't really work
                output = <>12:00<br />1st qtr</>
            }

            return <strong>{output}</strong>
        },
    },
    MLB: {
        league: 'MLB',
        categories: _ => [...leagueVars.global.categories(), 'batter_totals', 'pitchers', 'errors',],
        units: 9,
        results: {
            header: _ => {
                return <>
                    <span>R</span>
                    <span>H</span>
                    <span>E</span>
                </>;
            },
            score: segment => {
                return <>
                    <span>{segment.batter_totals?.runs}</span>
                    <span>{segment.batter_totals?.hits}</span>
                    <span>{segment.errors}</span>
                </>
            },
        },
        getPeriodOutput: (startTime, status) => {
            if (!startTime) return null;

            let output = <>Begins<br/>{leagueVars.global.getGameStartTime(startTime)}</>;

            if (status === 'completed') {
                output = 'Final';
            } else if (dayjs().isAfter(startTime)) {
                // we don't have this information, so we'll just use a placeholder
                output = <>Btm<br />9th</>
            }

            return <strong>{output}</strong>
        },
    }
}

export default leagueVars;