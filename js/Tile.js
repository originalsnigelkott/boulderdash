export default class Tile{
    position;
    tileState;
    movingBoulder;

    constructor(tileState, x, y, movingBoulder) {
        this.tileState = tileState;
        this.position = {
            x: x,
            y: y
        }
        this.movingBoulder = movingBoulder;
    }
}