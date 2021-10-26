let socket = io();

function addPlayerToDom(player) {
    $('.app').append($(`<div class="player __${player.id}" style="left:${player.x}px !important;"></div>`))
}

function randomNum(min, max) {
    return ~~(Math.random() * max) + min;
};

let players = {};

socket.emit('add_player', {
    name: '无名小卒',
    x: randomNum(0, 900),
    y: 0
});

socket.on('first_data', data => {
    Object.keys(data).map(key => {
        addPlayerToDom(data[key]);
    })
})

socket.on('add_player', data => {
    addPlayerToDom(data);
})

socket.on('leave_player', id => {
    $(`.__${id}`).remove();
})


let arrLength = 0;
setInterval(() => {
    if (arrLength >= 4) arrLength = 1;
    arrLength++;
    $('.player').css({
        backgroundImage: `url(./images/Kid/Kid/Idle${arrLength}.png)`,
    });
}, 1000 / 8);