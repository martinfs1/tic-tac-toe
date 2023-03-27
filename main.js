
const PlayerFactory = (name, mark) => ({ name, mark });

const Gameboard = (() => {
  const board = Array(9).fill(null);
  let boardDiv;
  let mark;
  let values = [];
  let valueXIndexs = [];
  let valueOIndexs = [];
  let symbolState = 'X';

  const showWinner = document.getElementById('winner')


  const changeState = () => {
    symbolState = (symbolState === 'X') ? 'O' : 'X';
  };

  const resetBoard = () => {
    symbolState = 'X';
    showWinner.innerHTML = ''
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
      cell.setAttribute('style', 'cursor:pointer;')
      boardDiv.appendChild(cell);
      cell.dataset.mark = `${index}`;
    });
  };

  const start = () => {
    let namePlayerX = document.getElementById('player-X')
    let namePlayerO = document.getElementById('player-O')

    const playerX = PlayerFactory(namePlayerX.value, 'X',)
    const playerO = PlayerFactory(namePlayerO.value, 'O',)

    let toShowNamePlayerX = document.getElementById('plyrX')
    let toShowNamePlayerO = document.getElementById('plyrO')

    toShowNamePlayerX.innerHTML = `Player X: ${playerX.name}`;
    toShowNamePlayerO.innerHTML = `Player O: ${playerO.name}`;

    namePlayerX.value = ''
    namePlayerO.value = ''
    showWinner.innerHTML = ''
    resetBoard()
    return { playerO, playerX }
  }
  // I need to solve how to use the players objects in the checkforwin function.
  const checkForWin = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    valueXIndexs = board.map((element, index) => ((element === 'X') ? index : null));
    for (const combo of winningCombos) {
      if (combo.every((i) => valueXIndexs.includes(i))) {
        return `X`;
      }
    }
    valueOIndexs = board.map((element, index) => ((element === 'O') ? index : null));
    for (const combo of winningCombos) {
      if (combo.every((i) => valueOIndexs.includes(i))) {
        return `O`;
      }
    }
    return null;
  };

  const setCell = () => {
    document.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.matches('#cellBtn')) {
        mark = event.target;
        const markValue = Number(mark.dataset.mark);
        board.forEach((element, index) => {
          if (markValue === index && (mark.innerHTML === '')) {
            board[index] = `${symbolState}`;
            mark.innerHTML = board[index];
            values.push(board[index]);
            changeState();
            if (values.length >= 5) {
              const winner = checkForWin();
              if (winner === 'X') {
                showWinner.innerHTML = `The winner is ${winner}`
                console.log(`The winner is ${winner}`);
              } else if (winner === 'O') {
                showWinner.innerHTML = `El ganador is ${winner}`
                console.log(`The winner is ${winner}`);
              } else if (values.length === 9) {
                showWinner.innerHTML = `There is a tie.`
                console.log(`There is a tie.`);
              }
            }
          }
        });
      } else if (event.target.matches('#rstBtn')) {
        resetBoard();
      } else if (event.target.matches('#start-btn')) {
        start()
      }
    });
  };

  const getBoard = () => board;
  return {
    getBoard, renderBoard, setCell, resetBoard, start, checkForWin
  };
})();


const FlowGame = (() => {
  const playerTurnDiv = document.querySelector('.turn');
  const start = Gameboard.start()
  const board = Gameboard;
  const setCell = Gameboard.setCell();



  const checkForWin = Gameboard.checkForWin()

  return {

  };
})();

const DisplayController = (() => {
  const renderBoard = Gameboard.renderBoard();
  return {};
})();
