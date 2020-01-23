var bottle = {bottom: null ,top: null, position: null }
var  screenSize = {x : 0 , y : 0 };
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

    bottle.bottom.src = imageBottle[bottomB];
    bottle.top.src = imageBottle[topB];

    
    shake(bottle.bottom, 2 , 50 , 5)
    shake(bottle.top, 2 , 50 , 5)

    if(phaseBottle == 0){
        brokenBottle();
    }
}


function startGame() {
    screenSize.x =  document.getElementById('screen').offsetHeight;
    screenSize.y =  document.getElementById('screen').offsetWidth;

    bottle.bottom = document.getElementById('imageBottom');
    bottle.top = document.getElementById('imageTop');

    bottle.bottom.src = imageBottle[0];
    bottle.top.src = imageBottle[4];

    bottle.position = bottle.top.getBoundingClientRect();
    console.log(bottle.position)
    bottle.position["yCenter"] = (bottle.position.top + bottle.position.bottom)/2;
    bottle.position["xCenter"] = (bottle.position.left + bottle.position.right)/2;    
    bottle.top.addEventListener('click', this.clickBottle);
}

function shake(imageShake,repetition, interval , angle){
    var direction = 1
    for(var index=0; index<repetition ; index++){
        setTimeout(() => {
            imageShake.style.transform = "rotate("+direction*angle.toString(10)+"deg)";
            direction = direction*-1;
        }, interval*index)
    }
    setTimeout(() => {
        imageShake.style.transform = "rotate(0deg)";
        direction = direction*-1;
    }, interval*repetition)
    
}

function brokenBottle(){
    var glassShard = new Particle("./asset/bottle/bottlePiece/bottlePiece.png" , 10 , 10 , 50, Math.round(bottle.top.naturalWidth/3) );
    //emitParticle(particleSrc , speed , direction, rotation, gravity , life, interval , x , y )
    for(var particleNum = 0 ; particleNum<10 ; particleNum++ ){
        var rotation = Math.floor(Math.random() * 10)-5;
        var speed = Math.floor(Math.random() * 100);
        var direction = Math.floor(Math.random() * 720)-360;
        glassShard.emitParticle(speed ,direction ,rotation ,
        bottle.position.xCenter ,
        bottle.position.yCenter)
    }
}







