export default class Tile{
    position;
    tileState;
    isMoving;

    constructor(tileState, x, y, isMoving) {
        this.tileState = tileState;
        this.position = {
            x: x,
            y: y
        }
        this.isMoving = isMoving;
    }
}