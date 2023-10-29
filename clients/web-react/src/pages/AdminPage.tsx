import { useEffect, useRef, useState } from "react";
import { Client, Session } from '@heroiclabs/nakama-js';

import {
    //saveSessionToStorage,
    getSessionFromStorage,
    //removeSessionFromStorage
} from '../utils/nakamaHelpers';

export default function AdminPage() {
    const dataFetchedRef = useRef(false);
    const [getImage, setImage] = useState<string | null>(null);

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

            adminPage(new_session);
        }

    }, []);

    async function adminPage(my_session: Session) {


        let useSSL = false; // Enable if server is run with an SSL certificate.
        let client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);


        const payload = { "PokemonName": "dragonite" };
        const rpcid = "get_pokemon";
        const pokemonInfo: unknown = await client.rpc(my_session, rpcid, payload);

        console.log("Retrieved pokemon info: %o", pokemonInfo);

        if (typeof pokemonInfo === "object" && pokemonInfo !== null) {
            const safeParsedJson = pokemonInfo as {
                payload: {
                    name: string,
                    height: string,
                    weight: string,
                    image: string,
                }

            };
            // console.log(safeParsedJson.payload.name);
            // console.log(safeParsedJson.payload.height);
            // console.log(safeParsedJson.payload.weight);
            // console.log(safeParsedJson.payload.image);
            
            setImage(safeParsedJson.payload.image);
        }

        //const parsedJson: unknown = JSON.parse(pokemonInfo);
        console.log("Retrieved pokemon info: %o", pokemonInfo);

    };

    return (
        <div className="text-center p-5 text-xl">
            <h1 className="text-xl text-slate-900">Admin Panel</h1>
            <p className="text-base text-slate-800">You shouldn't come here often because I'm lazy</p>

            {getImage ? (
                <img src={getImage} />

            ) : (
                <div></div>
            )}
        </div>
    );
}