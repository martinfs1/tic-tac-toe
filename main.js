let symbolState = 'X';

const changeState = () => {
  symbolState = (symbolState === 'X') ? 'O' : 'X';
};

// const PlayerFactory = (name, mark) => ({ name, mark });

const Gameboard = (() => {
  const board = Array(9).fill(null);
  let boardDiv;
  let mark;
  let values = [];
  let valueXIndexs = [];
  let valueOIndexs = [];

  const resetBoard = () => {
    symbolState = 'X';
    boardDiv = document.querySelectorAll('#cellBtn');
    boardDiv.forEach((cell) => {
      cell.innerHTML = '';
    });

    board.forEach((element, index) => {
      if (element) board[index] = null;
      values = [];
      valueXIndexs = [];
      valueOIndexs = [];
    });
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

  const checkForWin = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    valueXIndexs = board.map((element, index) => ((element === 'X') ? index : null));
    winningCombos.forEach((combo) => {
      if (combo.every((i) => valueXIndexs.includes(i))) {
        console.log('The winner is X ');
        alert('The winner is X ');
      }
    });
    valueOIndexs = board.map((element, index) => ((element === 'O') ? index : null));
    winningCombos.forEach((combo) => {
      if (combo.every((i) => valueOIndexs.includes(i))) {
        console.log('The winner is O ');
        alert('The winner is O');
      }
    });
  };

  const setCell = () => {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.matches('#cellBtn')) {
        mark = event.target;
        const markValue = Number(mark.dataset.mark);
        board.forEach((element, index) => {
          if (markValue === index) {
            board[index] = `${symbolState}`;
            mark.innerHTML = board[index];
            values.push(board[index]);
            changeState();
            if (values.length >= 5) checkForWin();
          }
        });
      } else if (event.target.matches('#rstBtn')) resetBoard();
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

  return {
    // playerOne,
    // playerTwo,
    // getBoard: board.getBoard,
    // setCell,
  };
})();

const DisplayController = (() => {
  const renderBoard = Gameboard.renderBoard();
  return {};
})();
