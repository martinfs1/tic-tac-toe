console.log('Tic Tac Toe');

const Gameboard = (() => {
  const board = Array(9);

  const renderBoard = () => {
    const boardDiv = document.querySelector('.board');
    board.forEach(() => {
      const cell = document.createElement('button');
      boardDiv.appendChild(cell);
      cell.dataset.id = '1';
    });
  };
  const setCell = () => {

  };
  const getBoard = () => board;
  return { getBoard, renderBoard, setCell };
})();

const PlayerFactory = (name, mark) => {
  const sayHello = () => console.log(`Hello ${name} ${mark}`);
  return { name, mark, sayHello };
};

const FlowGame = (() => {
  const playerTurnDiv = document.querySelector('.turn');
  const board = Gameboard;

  const playerOne = PlayerFactory('Lauri', 'X');
  const playerTwo = PlayerFactory('Cristian', 'O');

  playerTurnDiv.textContent = playerOne.name || playerTwo.name;
  console.log(playerOne, playerTwo);

  return {
    playerOne,
    playerTwo,
    getBoard: board.getBoard,
  };
})();

const DisplayController = (() => {
  const game = FlowGame;
  const renderBoard = Gameboard.renderBoard();

  return { game, renderBoard };
})();
