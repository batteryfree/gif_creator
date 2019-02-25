class Slider {
    constructor(el) {
        this.el = el;
        this.index = 0;
        this.initElemments();
        this.listenEvents();
    }

    initElemments() {
        this.track = this.el.querySelector('.track-1');
        this.buttonsDelFrame = this.el.querySelectorAll('.frame__close'),
        this.frames = this.el.querySelectorAll('.frame');
    }

    listenEvents() {
/* ---> Remove child elements frame ---> Remove frame */
        this.track.addEventListener('click', (element) => {
            let i = [].slice.call(this.buttonsDelFrame).indexOf(element.target);
             i >= 0 ? this.frames[i].remove() : 0;
        });



    }

}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider(document.querySelector('.tracker'));
});