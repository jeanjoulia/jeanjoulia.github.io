var Particle = class Particle {

    constructor( ParticleSrc , gravity , life , interval  , width ) {
        this.ParticleSrc = ParticleSrc;
        this.gravity = gravity;
        this.life = life;
        this.interval = interval;
        this.width = width;
        this.fadeFrame = 5;
        this.offsetremove = 200;
    }
    
    moveElement(particle , t , gravity , Xspeed , Yspeed , x , y , rotation, interval , index , opacity){
        setTimeout(() => {
            var positionX = 1/2*gravity*t*t + Yspeed*t + y;
            var positionY = Xspeed*t+x;
            if(positionX >= (screenSize.x-this.offsetremove) || positionY >= (screenSize.y-this.offsetremove)
                       || positionX <= this.offsetremove || positionY <= this.offsetremove){
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

    emitParticle(speed , direction, rotation , x , y ){
        var particle = document.createElement('img');
        document.getElementById('screen').appendChild(particle); 

        particle.src = this.ParticleSrc;
        particle.style.position = "absolute";
        particle.style.width = this.width.toString(10)+"px";

        var Xspeed = Math.cos((2*Math.PI*direction)/360)*speed;
        var Yspeed = Math.sin((2*Math.PI*direction)/360)*speed;
    
        for(var index = 0 ; index < this.life-1 ; index++){
            if(index < this.life-this.fadeFrame){
                this.moveElement(particle , index , this.gravity , Xspeed , Yspeed , x , y , rotation , this.interval , index , 1);
            }
            else{
                this.moveElement(particle , index , this.gravity , Xspeed , Yspeed , x , y , rotation , this.interval , index , (1/(this.fadeFrame)*(this.life-index)));
            }
            setTimeout(() => {
                particle.remove();
            }, this.interval*this.life)
        }
    }
}
