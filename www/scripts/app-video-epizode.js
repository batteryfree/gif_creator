/*************************************************/
/*********** NEED TO OPTIMIZE CODE ***************/
/******************** AND ************************/
/*********** ADD AN ERROR HANDLER ****************/
/*************************************************/

class PlayCut {
    constructor(el) {
        this.el = el;
        this.endTime = 15;
        this.initElements();
        this.initVideo();
    };

    initElements() {
        this.elements = {
            vPlayer: this.el.querySelector('.player'),
            startTime: this.el.querySelector('.range-start-js'),
            durationTime: this.el.querySelector('.range-duration-js'),
        }
    };

    initVideo() {
        this.elements.vPlayer.src='https://cdn.trinixy.ru/pics6/20190220/satan_odobryaet.mp4';
        this.initRanges();
        this.listenEvents();
        this.elements.vPlayer.play();


    };

    initRanges() {
        this.rangeLabel = this.el.querySelectorAll('.range-label');
        this.setPositionRange(this.elements.startTime, 0, 0);
        this.setPositionRange(this.elements.durationTime, this.endTime, 1);
    }


    listenEvents() {

/* event input startTime range */
        this.elements.startTime.addEventListener('input', () => {
            this.setParamRangeLabel(0, this.elements.startTime, this.getTime(this.elements.startTime.value));
            if (this.elements.startTime.value !== this.elements.startTime.max) {
                this.elements.vPlayer.currentTime = this.getDurationVideo() * this.elements.startTime.value;
                this.endTime = 15 * this.elements.durationTime.value + this.getDurationVideo() * this.elements.startTime.value;
                if (this.getDurationVideo() <= this.endTime) {
                    this.endTime = (this.getDurationVideo() - this.elements.vPlayer.currentTime) *
                    this.elements.durationTime.value + this.getDurationVideo() * this.elements.startTime.value;
                    this.setParamRangeLabel(1, this.elements.durationTime, parseInt((this.getDurationVideo() - this.elements.vPlayer.currentTime) * this.elements.durationTime.value * 10) / 10);
                } else {
                    this.setParamRangeLabel(1, this.elements.durationTime, parseInt(15 * this.elements.durationTime.value * 10) / 10);
                }
                if(this.elements.vPlayer.paused) {
                    this.elements.vPlayer.play();
                }
            } else {
                this.elements.vPlayer.pause();
            }
        });

/* event input duration range */
        this.elements.durationTime.addEventListener('input', () => {
            this.endTime = 15 * this.elements.durationTime.value + this.getDurationVideo() * this.elements.startTime.value;
            if (this.getDurationVideo() <= this.endTime) {
                this.endTime = (this.getDurationVideo() - this.elements.vPlayer.currentTime) *
                this.elements.durationTime.value + this.getDurationVideo() * this.elements.startTime.value;
                this.setParamRangeLabel(1, this.elements.durationTime, parseInt((this.getDurationVideo() - this.elements.vPlayer.currentTime) * this.elements.durationTime.value * 10) / 10);
            } else {
                this.setParamRangeLabel(1, this.elements.durationTime, parseInt(15 * this.elements.durationTime.value * 10) / 10);
            }
        });

/* event progress video */
        this.elements.vPlayer.addEventListener('timeupdate', () => {
            if (this.elements.vPlayer.currentTime >= this.endTime) {
                this.elements.vPlayer.currentTime = this.getDurationVideo() * this.elements.startTime.value;
            };
        });

/* event error videoplayer */
        this.elements.vPlayer.addEventListener('error', () => {
            alert('Playback error');
        });

/* event ended video */
        this.elements.vPlayer.addEventListener('ended', () => {
            this.elements.vPlayer.currentTime = this.getDurationVideo() * this.elements.startTime.value;
            this.elements.vPlayer.play();
        });
    }

    setPositionRange(element, position, index) {
        element.value = position;
        this.setParamRangeLabel(index, element, position);
        element.disabled = false;
    }

    setParamRangeLabel(index, element, text) {
        this.rangeLabel[index].style.left = parseInt(((parseInt(window.getComputedStyle(element).width, 10)) - 10) / element.max*element.value)+'px';
        this.rangeLabel[index].innerHTML = text;
    }

    getDurationVideo() {
        return this.elements.vPlayer.duration;
    }

    getTime(value) {
        let time = this.getDurationVideo() * value;
        let hour = parseInt(time / 3600, 10);
        let min = parseInt((time / 3600 - hour) * 60, 10);
        let sec = parseInt((((time / 3600 - hour) * 60) - min) * 60, 10);
        let timer;
        if(hour === 0) {
            timer = `${min}:${sec}`;
        } else {
            timer = `${hour}:${min}`;
        }
        return timer;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const playCut = new PlayCut(document.querySelector('.video-cut'));
});