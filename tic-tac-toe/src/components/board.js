import Square from "./square"
import {useState} from 'react'

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isXNext, setXNext] = useState(true)

    const calculateWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
        for(let i = 0 ; i < lines.length; i++){
            const [a, b, c] = lines[i]
            if(squares[a] && squares[b] && squares[c] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
        }
        return null
    }

    const handleClick = (e, index) => {
        e.preventDefault()
        if(squares[index] || calculateWinner()) return
        const newSquares = squares.slice()
        newSquares[index] = isXNext ? 'X' : 'O'
        // console.log(newSquares[index])
        setSquares(newSquares)
        setXNext(!isXNext)
    }

    console.log(squares)
    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={(e) => handleClick(e, 0)}/>
                <Square value={squares[1]} onSquareClick={(e) => handleClick(e, 1)}/>
                <Square value={squares[2]} onSquareClick={(e) => handleClick(e, 2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={(e) => handleClick(e, 3)}/>
                <Square value={squares[4]} onSquareClick={(e) => handleClick(e, 4)}/>
                <Square value={squares[5]} onSquareClick={(e) => handleClick(e, 5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={(e) => handleClick(e, 6)}/>
                <Square value={squares[7]} onSquareClick={(e) => handleClick(e, 7)}/>
                <Square value={squares[8]} onSquareClick={(e) => handleClick(e, 8)}/>
            </div>
        </>
    )
}
export default Board