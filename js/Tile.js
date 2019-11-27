export default class Tile{
    position;
    tileState;

    constructor(tileState, x, y) {
        this.tileState = tileState;
        this.position = {
            x: x,
            y: y
        }
    }
}