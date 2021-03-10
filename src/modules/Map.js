import Cell from "./Cell";
import Player from "./Player";

export default class Map {
  constructor(lenX, lenY, key, exit, player) {
    this.lenX = lenX;
    this.lenY = lenY;
    this.field = [];
    this.key = key;
    this.exit = exit;
    this.player = player;

    this.board = document.createElement('div');
    this.app = document.querySelector('#app');
    this.app.insertAdjacentElement('afterbegin', this.board);

    window.addEventListener('keydown', this.handle.bind(this));
  }
  renderMap() {
    for (let i = 0; i < this.lenY; i++) {
      this.field.push([]);
      for (let j = 0; j < this.lenX; j++) {
        if ((i === 0 || i === this.lenY - 1) || (j === 0 || j === this.lenX - 1)) {
          this.field[i].push(new Cell('wall', j, i));
        } else if (i === this.key.y && j === this.key.x) {
          this.field[i].push(new Cell('key', j, i));
        } else if (i === this.exit.y && j === this.exit.x) {
          this.field[i].push(new Cell('exit', j, i));
        } else if (i === this.player.y && j === this.player.x) {
          this.field[i].push(new Player('player', j, i));
        } else {
          this.field[i].push(new Cell('empty', j, i));
        }
      }
    }
  }
  renderDOM() {
    for (let i = 0; i < this.field.length; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      this.board.insertAdjacentElement('beforeend', row);
      for (let j = 0; j < this.field[i].length; j++) {
        row.insertAdjacentElement('beforeend', this.field[i][j].cellEl);
      }
    }
  }
  movePlayer() {
    for (let i = 0; i < this.board.childNodes.length; i++) {
      for (let j = 0; j < this.board.childNodes[i].childNodes.length; j++) {
        if (i === this.player.y && j === this.player.x) {
          this.board.childNodes[i].childNodes[j].classList.add('player');
        }
          
      }
    }
  }
  handle(e) {
    this.field = [];
    this.board.childNodes[this.player.y].childNodes[this.player.x].classList.remove('player');
    switch(e.code) {
      case 'ArrowUp': 
        this.player.y--;
        break;
      case 'ArrowRight': 
        this.player.x++;
        break;
      case 'ArrowDown': 
        this.player.y++;
        break;
      case 'ArrowLeft':
        this.player.x--;
        break;
    }
    this.renderMap();
    this.movePlayer();
  }
}