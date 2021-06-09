let win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player_sym = 'X';
let comp_sym = 'O';
let canvas;
let gap;
let context;
let ceil;

// Корректируем длину и высоту холста
correction();

// Определяем кто будет ходить первым
move();

// Ход компьютера
function computerTurn() {
    // Выбираем в какую клеточку ходить, если есть свободные
    if(!standoff()){
        while (win_strike.indexOf(ceil) == -1) {
            ceil = Math.random().toFixed(1) * 10;
        }
    }

    canvas = document.getElementById(ceil);
    context = canvas.getContext("2d")
    context.beginPath();
    context.lineWidth = 5;
    // Отрисовка крестика
    if (comp_sym == 'X') {
        context.strokeStyle = '#ec4646';
        if (canvas.height == canvas.width) {
            context.moveTo(10, 10)
            context.lineTo(canvas.width - 10, canvas.height - 10);
            context.moveTo(canvas.width - 10, 10);
            context.lineTo(10, canvas.height - 10);
        }
        else if (canvas.width > canvas.height) {
            gap = (canvas.width - canvas.height) / 2;
            context.moveTo(gap + 10, 10)
            context.lineTo(canvas.width - gap - 10, canvas.height - 10);
            context.moveTo(canvas.width - gap - 10, 10);
            context.lineTo(gap + 10, canvas.height - 10);
        }
        else {
            gap = (canvas.height - canvas.width) / 2;
            context.moveTo(10, gap + 10)
            context.lineTo(canvas.width - 10, canvas.height - gap - 10);
            context.moveTo(10, canvas.height - gap - 10);
            context.lineTo(canvas.width - 10, gap + 10);
        }
        // Отрисовка нолика
    } else {
        context.strokeStyle = '#51c2d5';
        if (canvas.height >= canvas.width) {
            context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
        } else {
            context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
        }
    }
    win_strike[win_strike.indexOf(ceil)] = comp_sym;
    context.stroke();
    if (check(comp_sym)){
        document.getElementById('win').textContent = "Computer wins";
        document.getElementById('restart').textContent = "Restart";
        return;
    }
    standoff();
}

// Ход человека
function playerTurn(number) {
    if (!check(player_sym)&&
        !check(comp_sym)&&
        // Проверка на занятость клеточки
        win_strike.indexOf(number) != -1) {
        canvas = document.getElementById(number);
        context = canvas.getContext("2d");
        context.beginPath();
        context.lineWidth = 5;
        // Отрисовка крестика
        if (player_sym == 'X') {
            context.strokeStyle = '#ec4646';
            if (canvas.height == canvas.width) {
                context.moveTo(10, 10)
                context.lineTo(canvas.width - 10, canvas.height - 10);
                context.moveTo(canvas.width - 10, 10);
                context.lineTo(10, canvas.height - 10);
            }
            else if (canvas.width > canvas.height) {
                gap = (canvas.width - canvas.height) / 2;
                context.moveTo(gap + 10, 10)
                context.lineTo(canvas.width - gap - 10, canvas.height - 10);
                context.moveTo(canvas.width - gap - 10, 10);
                context.lineTo(gap + 10, canvas.height - 10);
            }
            else {
                gap = (canvas.height - canvas.width) / 2;
                context.moveTo(10, gap + 10)
                context.lineTo(canvas.width - 10, canvas.height - gap - 10);
                context.moveTo(10, canvas.height - gap - 10);
                context.lineTo(canvas.width - 10, gap + 10);
            }
            // Отрисовка нолика
        } else {
            context.strokeStyle = '#51c2d5';
            if (canvas.height >= canvas.width) {
                context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
            } else {
                context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
            }
        }
        win_strike[win_strike.indexOf(number)] = player_sym;
        context.stroke();
        console.log(win_strike);
        if (check(player_sym)){
            document.getElementById('win').textContent = "You wins";
            document.getElementById('restart').textContent = "Restart";
            return;
        }
        standoff();
        computerTurn();
    }
}

// Функция отвечающая за корректирование размеров холста
function correction() {
    for (let i = 1; i < 10; i++) {
        canvas = document.getElementById(i);
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

// Функция отвечающая за то, кто будет делать первый ход
function move(){
    if (Math.round(Math.random()) == 1) {
         comp_sym = 'X';
         player_sym = 'O';
         computerTurn();
    }else{
        comp_sym = 'O';
        player_sym = 'X';
    }
 }

// Функция проверки на победу того или иного игрока. Возвращает булиновское значение
function check(symbol) {
    for (let i = 0; i < 7; i += 3) {
        if (win_strike[i] == symbol && win_strike[i + 1] == symbol && win_strike[i + 2] == symbol) {
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (win_strike[i] == symbol && win_strike[i + 3] == symbol && win_strike[i + 6] == symbol) {
            return true;
        }
    }

    for (let i = 0; i < 3; i += 3) {
        if (win_strike[i] == symbol && win_strike[i + 4] == symbol && win_strike[i + 8] == symbol) {
            return true;
        }
    }

    for (let i = 0; i < 3; i += 3) {
        if (win_strike[i + 2] == symbol && win_strike[i + 4] == symbol && win_strike[i + 6] == symbol) {
            return true;
        }
    }
}

// Определяет ничью
function standoff(){
    for (let i = 1; i<10; i++){
        if (win_strike.indexOf(i) != -1){
            return false;
        }
    }
    document.getElementById('win').textContent = "Draw";
    document.getElementById('restart').textContent = "Restart";
    return true;
}

// Отвечает за переигровку
function restart(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.getElementById('restart').textContent = '';
    document.getElementById('win').textContent = '';
    win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    move(); 
}
