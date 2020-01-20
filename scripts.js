
var phaseBottle = 0;

function clickBottle(){
    switch (this.phaseBottle) {
        case 0:
            this.phaseBottle = 1
            break;
        case 1:
            this.phaseBottle = 2
            break;
        case 2:
            this.phaseBottle = 3
            break;
        case 3:
            this.phaseBottle = 4
            break;
        case 4:
            this.phaseBottle = 5
            break;
    }
    console.log("hello")
}

function startGame() {
    document.getElementById('imageBottom').src = './asset/bottle/bottle0.png';
    document.getElementById('imageMiddle').src = './asset/bottle/bottle4.png';
    document.getElementById('imageTop').src = './asset/bottle/bottle4.png';
    document.getElementById('imageTop').addEventListener('click', this.clickBottle);
}




