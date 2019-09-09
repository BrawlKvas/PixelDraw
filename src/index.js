import Palette from './palette';
import ZonaDraw from './canvas';

let p = document.getElementById('palette');

let palette = new Palette({
     palette: p,
     selectedElement: p.children[0].children[0],
});

let canvas = new ZonaDraw({
     canvas: document.getElementById('canvas'),
     palette: palette
});

// 1) Сделать смещение камеры при маштабировании
// 2) Оптимизация (Пиксель на пиксель)
// 3) Сделать перемещение для мобилок