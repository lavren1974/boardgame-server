import { useEffect, useRef, useState } from "react";
import { Client, Session } from '@heroiclabs/nakama-js';
// import { ApiAccount } from "@heroiclabs/nakama-js/dist/api.gen";
import "tailwindcss/tailwind.css";
import {
    //saveSessionToStorage,
    getSessionFromStorage,
    removeSessionFromStorage
} from '../../utils/nakamaHelpers';

export default function Profile() {

    const dataFetchedRef = useRef(false);
    // const [sessionLocal, setSessionLocal] = useState<Session | null>(null);
    const [login_id, setLoginId] = useState<string | undefined>('');
    const [login, setLogin] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');

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



            //console.log(ttt);
            getAccount(new_session);
        }



        //         let useSSL = false; // Enable if server is run with an SSL certificate.
        //         let client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
        //         let username = "lnn1974";
        //         let email = "lnn1974@gmail.com";
        //         let password = "12345678";
        //         let create = true;


        //         var account = await client.GetAccountAsync(session);
        // var user = account.User;
        // System.Console.WriteLine("User id '{0}' username '{1}'", user.Id, user.Username);
        // System.Console.WriteLine("User wallet: '{0}'", account.Wallet);
        //         //getAccount2(email, password, create, username);


    }, []);


    async function getAccount(my_session: Session) {

        let useSSL = false; // Enable if server is run with an SSL certificate.
        let client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
        // let session = await client.authenticateEmail(my_session.);
        // let account = await client.getAccount(my_session.token);
        //const sessionToken = localStorage.getItem("token");
        //console.log(my_session);
        const account = await client.getAccount(my_session);
        //console.log(account);


        // console.info(account.user?.id);
        // console.info(account.user?.username);
        // console.info(account.user?.display_name);
        // console.info(account.user?.online);
        // console.info(account.email);


        setLoginId(account.user?.id);
        setLogin(account.user?.username);
        setEmail(account.email);



        //const response = await client.rpc(my_session.token, "get_profile", {});

        //let session = await client.authenticateEmail(email, password, create, username);
        //let account = await client.getAccount(session);

        // const account = await client.getAccount(session);
        // console.log(account.user?.id);
        // console.log(account.user?.username);
        // console.log(account.wallet);



    };

    const handleLogout = () => {
        // setSessionLocal(null);
        removeSessionFromStorage();
        window.location.replace('/');
    };


    return (
        <div className="text-center p-5 text-xl">
            <h1 className="text-xl text-slate-900">Profile Panel</h1>
            <p className="text-base text-slate-800">{login_id}</p>
            <p className="text-base text-slate-800">{login}</p>
            <p className="text-base text-slate-800">{email}</p>
            <div>
                <button
                    type="submit"
                    onClick={handleLogout}
                    className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                >
                    Выход
                </button>
            </div>
        </div>
    );
}