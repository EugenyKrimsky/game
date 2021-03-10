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

    this.app = document.querySelector('#app');
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
      this.app.insertAdjacentElement('beforeend', row);
      for (let j = 0; j < this.field[i].length; j++) {
        row.insertAdjacentElement('beforeend', this.field[i][j].cellEl);
      }
    }
  }
}