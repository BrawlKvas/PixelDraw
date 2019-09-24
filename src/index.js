import Palette from './palette';
import ZonaDraw from './canvas';

let p = document.getElementById('palette');

let palette = new Palette({
     palette: p,
     selectedElement: p.children[0].children[0],
});

let canvas = new ZonaDraw({
     canvas: document.getElementById('canvas'),
     palette: palette,
     socket: io.connect()
});

// Перемещение для мобилок
// Время перезарядки

