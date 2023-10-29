import { useState, useEffect } from 'react';
import { Client, Session } from '@heroiclabs/nakama-js';
import { Link } from "react-router-dom";
// import { redirectDocument } from "react-router-dom";

import {
    saveSessionToStorage,
    // getSessionFromStorage,
    //removeSessionFromStorage
} from '../../utils/nakamaHelpers';

export default function Login() {

    // const navigate = useNavigate();
    // const [sessionLocal, setSessionLocal] = useState<Session | null>(null);
    //const [login, setLogin] = useState<string | undefined>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        // On component mount, try to get the session from local storage
        // const storedSession = getSessionFromStorage();
        // if (storedSession) {
        //     setSessionLocal(JSON.parse(storedSession));
        //     //window.location.replace('/');

        //     // navigate('/');
        // }
        // if (sessionLocal !== null) {

        //     console.log(sessionLocal);
        //     window.location.replace('/');

        //     //navigate('/');
        // }

    }, []);

    const handleLogin = async () => {



        let useSSL = false; // Enable if server is run with an SSL certificate.
        const client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
        //const client = new Client('http', 'localhost', '7350', 'defaultkey');
        //const socket = new DefaultSocket(5000, 5000, false);
        //client.useSocket(socket);

        try {
            // let create = false;
            const session: Session = await client.authenticateEmail(email, password);
            // console.error('Login session: ', session);
            // setSessionLocal(session);
            saveSessionToStorage(JSON.stringify(session));
            // console.log('Logged in successfully:', session);

            // setLogin(session.username);
            // setUserId(session.user_id);
            // setToken(session.token);
            // Navigate to another component or save session as required. 
            // setFormTrue(false);

            //navigate('/');
            window.location.replace('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (

        <div>
            {/* {sessionLocal ? (
                 <Navigate to="/" replace={false} />
               
            ) : ( */}

            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Войти</h2>
                        {/* <p className="mt-2 text-center text-sm text-gray-600">
    Or{' '}
    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
      start your 14-day free trial
    </a>
  </p> */}
                    </div>
                    {/* <form className="mt-8 space-y-6"> */}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                //value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block
        w-full px-3 py-2 border border-gray-300
        placeholder-gray-500 text-gray-900 rounded-t-md
        focus:outline-none focus:ring-indigo-500
        focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                //value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block
        w-full px-3 py-2 border border-gray-300
        placeholder-gray-500 text-gray-900 rounded-b-md
        focus:outline-none focus:ring-indigo-500
        focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500
        border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {/* <div className="text-sm">
      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
        Forgot your password?
      </a>
    </div> */}
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="group relative w-full flex justify-center
      py-2 px-4 border border-transparent text-sm font-medium
      rounded-md text-white bg-indigo-600 hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            </span>
                            Отправить
                        </button>

                        <Link to="/user/signup">
                            <h1 className="font-medium text-indigo-600 hover:text-indigo-500">Не зарегистрированы?</h1>
                        </Link>
                    </div>
                    {/* </form> */}
                </div>
            </div>
            {/* )} */}

        </div>

    );
}