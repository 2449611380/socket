let socket = io();
let player_list = [];

class Player {
    constructor(name) {
        this.name = name;
        this.ranClass = `__${this.random(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)}`
        this.x = this.random(0, 500);
        this.y = 0;
    };

    random(min, max) {
        return ~~(Math.random() * max) + min;
    };
};

$('button').on('click', () => {
    if (!$('input').val()) return;
    $('.mask').fadeOut(200);
    socket.emit('player_data', new Player($('input').val()));
});

let Player_status_let = '';
let l = 0;

setInterval(() => {
    socket.on('AllPlayerStatusReturn', data => {
        Player_status_let = data;
    });

    // Player_status_let.Player_status[Player_status_let.key].x += l;
}, 1000 / 120);

document.onkeydown = (ev) => {
    switch (ev.keyCode) {
        case 37:
            l = -1;

            break;

        case 39:
            l = 1;
            break;
    }
}

document.onkeyup = (ev) => {
    if (ev.keyCode == 37 || ev.keyCode == 39) return l = 0;
}