import { useState, useEffect } from 'react';
import { Session } from '@heroiclabs/nakama-js';
import { NavLink, Link, useSearchParams, Form } from 'react-router-dom';
import logo from './logo.svg';
import {
    //saveSessionToStorage,
    getSessionFromStorage,
    //removeSessionFromStorage
} from './utils/nakamaHelpers';


export function Header() {
    const [searchParams] = useSearchParams();
    const [sessionLocal, setSessionLocal] = useState<Session | null>(null);

    useEffect(() => {
        // On component mount, try to get the session from local storage
        const storedSession = getSessionFromStorage();
        if (storedSession) {
            setSessionLocal(JSON.parse(storedSession));
        }
    }, []);


    return (
        <header className="text-center text-slate-50 bg-slate-900 h-40 p-5">
            <Form className="relative text-right" action="/products">
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    defaultValue={searchParams.get('search') ?? ''}
                    className="absolute right-0 top-0 rounded py-2 px-3 text-gray-700"
                />
            </Form>

            <Link to="">
                <img src={logo} alt="Logo" className="inline-block h-20" />
            </Link>
            <Link to="">
                <h1 className="text-2xl">React Tools</h1>
            </Link>
            <nav>
                <NavLink
                    to="game/ttt-stars"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    TttStars
                </NavLink>
                <NavLink
                    to="game/tictactoe"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    TicTacToe
                </NavLink>
                <NavLink
                    to="products"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    Products
                </NavLink>
                <NavLink
                    to="admin"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    Admin
                </NavLink>
                <NavLink
                    to="match/create"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    create
                </NavLink>
                <NavLink
                    to="match/list"
                    className={({ isActive }) =>
                        `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                        }`
                    }
                >
                    list
                </NavLink>

                {sessionLocal ? (
                    <NavLink
                        to="user/profile"
                        className={({ isActive }) =>
                            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                            }`
                        }
                    >
                        {sessionLocal?.username}
                    </NavLink>
                ) : (
                    <NavLink
                        to="user/login"
                        className={({ isActive }) =>
                            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${isActive ? 'border-white' : 'border-transparent'
                            }`
                        }
                    >
                        Войти
                    </NavLink>
                )}



            </nav>
        </header>
    );
}