const PlayerFactory = (name, mark) => ({ name, mark });

const Gameboard = (() => {
  const board = Array(9).fill(null);
  let boardDiv;
  let mark;

  const resetBoard = () => {
    boardDiv = document.querySelectorAll('#cellBtn');
    boardDiv.forEach((cell) => {
      cell.innerHTML = '';
    });

    board.forEach((element, index) => {
      if (element) {
        board[index] = null;
      }
    });
    console.log(board);
  };

  const renderBoard = () => {
    boardDiv = document.querySelector('#boardDiv');
    board.forEach((element, index) => {
      const cell = document.createElement('button');
      cell.setAttribute('id', 'cellBtn');
      boardDiv.appendChild(cell);
      cell.dataset.mark = `${index}`;
    });
  };

  const setCell = (markPlayer) => {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.matches('#cellBtn')) {
        mark = event.target;
        const markValue = Number(mark.dataset.mark);
        console.log(markValue);
        board.forEach((element, index) => {
          if (markValue === index) {
            board[index] = `${markPlayer}`;
            mark.innerHTML = board[index];
          }
        });
        console.log(board);
      } else if (event.target.matches('#rstBtn')) {
        resetBoard();
      }
    });
  };

  const getBoard = () => board;
  return {
    getBoard, renderBoard, setCell, resetBoard,
  };
})();

const FlowGame = (() => {
  const playerTurnDiv = document.querySelector('.turn');
  const board = Gameboard;
  const setCell = Gameboard.setCell();
  const playerOne = PlayerFactory('Lauri', 'X');
  const playerTwo = PlayerFactory('Cristian', 'O');

  playerTurnDiv.textContent = playerOne.name;

  return {
    playerOne,
    playerTwo,
    getBoard: board.getBoard,
    setCell,
  };
})();

const DisplayController = (() => {
  const renderBoard = Gameboard.renderBoard();
  return {};
})();
// I need to solve the problem of reset button and set the cell.
