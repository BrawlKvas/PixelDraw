import Palette from './palette';
import ZonaDraw from './canvas';
import AdminConsole from './adminConsole';

let socket = io.connect();

let p = document.getElementById('palette');

let palette = new Palette({
     palette: p,
     selectedElement: p.children[0].children[0],
});

let canvas = new ZonaDraw({
     canvas: document.getElementById('canvas'),
     canvasUp: document.getElementById('canvasUp'),
     palette: palette,
     coordinatePanel: document.getElementById('coordinatePanel'),
     socket
});

let c = new AdminConsole({
     socket
});

document.body.append(c.render());

document.addEventListener('keydown', (e) => {
     if (e.ctrlKey && e.key == 'q') {
          c.toggle();
     }
});


