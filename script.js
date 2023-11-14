let size = 50;
let htmlElements;
let cells;
let EMPTY = 0;
let ALIVE = 1;

// Créer la grille initiale
function createField() {
  htmlElements = [];
  cells = [];

  let table = document.getElementById('field');
  for (let y = 0; y < size; y++) {
    let tr = document.createElement('tr');
    let tdElements = [];
    cells.push(new Array(size).fill(EMPTY));
    htmlElements.push(tdElements);
    table.appendChild(tr);

    for (let x = 0; x < size; x++) {
      let td = document.createElement('td');
      tdElements.push(td);
      tr.appendChild(td);
    }
  }
}

// Mettre à jour l'affichage de la grille
function draw() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'));
    }
  }
}

// Compter le nombre de voisins vivants d'une cellule
function countNeibhours(x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      let nx = (x + dx + size) % size, ny = (y + dy + size) % size;
      count = count + cells[ny][nx];
    }
  }
  return count - cells[y][x];
}

// Calculer une nouvelle génération en fonction des règles du jeu
function newGeneration() {
  let newCells = [];
  for (let i = 0; i < size; i++) {
    newCells.push(new Array(size).fill(EMPTY));
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let neibhours = countNeibhours(x, y);

      if (cells[y][x] == EMPTY && neibhours == 3) {
        newCells[y][x] = ALIVE;
      }
      if (cells[y][x] == ALIVE && (neibhours == 2 || neibhours == 3)) {
        newCells[y][x] = ALIVE;
      }
    }
  }

  cells = newCells;
  draw();
}

// Initialiser le jeu
function init() {
  createField();

  // Placer aléatoirement 30% de cellules vivantes
  for (let i = 0; i < Math.floor(size * size * 0.3); i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
      if (cells[y][x] == EMPTY) {
        cells[y][x] = ALIVE;
        break;
      }
    } while (true);
  }

  draw();

  // Lancer la boucle de génération automatique à intervalle régulier
  setInterval(newGeneration, 100);
}

// Appeler la fonction d'initialisation
init();
