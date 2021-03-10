import './index.scss'
import Map from './modules/Map'

const player = {x: 1, y: 1};

const key = {x: 5, y: 1};

const exit = {x: 5, y: 2};

const map = new Map(10, 10, key, exit, player);

map.renderMap();
console.log(map);
map.renderDOM();

window.map = map;
