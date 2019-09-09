class Palette {
    constructor(option) {
        this.palette = option.palette;

        this.selectedElement = option.selectedElement;
        this.color = this.selectedElement.getAttribute('data-bgc');

        this.palette.addEventListener('click', this.selectColor.bind(this));
    }

    selectColor(e) {
        if (e.target.hasAttribute('data-bgc')) {
            this.color = e.target.getAttribute('data-bgc');

            this.selectedElement.classList.remove('color-active');
            e.target.classList.add('color-active');

            this.selectedElement = e.target; 
        }
    }

    get getColor() {
        return this.color;
    }
}

export default Palette;