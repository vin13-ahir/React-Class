import React, { useEffect, useState } from "react";
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState(Array.from({length:6}, () => Array(7).fill(null)));
    console.log(board);
    const [player, setPlayer] = useState('R');
    const [winningPlayer, setWinningPlayer] = useState(null);

    const handleClick = (col) => {
        console.log(col);
        for(let row = 5; row >= 0; row--) {
            if(!board[row][col]){
                const newBoard = board.map((r, i) => 
                r.map((c, j) => (i === row && j === col ? player : c) ));
                setBoard(newBoard);
                setPlayer(player === 'R' ? 'Y' : 'R');
                break;
            }
        }
    }

     const restGamePlay = () => {
        setBoard(Array.from({length:6}, () => Array(7).fill(null)));
        setPlayer("R");
        setWinningPlayer(null);
    }

    const checkWinner = () => {
       for (let r = 0; r < 5; r++) {
           for(let c = 0; c < 7; c++){
                const cell = board[r][c];
                if(cell && c + 3 < 7 &&
                cell === board[r][c+1] &&
                cell === board[r][c+2] &&
                cell === board[r][c+3]){
                    return cell;
                }
                if(cell && r + 3 < 6){
                    if(cell === board[r+1][c] &&
                    cell === board[r+2][c] &&
                    cell === board[r+3][c]){
                        return cell;
                    }
                }
                if(cell && r + 3 < 6 && c + 3 < 7){
                    if(cell === board[r+1][c+1] &&
                    cell === board[r+2][c+2] &&
                    cell === board[r+3][c+3]){
                        return cell;
                    }
                }
                if(cell && r - 3 >= 0 && c + 3 < 7){
                    if(cell === board[r-1][c+1] &&
                    cell === board[r-2][c+2] &&
                    cell === board[r-3][c+3]){
                        return cell;
                    }
                }
           }
        }
        return null;
    }

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            setWinningPlayer(winner);
            alert(`Player ${winner} wins!`);
            setBoard(Array.from({length:6}, () => Array(7).fill(null)));
            setPlayer('R');
            setWinningPlayer(null);
        }
    }, [board]);

    return(
        <div className="container">
            <div className="game-board-palyer-info">
                <h2>Current Player is: {player}</h2>
           </div>
            <div className="game-board">
                {
                    board.map((row, i) => {
                        return row.map((cell, j) => {
                            return <div key={`${i}-${j}`} className="cell"
                            onClick={() => handleClick(j)}>
                                {cell}
                            </div>
                        })
                    } )
                }
            </div>
             <div className="reset-game">
                <button className="reset-btn"
                onClick={restGamePlay}
                >Reset Game</button>
           </div>
        </div>
    )

    
}

export default Board;
