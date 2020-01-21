
var bottle = {bottom: null ,top: null }
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

    shake(bottle.bottom, 2 , 50 , 5)
    shake(bottle.top, 2 , 50 , 5)

    if(phaseBottle == 0){
      //emitParticle(particleSrc , speed , direction, rotation, gravity , life, interval , x , y )
        for(var particleNum = 0 ; particleNum<10 ; particleNum++ ){
            var rotation = Math.floor(Math.random() * 10)-5;
            var speed = Math.floor(Math.random() * 100);
            var direction = Math.floor(Math.random() * 720)-360;
            emitParticle( "./asset/bottle/bottlePiece/bottlePiece.png", 
            speed ,
            direction ,
            rotation ,
            10 ,
            10 ,
            50 ,
            document.getElementById('screen').offsetWidth/2 ,
            document.getElementById('screen').offsetHeight/2,
            bottle.top.naturalWidth/3  )
        }
    }
    bottle.bottom.src = imageBottle[bottomB];
    bottle.top.src = imageBottle[topB];
    bottle.bottom.style.transform = "rotate(5deg)";
}


function startGame() {
    bottle.bottom = document.getElementById('imageBottom');
    bottle.top = document.getElementById('imageTop');

    bottle.bottom.src = imageBottle[0];
    document.getElementById('imageMiddle').src = imageBottle[4];
    bottle.top.src = imageBottle[4];
    bottle.top.addEventListener('click', this.clickBottle);

    screenSize.x =  document.getElementById('screen').offsetHeight;
    screenSize.y =  document.getElementById('screen').offsetWidth;
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

function emitParticle(particleSrc , speed , direction, rotation, gravity , life, interval , x , y , width){
    fadeFrame = 5;
    offsetremove = 200;
    var particle = document.createElement('img'); 
    document.getElementById('screen').appendChild(particle); 
    particle.src = particleSrc;
    particle.style.position = "absolute";
    particle.style.left = x.toString(10) + "px";  
    particle.style.top = y.toString(10) + "px";
    particle.style.width = width.toString(10)+"px";  
    Xspeed = Math.cos((2*Math.PI*direction)/360)*speed;
    Yspeed = Math.sin((2*Math.PI*direction)/360)*speed;
    console.log({"Xspeed" : Xspeed})
    console.log({"Yspeed" : Yspeed})

    function moveElement(particle , t , gravity , Xspeed , Yspeed , x , y , rotation, interval , index , opacity){
        setTimeout(() => {
            var positionX = 1/2*gravity*t*t + Yspeed*t + y;
            var positionY = Xspeed*t+x;
            if(positionX >= (screenSize.x-offsetremove) || positionY >= (screenSize.y-offsetremove)
                       || positionX <= offsetremove || positionY <= offsetremove){
                particle.remove();
            }
            else{
                particle.style.opacity = opacity
                particle.style.left =positionY
                particle.style.top = positionX
                particle.style.transform = "rotate("+rotation*t.toString(10)+"deg)";
            }
        }, interval*index)
    }

    for(var index = 0 ; index < life ; index++){
            if(index < life-fadeFrame){
                moveElement(particle , index , gravity , Xspeed , Yspeed , x , y , rotation , interval , index , (1/(fadeFrame)*(life-index)).toString(10));
            }
            else{
                moveElement(particle , index , gravity , Xspeed , Yspeed , x , y , rotation , interval , index , "1");
            }
            
            setTimeout(() => {
                particle.remove();
            }, interval*life)
    }
}






