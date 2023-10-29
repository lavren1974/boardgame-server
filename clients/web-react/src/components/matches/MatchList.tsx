import { useEffect, useRef, useState } from "react";
import { Client, Session } from '@heroiclabs/nakama-js';
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import {
    //saveSessionToStorage,
    getSessionFromStorage,
    removeSessionFromStorage
} from '../../utils/nakamaHelpers';


// interface Match {
//     matchId: string;
//     status: string;
// }


export function MatchList() {
    const dataFetchedRef = useRef(false);

    const [matchId, setMatchId] = useState<String[]>();

    useEffect(() => {

        // Чтобы отключить повторный рендеринг при монтировании
        // https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;


        // On component mount, try to get the session from local storage
        const storedSession = getSessionFromStorage();
        if (storedSession) {
            let get_session: Session = JSON.parse(storedSession);
            // setSessionLocal(get_session);
            let new_session = Session.restore(get_session.token, get_session.refresh_token);

            // const unixTimeInFuture = Date.now() + 8.64e+7; // one day from now

            // if (session2.isexpired(unixTimeInFuture / 1000)) {
            //     try
            //     {
            //         session2 = await client.sessionRefresh(session2);
            //     }
            //     catch (e)
            //     {
            //         console.info("Session can no longer be refreshed. Must reauthenticate!");
            //     }
            // }

            matchList(new_session);
        }

    }, []);

    async function matchList(my_session: Session) {

        let useSSL = false; // Enable if server is run with an SSL certificate.
        let client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

        let minPlayers = 1;
        let maxPlayers = 10;
        let limit = 10;
        let authoritative = false;
        let label = "";
        let query = "";
        //const result = await client.listMatches(my_session, limit, authoritative, label, minPlayers, maxPlayers, query);
        const result = await client.listMatches(my_session);

        //result.matches?.forEach

        // const data = result.matches?.values;
        // setMatchId(data);

        //const data = result.matches?.values;
        //setMatchId(result.matches?.values);

        const initialArray: string[] = [];

        result.matches?.forEach(function (m) {
            console.log("%o: %o/10 players", m.match_id, m.size);

            initialArray.push(m.match_id!);
            //setMatchId(match.match_id);
        });

        setMatchId(initialArray);
        // const socket = client.createSocket();

        // let appearOnline = true;
        // await socket.connect(my_session, appearOnline);
        // let match = await socket.createMatch();
        // console.log(match);

    };

    return (
        <div className="text-center p-5 text-xl">
            <h1 className="text-xl text-slate-900">MatchList!</h1>

            <div>

                {matchId === undefined ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {matchId.map((element, index) => (

                            <li key={index}>
                                <Link to={`/match/join/${element}`}>{element}</Link>
                            </li>
                        ))}
                    </ul>
                    


                )}
            </div>
        </div>
    );
}