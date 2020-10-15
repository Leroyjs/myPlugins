export default class RubberMouse {
    constructor(block, springRate = 30, resistance = 20) {
        if (resistance > 100) resistance = 100;
        if (springRate > 100) springRate = 100;
        this.resistance = resistance / 100;
        this.springRate = springRate / 100;
        this.blockObj = {
            item: block,
            itemWidth: block.clientWidth,
            itemHeight: block.clientHeight,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
        };
        this.mouse = {
            x: 0,
            y: 0,
        };
        document.body.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        console.log(this.blockObj);
        requestAnimationFrame(this.animation.bind(this));
    }
    animation() {
        this.blockObj.ax = (this.mouse.x - this.blockObj.x) * this.springRate;
        this.blockObj.vx += this.blockObj.ax;
        this.blockObj.x +=
            this.blockObj.vx +
            (this.mouse.x - this.blockObj.x) * this.resistance;
        this.blockObj.ay = (this.mouse.y - this.blockObj.y) * this.springRate;
        this.blockObj.vy += this.blockObj.ay;
        this.blockObj.y +=
            this.blockObj.vy +
            (this.mouse.y - this.blockObj.y) * this.resistance;
        const x = this.blockObj.y - this.blockObj.itemHeight / 2 + 'px';
        const y = this.blockObj.x - this.blockObj.itemWidth / 2 + 'px';
        this.blockObj.item.style.transform = `translate(${y}, ${x})`;
        requestAnimationFrame(this.animation.bind(this));
    }
}
