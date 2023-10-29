import { useState, useRef, useEffect } from 'react';
import Square from './Square';
import { Client, Session, Socket } from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from "uuid";

export default function Board() {

    const [squares, setSquares] = useState<(number | null)[]>(Array(25).fill(null));
    const [getUserColor, setUserColor] = useState<number>(-1);
    const [getUserMove, setUserMove] = useState<number>(-1);
    const [getClient, setClient] = useState<Client | undefined>(undefined);
    const [getSession, setSession] = useState<Session | undefined>(undefined);
    const [getSocket, setSocket] = useState<Socket | undefined>(undefined);
    const [getMatchID, setMatchID] = useState<string | undefined>(undefined);

    const dataFetchedRef = useRef(false);
    useEffect(() => {

        // Чтобы отключить повторный рендеринг при монтировании
        // https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const authenticate = async () => {
            let useSSL = false; // Enable if server is run with an SSL certificate.
            const client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
            // this.client = new Client("defaultkey", "localhost", "7350");
            // this.client.ssl = false;
            setClient(client);

            let deviceId = localStorage.getItem("deviceId");
            if (!deviceId) {
                deviceId = uuidv4();
                localStorage.setItem("deviceId", deviceId);
            }
            //const session = await client.authenticateDevice(deviceId, create, "mycustomusername");
            const session: Session = await client.authenticateDevice(deviceId, true);
            setSession(session);
            console.log("authenticate()");
            localStorage.setItem("user_id", session.user_id!);

            const trace = false;
            const socket: Socket = client.createSocket(useSSL, trace);
            setSocket(socket);
            await socket.connect(session, true);
        }
        authenticate();

    }, []);



    const findMatch = async () => {

        console.log("const findMatch");
        //console.log("squares: ", squares);


        const rpcid = "find_match";
        const matches = await getClient!.rpc(getSession!, rpcid, {});
        //console.log(matches);


        if (typeof matches === "object" && matches !== null) {
            const safeParsedJson = matches as {
                payload: {
                    matchIds: string[],
                    // height: string,
                    // weight: string,
                    // image: string,
                }

            };
            // console.log(safeParsedJson.payload.name);
            // console.log(safeParsedJson.payload.height);
            // console.log(safeParsedJson.payload.weight);

            //console.log(safeParsedJson.payload.matchIds[0]);
            setMatchID(safeParsedJson.payload.matchIds[0]);
            //console.log(getMatchID);

            //this.matchID = safeParsedJson.payload.matchIds[0];

            await getSocket!.joinMatch(safeParsedJson.payload.matchIds[0]);
            console.log("Match joined!");

            //console.log(this.socket!.onmatchdata);
        }




        let userId = localStorage.getItem("user_id");
        console.log("userId localStorage: ", userId);

        getSocket!.onmatchdata = (result) => {
            const json_string = new TextDecoder().decode(result.data)
            const json: string = json_string ? JSON.parse(json_string) : ""
            //console.log(result.data);
            //console.log(result.op_code);

            if (typeof json === "object" && json !== null) {


                if (result.op_code === 1) {
                    console.log("START");
                    //console.log(json);

                    const safeParsedJson = json as {
                        //payload: {
                        board: number[],
                        deadline: number,
                        mark: number,
                        marks: { [key: string]: number },
                        // }

                    };

                    setSquares(safeParsedJson.board);

                    //console.log(json);

                    //console.log("safeParsedJson.mark: ", safeParsedJson.mark);
                    console.log("safeParsedJson.board: ", safeParsedJson.board);
                    //console.log("safeParsedJson.marks: ", safeParsedJson.marks);
                    //console.log(safeParsedJson.marks[1]);

                    setUserMove(safeParsedJson.mark);

                    if (safeParsedJson.marks[userId!] === 1) {
                        setUserColor(1)
                        // console.log("safeParsedJson.marks[userId!]: ", 1);

                    } else {
                        setUserColor(0)
                        // console.log("safeParsedJson.marks[userId!]: ", 0);
                    }
                    // }
                } else if (result.op_code === 2) {
                    console.log("result.op_code: ", 2);
                    //console.log(json);

                    const safeParsedJson = json as {
                        //payload: {
                        board: number[],
                        deadline: number,
                        mark: number,
                        // marks: { [key: string]: number },
                        // }

                    };
                    //console.log(json);
                    //console.log("safeParsedJson.mark: ", safeParsedJson.mark);
                    console.log("safeParsedJson.board: ", safeParsedJson.board);
                    // console.log("safeParsedJson.marks: ", safeParsedJson.marks);
                    setUserMove(safeParsedJson.mark);
                    setSquares(safeParsedJson.board);

                } else if (result.op_code === 3) {
                    console.log("result.op_code: ", 3);
                    //console.log(json);

                    const safeParsedJson = json as {
                        //payload: {
                        board: number[],
                        nextGameStart: number,
                        winner: number,
                        winnerPositions: number[],
                        // }

                    };

                    //console.log(safeParsedJson.winnerPositions);
                    console.log("safeParsedJson.board: ", safeParsedJson.winnerPositions);
                    setSquares(safeParsedJson.board);
                    setUserMove(-1);

                } else if (result.op_code === 4) {
                    console.log("result.op_code: ", 4);
                } else if (result.op_code === 5) {
                    console.log("result.op_code: ", 5);
                }


            }
        };


    }



    const makeMove = async (index: number) => {
        console.log("const makeMove");
        const data = { "position": index };
        await getSocket!.sendMatchState(getMatchID!, 4, JSON.stringify(data));
        //console.log("Match data sent");
    }

    function handleClick(i: number) {
        console.log("handleClick");


        if (getUserMove === getUserColor && squares[i] === null) {

            console.log("handleClick ES");
            const nextSquares = squares.slice();

            nextSquares[i] = getUserColor;
            setSquares(nextSquares);
            makeMove(i);
            console.log("handleClick squares: ", squares);
            // console.log("getUserColor: ", getUserColor);
        } else {
            console.log("handleClick NONE");
        }


    }


    function BeginClick() {
        console.log("BeginClick");
        findMatch();
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            </div>
            <div className="board-row">

                
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
            </div>
            <div className="board-row">
               
                <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
                <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
                <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
                <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
                <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
            </div>
            <div className="board-row">
                
                <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
                <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
                <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
                <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
                <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
            </div>
            <div className="board-row">
                
                <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
                <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
                <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
                <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
                <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
            </div>
            <div className="board-row">
                <div><button className="button-send" onClick={BeginClick}>Вход</button></div>
            </div>
            <hr></hr>
            <div className="board-row">
                <h3 className="game-info">Мой цвет: {getUserColor} </h3>
                <h3 className="game-info">Чей ход?: {getUserMove} </h3>
            </div>
        </>
    );
}