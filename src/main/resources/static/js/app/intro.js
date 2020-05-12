import {consoleColorfulMessage} from './util/consoleColorfulMessage.js'

window.onload = function (event) {
    consoleColorfulMessage('이름은 빵이');

    let hello = document.querySelector('.hello');
    let layer_before = document.querySelector('.before');
    let layer_after = document.querySelector('.after');

    let intoMain = function () {
        window.location.href = '/main';
    }
    hello.addEventListener('click', intoMain)

    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    let gameStart = false

    let dogImg;
    let keyImg;
    let lockImg;

    let gameInit = function (event) {
        let keyCode = event.keyCode;
        if (!gameStart && keyCode >= 37 && keyCode <= 40) {
            gameStart = true;
            layer_before.remove();
            layer_after.style = 'display: block';
            draw();
        }
    }

    let rightPressed = false;
    let upPressed = false;
    let leftPressed = false;
    let downPressed = false;
    let rightFlag = false;
    let leftFlag = false;

    let dogHeight = 100;
    let dogWidth = 95;
    let dogX = (canvas.width - dogWidth) / 10;
    let dogY = (canvas.height - dogHeight);

    let keyHeight = 100;
    let keyWidth = 95;
    let keyX = (canvas.width / 2);
    let keyY = (canvas.height / 3) - keyWidth;

    let lockHeight = 140;
    let lockWidth = 130;
    let lockX = canvas.width - lockWidth;
    let lockY = canvas.height - lockHeight;

    let dogGetKey = false;
    let unlockYn = false;

    dogImg = new Image();
    dogImg.src = '/img/pang_right60.png';

    keyImg = new Image();
    keyImg.src = '/img/key_right60.png';

    lockImg = new Image();
    lockImg.src = '/img/lock60.png';

    let drawKey = function () {
        ctx.beginPath();
        ctx.drawImage(keyImg, keyX, keyY, keyWidth, keyHeight);
        ctx.closePath();
    }

    let dogChangeRightLeft = function () {

        if (!dogGetKey) {
            if (!rightFlag && leftFlag) {
                dogImg.src = '/img/pang_left60.png';
            } else if (rightFlag && !leftFlag) {
                dogImg.src = '/img/pang_right60.png';
            }
        } else {
            if (!rightFlag && leftFlag) {
                dogImg.src = '/img/pang_key_left60.png';
            } else if (rightFlag && !leftFlag) {
                dogImg.src = '/img/pang_key_right60.png';
            }
        }
    }

    let drawDog = function () {
        if (rightPressed) {
            dogX += 7;
            leftFlag = false;
            rightFlag = true; // 방금 오른쪽

        } else if (leftPressed) {
            dogX -= 7;
            rightFlag = false;
            leftFlag = true; // 방금 왼쪽

        } else if (downPressed) {
            dogY += 7;
        } else if (upPressed) {
            dogY -= 7;
        }
        console.log(dogWidth);
        ctx.beginPath();
        ctx.drawImage(dogImg, dogX, dogY, dogWidth, dogHeight);
        ctx.closePath();
    }

    let drawLock = function () {
        ctx.beginPath();
        ctx.drawImage(lockImg, lockX, lockY, lockWidth, lockHeight);
        ctx.closePath();
    }

    let keyDownHandler = function (event) {
        gameInit(event);
        let keyCode = event.keyCode;
        if (keyCode === 37) { //좌
            leftPressed = true;
        } else if (keyCode === 38) {//상
            upPressed = true;
        } else if (keyCode === 39) {//우
            rightPressed = true;
        } else if (keyCode === 40) {//하
            downPressed = true;
        }
    };

    let keyUpHandler = function (event) {
        let keyCode = event.keyCode;
        if (keyCode === 37) { //좌
            leftPressed = false;
        } else if (keyCode === 38) {//상
            upPressed = false;
        } else if (keyCode === 39) {//우
            rightPressed = false;
        } else if (keyCode === 40) {//하
            downPressed = false;
        }
    }

    let unlock = function () {
        dogGetKey = false;
        unlockYn = true;
        dogWidth = 95;
        dogChangeRightLeft();

        rightPressed = false;
        upPressed = false;
        leftPressed = false;
        downPressed = false;
        rightFlag = false;
        leftFlag = false;

        window.removeEventListener("keydown", keyDownHandler, false);
        window.removeEventListener("keyup", keyUpHandler, false);

        setTimeout(function () {
            lockImg.src = '/img/unlock60.png';
        }, 600);
        setTimeout(function () {
            stop();
            window.location.href = '/main';
        }, 1200);
    }

    let requestId;
    let draw = function () {
        if (gameStart) {
            requestId = undefined;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawDog();
            dogChangeRightLeft();
            if (!dogGetKey && !unlockYn) {
                drawKey();
            }
            drawLock();
            start();

            if (dogY < keyY + keyHeight && dogY >= keyY - keyHeight) {
                if (dogX < keyX + keyWidth && dogX >= keyX - keyWidth) {
                    dogGetKey = true;
                    dogWidth = 135;
                }
            }

            if (dogGetKey) {
                if (dogY < lockY + lockHeight && dogY >= lockY - lockHeight) {
                    if (dogX < lockX + lockWidth && dogX >= lockX - lockWidth) {
                        unlock();
                    }
                }
            }
        }
    }


    let start = function () {
        if (!requestId) {
            requestId = window.requestAnimationFrame(draw);
        }
    }

    let stop = function () {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }

    start();

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    // 브라우저 호환
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) { window.setTimeout(callback, 1000 / 60); };
    })();

}

