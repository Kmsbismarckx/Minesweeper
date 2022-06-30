function gameStart(size, bombsCount) {
  const field = document.querySelector('.field');
  const cellsCount = Math.pow(size, 2);


  field.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children]

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombsCount);
  console.log(bombs);

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
  cell.innerHTML = isBomb(row, column) ? 'X' : ' ';
  cell.disabled = true;
}

  function isBomb(row, column) {
    const index = row * size + column;

    return bombs.includes(index)
  }
}

function init(size, bombsCount) {
  gameStart(size, bombsCount);
}

init(10, 15)
