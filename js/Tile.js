export default class Tile{
    position;
    tileState;
    isMoving;

    constructor(tileState, y, x, isMoving) {
        this.tileState = tileState;
        this.position = {
            x: x,
            y: y
        }
        this.isMoving = isMoving;
    }
}