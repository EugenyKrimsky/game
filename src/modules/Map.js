import Cell from "./cells/Cell";
import Empty from "./cells/Empty";
import Exit from "./cells/Exit";
import Key from "./cells/Key";
import Player from "./cells/Player";
import Wall from "./cells/Wall";

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
          this.field[i].push(new Wall('wall', j, i));
        } else if (i === this.key.y && j === this.key.x) {
          this.field[i].push(new Key('key', j, i));
        } else if (i === this.exit.y && j === this.exit.x) {
          this.field[i].push(new Exit('exit', j, i));
        } else if (i === this.player.y && j === this.player.x) {
          this.field[i].push(new Player('player', j, i));
        } else {
          this.field[i].push(new Empty('empty', j, i));
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
    console.log(this.field[this.player.y][this.player.x])
    this.board.childNodes[this.player.y].childNodes[this.player.x].className = `cell player`;
  }
  richedGoal(goal) {
    return goal.y === this.player.y && goal.x === this.player.x
  }
  gotKey() {
    console.log(this.field)
  }
  handle(e) {
    this.field = [];
    this.board.childNodes[this.player.y].childNodes[this.player.x].classList.remove('player');
    switch(e.code) {
      case 'ArrowUp': 
        if (this.player.y - 1 === 0) break;
        this.player.y--;
        this.renderMap();
        if (this.richedGoal(this.key)) {
          this.gotKey();
        };
        break;
      case 'ArrowRight': 
        if (this.player.x + 1 === this.lenX - 1) break;
        this.player.x++;
        this.renderMap();
        if (this.richedGoal(this.key)) {
          this.gotKey();
        };
        break;
      case 'ArrowDown': 
        if (this.player.y + 1 === this.lenY - 1) break;
        this.player.y++;
        this.renderMap();
        if (this.richedGoal(this.key)) {
          this.gotKey();
        };
        break;
      case 'ArrowLeft':
        if (this.player.x - 1 === 0) break;
        this.player.x--;
        this.renderMap();
        if (this.richedGoal(this.key)) {
          this.gotKey();
        };
        break;
    }
    this.movePlayer();
  }
}