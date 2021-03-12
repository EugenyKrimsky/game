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
    this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].className = `cell player`;
  }
  richedGoal(goal) {
    return goal.y === this.playerCords.y && goal.x === this.playerCords.x
  }
  gotKey() {
    this.playerGotKey = true;
  }
  handle(e) {
    this.field = [];
    switch (e.code) {
      case 'ArrowUp':
        if (this.playerCords.y - 1 === 0) break;
        this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].classList.remove('player');
        this.playerCords.y--;
        this.renderMap();
        if (this.richedGoal(this.keyCords)) {
          this.gotKey();
        };
        break;
      case 'ArrowRight':
        if (this.playerCords.x + 1 === this.lenX - 1) break;
        this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].classList.remove('player');
        this.playerCords.x++;
        this.renderMap();
        if (this.richedGoal(this.keyCords)) {
          this.gotKey();
        };
        break;
      case 'ArrowDown':
        if (this.playerCords.y + 1 === this.lenY - 1) break;
        this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].classList.remove('player');
        this.playerCords.y++;
        this.renderMap();
        if (this.richedGoal(this.keyCords)) {
          this.gotKey();
        };
        break;
      case 'ArrowLeft':
        if (this.playerCords.x - 1 === 0) break;
        this.board.childNodes[this.playerCords.y].childNodes[this.playerCords.x].classList.remove('player');
        this.playerCords.x--;
        this.renderMap();
        if (this.richedGoal(this.keyCords)) {
          this.gotKey();
        };
        break;
    }
    this.movePlayer();
  }
}