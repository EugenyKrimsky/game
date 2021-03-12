import Cell from "./Cell";

export default class Player extends Cell {
  constructor(type, x, y, hasKey = false) {
    super(type, x, y);
    this.hasKey = hasKey;
  }
}