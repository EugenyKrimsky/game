export default class Cell {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;

    this.cellEl = document.createElement('div');
    this.cellEl.className = `cell ${type}`
  }
}