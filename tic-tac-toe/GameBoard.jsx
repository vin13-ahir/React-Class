import { useEffect, useState, useRef } from "react";
import "./GameBoard.css";

const GameBoard = () => {
    const [board, setBoard] = useState(
        Array.from({length:3}, () => Array(3).fill(null))
    );
    console.log(board);
    const [player, setPlayer] = useState("X");
    const [winningPlayer, setWinningPlayer] = useState(null);
    const move = useRef(0);

    const handleClick = (row, col) => {
        if(board[row][col] || winningPlayer) return;
       const newBoard =  board.map((r, i) => 
        r.map((c, j) => (i === row && j === col ? player : c) ))
        setBoard(newBoard)
        setPlayer(player === "X" ? "O" : "X")
        move.current = move.current + 1;
        console.log("Total moves are: "+move.current);
    }

    const restGamePlay = () => {
        setBoard(Array.from({length:3}, () => Array(3).fill(null)));
        setPlayer("X");
        setWinningPlayer(null);
        move.current = 0;
    }

    const checkWinner = (arr) => {
        for(let i = 0; i < 3; i++)
        {
            if(arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2] && arr[i][2]){
                return arr[i][0];
            }
        }

        for(let j = 0; j < 3; j++)
        {
            if(arr[0][j] && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j] && arr[2][j]){
                return arr[0][j];
            }
        }

        if(arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && arr[2][2])
        {
            return arr[0][0];
        }

        if(arr[0][2] && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0] && arr[2][0])
        {
            return arr[0][2];
        }

    }

    const isDraw = move.current === 9 ? true : false;

    useEffect(() => setWinningPlayer(checkWinner(board)), [board]);

    return(  
        <>
        <div className="container">
           <div className="game-board-title">
                <h2>Tic Tac Toe Game</h2>
           </div>
           <div className="game-board-palyer-info">
                <h2>Current Player is: {player}</h2>
           </div>
           {
            winningPlayer ? ( <div className="game-player-winning-info">
                    <h2>Winner Player is: {winningPlayer}</h2>
           </div>) : isDraw ? ( <div className="game-player-winning-info">
                    <h2>It's a Draw !</h2>
           </div>) : null
           }
           <div className="game-board">
            {
                board.map((row, i) => row.map((cellvalue, j) => 
                    <div key={`${i}-${j}`} 
                className="cell"
                    onClick={() => handleClick(i, j)}
                    >{cellvalue}</div>
                ))
            }
           </div>
           <div className="reset-game">
                <button className="reset-btn"
                onClick={restGamePlay}
                >Reset Game</button>
           </div>
        </div>
        </>
    )
};


export default GameBoard;
