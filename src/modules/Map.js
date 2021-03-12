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
    this.keyCords = key;
    this.exitCords = exit;
    this.playerCords = player;
    this.playerGotKey = false;

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
        } else if (i === this.playerCords.y && j === this.playerCords.x) {
          if (this.playerGotKey) {
            this.field[i].push(new Player('player', j, i, true));
          } else {
            this.field[i].push(new Player('player', j, i));
          }
        } else if (i === this.keyCords.y && j === this.keyCords.x) {
          this.field[i].push(new Key('key', j, i));
        } else if (i === this.exitCords.y && j === this.exitCords.x) {
          this.field[i].push(new Exit('exit', j, i));
        } else {
          this.field[i].push(new Empty('empty', j, i));
        }
      }
    }
  }
  renderDOM() {
    for (let i = 0; i < this.field.length; i++) {
      this.board.insertAdjacentHTML('beforeend', '<div class="row"></div>');
      for (let j = 0; j < this.field[i].length; j++) {
        this.board.childNodes[i].insertAdjacentElement('beforeend', this.field[i][j].cellEl);
      }
    }
  }
  movePlayer() {
    console.log(this.field[this.playerCords.y][this.playerCords.x]);
    if (!(this.exitCords.y === this.playerCords.y && this.exitCords.x === this.playerCords.x)) {
      this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].className = `cell player`;
    }
  }
  richedGoal(goal) {
    return goal.y === this.playerCords.y && goal.x === this.playerCords.x
  }
  gotKey() {
    this.playerGotKey = true;
  }
  gotExit() {
    alert('win');
    this.field = [];
    this.playerGotKey = false;
    this.playerCords = { x: 1, y: 1 };
    this.keyCords = { x: 5, y: 1 };
    this.exitCords = { x: 5, y: 2 };
    this.renderMap();
    this.board.childNodes[this.keyCords.y].childNodes[this.keyCords.x].className = `cell key`;
  }
  move(axis, action) {
    this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].classList.remove('player');
    if (axis === 'x') {
      this.playerCords.x = action === 'plus' ? this.playerCords.x + 1 : this.playerCords.x - 1;
    } else {
      this.playerCords.y = action === 'plus' ? this.playerCords.y + 1 : this.playerCords.y - 1;
    }
    this.renderMap();
    if (this.richedGoal(this.keyCords)) this.gotKey();
    if (this.playerGotKey) if (this.richedGoal(this.exitCords)) this.gotExit();
  }
  handle(e) {
    this.field = [];
    switch (e.code) {
      case 'ArrowUp':
        if (this.playerCords.y - 1 === 0) break;
        this.move('y', 'minus');
        break;
      case 'ArrowRight':
        if (this.playerCords.x + 1 === this.lenX - 1) break;
        this.move('x', 'plus');
        break;
      case 'ArrowDown':
        if (this.playerCords.y + 1 === this.lenY - 1) break;
        this.move('y', 'plus');
        break;
      case 'ArrowLeft':
        if (this.playerCords.x - 1 === 0) break;
        this.move('x', 'minus');
        break;
    }
    this.movePlayer();
  }
}