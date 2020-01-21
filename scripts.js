
var bottle = {bottom: null ,top: null }


var phaseBottle = 0;
var imageBottle= ["./asset/bottle/bottle0.png",
                  "./asset/bottle/bottle1.png",
                  "./asset/bottle/bottle2.png",
                  "./asset/bottle/bottle3.png",
                  "./asset/bottle/bottle4.png"]

function clickBottle(){
    var topB = 0
    var bottomB = 0
    switch (phaseBottle) {
        case 0:
            phaseBottle = 1
            topB = 4
            bottomB = 0
            break;
        case 1:
            phaseBottle = 2
            topB = 1
            bottomB = 0
            break;
        case 2:
            phaseBottle = 3
            topB = 2
            bottomB = 0
            break;
        case 3:
            phaseBottle = 4
            topB = 3
            bottomB = 0
            break;
        case 4:
            phaseBottle = 0
            topB = 4
            bottomB = 4
            break;
    }
    console.log(this.phaseBottle)
    bottle.bottom.src = imageBottle[bottomB];
    bottle.top.src = imageBottle[topB];
}

function startGame() {
    bottle.bottom = document.getElementById('imageBottom');
    bottle.top = document.getElementById('imageTop');

    bottle.bottom.src = imageBottle[0];
    document.getElementById('imageMiddle').src = imageBottle[4];
    bottle.top.src = imageBottle[4];
    bottle.top.addEventListener('click', this.clickBottle);
}




