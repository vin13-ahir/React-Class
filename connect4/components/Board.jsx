import React, { useEffect, useState } from "react";
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState(Array.from({length:7}, () => Array(6).fill(null)));
    console.log(board);
    const [player, setPlayer] = useState('R');
    const [winningPlayer, setWinningPlayer] = useState(null);

    const handleClick = (row, col) => {
    if(board[row][col]) return;
        const newBoard =  board.map((r, i) => r.map((c, j) => (i === row && j === col ? player : c) ));
        setBoard(newBoard);
        setPlayer(player === 'R' ? 'Y' : 'R')
    }

     const restGamePlay = () => {
        setBoard(Array.from({length:7}, () => Array(6).fill(null)));
        setPlayer("R");
        setWinningPlayer(null);
    }

    const checkWinner = () => {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 6; c++) {
                if (board[r][c]) {
                    // Check horizontal
                    if (c + 3 < 6 &&
                        board[r][c] === board[r][c + 1] &&
                        board[r][c] === board[r][c + 2] &&
                        board[r][c] === board[r][c + 3]) {
                        return board[r][c];
                    }
                    // Check vertical
                    if (r + 3 < 7 &&
                        board[r][c] === board[r + 1][c] &&
                        board[r][c] === board[r + 2][c] &&
                        board[r][c] === board[r + 3][c]) {
                        return board[r][c];
                    }
                    // Check diagonal
                    if (r + 3 < 7 && c - 3 >= 0 &&
                        board[r][c] === board[r + 1][c - 1] &&
                        board[r][c] === board[r + 2][c - 2] &&
                        board[r][c] === board[r + 3][c - 3]) {
                        return board[r][c];
                    }
                    // Check diagonal
                    if (r - 3 >= 0 && c + 3 < 6 &&
                        board[r][c] === board[r - 1][c + 1] &&
                        board[r][c] === board[r - 2][c + 2] &&
                        board[r][c] === board[r - 3][c + 3]) {
                        return board[r][c];
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
            setBoard(Array.from({length:7}, () => Array(6).fill(null)));
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
                            onClick={() => handleClick(i, j)}>
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