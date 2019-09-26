import Palette from './palette';
import ZonaDraw from './canvas';
import AdminConsole from './adminConsole';

let socket = io.connect();

let p = document.getElementById('palette');

let palette = new Palette({
     palette: p,
     selectedElement: p.children[0].children[0],
});

let c = new AdminConsole({
     socket
});

let canvas = new ZonaDraw({
     canvas: document.getElementById('canvas'),
     palette: palette,
     socket 
});



document.body.append(c.render());

document.addEventListener('keydown', (e) => {
     if (e.ctrlKey && e.key == 'q') {
          c.toggle();
     }
});


