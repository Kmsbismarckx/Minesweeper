function gameStart(size, bombsCount) {
  const field = document.querySelector('.field');
  const cellsCount = Math.pow(size, 2);

  field.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children]

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombsCount);

  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const index = cells.indexOf(event.target);
    const column = index % size;
    const row = Math.floor(index / size);
    open(row, column)
  });

function open(row, column) {
  const index = row * size + column;
  const cell = cells[index];
  cell.innerHTML = isBomb(row, column) ? 'X' : bombsCountHandler(row, column, index);
  cell.disabled = true;
  count = 0;
}
  let count = 0;

  function isBomb(row, column) {
    const index = row * size + column;
    if (bombs.includes(index)) {
      count++;
      console.log('Бомба тут - ' + index);
    }

    return bombs.includes(index)
  }

  function bombsCountHandler(row, column, index) {

    if (index === 0) {
      isBomb(row, column + 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column + 1);
    } else if (index === size - 1) {
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column - 1);
    } else if (index === size * size - size) {
      isBomb(row, column + 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column + 1);
    } else if (index === size * size - 1) {
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column - 1);
    } else if (index <= size * size - 1 && index >= size * size - size) {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column + 1);
      isBomb(row - 1, column - 1);
    } else if (index >= 0 && index <= size - 1) {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column + 1);
      isBomb(row + 1, column - 1);
    } else if (index % size === 0 || index === 0) {
      isBomb(row, column + 1);
      isBomb(row + 1, column);
      isBomb(row - 1, column);
      isBomb(row + 1, column + 1);
      isBomb(row - 1, column + 1);
    } else if (index === size - 1 || index % size - 1 === 0  ) {
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row - 1, column);
      isBomb(row - 1, column - 1);
      isBomb(row + 1, column - 1);
    } else {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row + 1, column);
      isBomb(row - 1, column - 1);
      isBomb(row + 1, column - 1);
      isBomb(row + 1, column + 1);
      isBomb(row - 1, column + 1);
    }
    return count;
  }

}



function init(size, bombsCount) {
  gameStart(size, bombsCount);
}

init(10, 15)
