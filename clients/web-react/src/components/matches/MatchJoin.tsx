import { useEffect, useRef, useState } from "react";
import { Client, Session } from '@heroiclabs/nakama-js';
// import { ApiAccount } from "@heroiclabs/nakama-js/dist/api.gen";
import { useSearchParams, useParams } from 'react-router-dom';

import "tailwindcss/tailwind.css";
import {
    //saveSessionToStorage,
    getSessionFromStorage,
    removeSessionFromStorage
} from '../../utils/nakamaHelpers';

export function MatchJoin() {

    const params = useParams();

    console.log(params);

    const dataFetchedRef = useRef(false);

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

            matchJoin(new_session, params.id!);
        }

    }, []);

    async function matchJoin(my_session: Session, match_id:string) {

        let useSSL = false; // Enable if server is run with an SSL certificate.
        let client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);


        const socket = client.createSocket();

        let appearOnline = true;
        await socket.connect(my_session, appearOnline);
        let match = await socket.joinMatch(match_id);
        console.log(match);

    }

    return (
        <div className="text-center p-5 text-xl">
            <h1 className="text-xl text-slate-900">MatchJoin!</h1>
        </div>
    );
}