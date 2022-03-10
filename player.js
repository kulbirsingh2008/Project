class Player {
    constructor(x,y,width,height) {

        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':20,
            'isStatic':false
        }

        this.width=width;
        this.height=height;
        this.image=loadImage("player.png");
        this.body=Bodies.rectangle(x,y,width,height,options); 
        World.add(world,this.body);

    }
    display() {

        var playerPos = this.body.position;
        push()
        translate(playerPos.x,playerPos.y);
        fill(255,0,255);
        imageMode(CENTER);
        image(this.image,0,0,this.width, this.height)
        pop()

    }
    
}