import Cell from "./Cell";

export default class Map {
  constructor(lenX, lenY) {
    this.lenX = lenX;
    this.lenY = lenY;
    this.field = [];
  }
  renderMap() {
    for (let i = 0; i < this.lenY; i++) {
      this.field.push([]);
      for (let j = 0; j < this.lenX; j++) {
        if ((i === 0 || i === this.lenY - 1) || (j === 0 || j === this.lenX - 1)) {
          this.field[i].push(new Cell('wall', j, i));
        } else {
          this.field[i].push(new Cell('empty', j, i));
        }
      }
    }
  }
}