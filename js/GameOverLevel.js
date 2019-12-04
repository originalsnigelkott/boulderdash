const level = {
    title: 'Game over',
    playerPosition: null,
    enemyPosition: null,
    boulderPositions: null,
    mapSizeX: 25,
    mapSizeY: 19,
    map: [
        ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',],
        ['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W',],
        ['W','X','C','C','C','C','X','X','X','C','X','X','X','C','X','X','X','C','X','C','C','C','C','X','W',],
        ['W','X','C','X','X','X','X','X','C','X','C','X','X','C','C','X','C','C','X','C','X','X','X','X','W',],
        ['W','X','C','X','X','X','X','C','X','X','X','C','X','C','X','C','X','C','X','C','X','X','X','X','W',],
        ['W','X','C','X','C','C','X','C','C','C','C','C','X','C','X','X','X','C','X','C','C','C','X','X','W',],
        ['W','X','C','X','X','C','X','C','X','X','X','C','X','C','X','X','X','C','X','C','X','X','X','X','W',],
        ['W','X','C','X','X','C','X','C','X','X','X','C','X','C','X','X','X','C','X','C','X','X','X','X','W',],
        ['W','X','C','C','C','C','X','C','X','X','X','C','X','C','X','X','X','C','X','C','C','C','C','X','W',],
        ['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W',],
        ['W','X','X','C','C','X','X','C','X','X','X','C','X','C','C','C','C','X','C','C','C','C','X','X','W',],
        ['W','X','C','X','X','C','X','C','X','X','X','C','X','C','X','X','X','X','C','X','X','X','C','X','W',],
        ['W','X','C','X','X','C','X','C','X','X','X','C','X','C','X','X','X','X','C','X','X','X','C','X','W',],
        ['W','X','C','X','X','C','X','X','C','X','C','X','X','C','C','C','X','X','C','C','C','C','X','X','W',],
        ['W','X','C','X','X','C','X','X','C','X','C','X','X','C','X','X','X','X','C','X','C','X','X','X','W',],
        ['W','X','C','X','X','C','X','X','C','X','C','X','X','C','X','X','X','X','C','X','X','C','X','X','W',],
        ['W','X','X','C','C','X','X','X','X','C','X','X','X','C','C','C','C','X','C','X','X','X','C','X','W',],
        ['W','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','W',],
        ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',],        
    ],
}

export default level