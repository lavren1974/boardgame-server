import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Profile from './components/user/Profile';
import Inbox from './components/user/Inbox';
import { MatchCreate } from './components/matches/MatchCreate';
import { MatchList } from './components/matches/MatchList';
import { MatchJoin } from './components/matches/MatchJoin';
import TicTacToe from './components/tictactoe/TicTacToe';
import TttStars from './components/ttt-stars/TttStars';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <ProductsPage />,
            },
            {
                path: 'products/:id',
                element: <ProductPage />,
            },
            {
                path: 'user/signup',
                element: <Signup />,
            },
            {
                path: 'user/login',
                element: <Login />,
            },
            {
                path: 'user/profile',
                element: <Profile />,
            },
            {
                path: 'user/inbox',
                element: <Inbox />,
            },
            {
                path: 'match/create',
                element: <MatchCreate />,
            },
            {
                path: 'match/list',
                element: <MatchList />,
            },
            {
                path: 'match/join/:id',
                element: <MatchJoin />,
            },
            {
                path: 'game/tictactoe',
                element: <TicTacToe />,
            },
            {
                path: 'game/ttt-stars',
                element: <TttStars />,
            },


            {
                path: 'admin',
                element: (
                    <Suspense
                        fallback={<div className="text-center p-5 text-xl text-slate-900">Loading...</div>}
                    >
                        <AdminPage />
                    </Suspense>
                ),
            },
        ],
    },
]);

export function Routes() {
    return <RouterProvider router={router} />;
}