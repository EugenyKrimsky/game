import Cell from "./Cell";

export default class Player extends Cell{
  constructor(type, x, y) {
    super(type, x, y);
    this.hasKey = false;
  }
}