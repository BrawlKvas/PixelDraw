class AdminConsole {
    constructor(option) {
        this.socket = option.socket;

        this.panel = document.createElement('form');
        this.input = document.createElement('input');
        this.panel.append(this.input);

        this.initStyle();

        this.panel.hid = true;

        this.panel.onsubmit = this.reqCommand.bind(this);
    }

    reqCommand(e) {
        e.preventDefault();

        this.socket.emit('adminCommand', this.input.value);

        this.input.value = '';
    }

    toggle() {
        if (this.panel.hid) {
            this.panel.style.top = '30px';
            this.input.focus();
            this.panel.hid = false;
        } else {
            this.panel.style.top = '-80px';
            this.panel.hid = true;
        }
    }

    initStyle() {
        this.panel.style.boxSizing = 'border-box';
        this.panel.style.position = 'absolute';
        this.panel.style.width = '50%';
        this.panel.style.top = '-100px';
        this.panel.style.left = '50%';
        this.panel.style.marginLeft = '-25%';
        this.panel.style.padding = '20px';
        this.panel.style.backgroundColor = '#40407a';
        this.panel.style.borderRadius = '3px';
        this.panel.style.transition = '0.5s';

        this.input.style.boxSizing = 'border-box';
        this.input.style.width = '100%';
        this.input.style.padding = '7px 10px 7px 10px';
        this.input.style.fontFamily = 'Montserrat';
        this.input.style.fontSize = '14px';
        this.input.style.color = '#dfe4ea';
        this.input.style.backgroundColor = '#1e272e';
        this.input.style.border = 'none';
        this.input.style.outline = 'none';
    }

    render() {
        return this.panel;
    }
}

export default AdminConsole;

