var draw = startCanvas("maincanvas");


//field för bollen att studsa inom
var field = {
   x : 1,
   y : 1,
   width : 800,
   height :450
};

var kvick = {
    x : field.x + field.width / 2,
    y : field.y + field.height / 2,
    r : 10,
    totspeed : 10
};


var seeker = {
    x : 1,
    y : 1,
    r : 15
};

var count = 0;
var notCatched = true;


kvick = Object.create(kvick);
seeker = Object.create(seeker);

var colors = ["orange"];

kvick.color = colors[0];


function setDirection() {
    kvick.angle = Math.random() * Math.PI * 2;
    //Räknas om när farten eller vinkeln ändras
    kvick.xSpeed = Math.cos(kvick.angle) * kvick.totspeed;
    kvick.ySpeed = Math.sin(kvick.angle) * kvick.totspeed;
}
setDirection();


function moveBall() {
    //Sudda bort kvicken i den föregående positionen

    draw.circle(kvick.x, kvick.y, 11, "blue");

    //kollisionsdetektera
    if (kvick.x < (field.x + kvick.r * 2) ) {
    kvick.xSpeed = Math.abs(kvick.xSpeed);
    } else if (kvick.x > (field.x + field.width - kvick.r * 2) ) {
    kvick.xSpeed = -Math.abs(kvick.xSpeed);
    } else if (kvick.y < (field.y  + kvick.r * 2) ) {
    kvick.ySpeed = Math.abs(kvick.ySpeed)
    } else if (kvick.y > (field.y + field.height - kvick.r * 2 ) ) {
    kvick.ySpeed = -Math.abs(kvick.ySpeed)
    }

    if(notCatched)
    {
        //Räkna ut en ny placering av bollen
        kvick.x += kvick.xSpeed;
        kvick.y += kvick.ySpeed;
        draw.circle(kvick.x, kvick.y, kvick.r, kvick.color);
    }

    count++;
    if (count > 100) {
        setDirection();
        count = 0;
    }
    xDif = (kvick.x - seeker.x);
    yDif = (kvick.y - seeker.y);
    distance2 = ((xDif * xDif) + (yDif * yDif));
    radie2 = (kvick.r + seeker.r) * (kvick.r + seeker.r);
    if(distance2 < radie2) {
        notCatched = false;
        alert("Du fångade kvicken!")
    }


    //Om man tar bort denna flyttar bollen
    //ett steg per klick
    setTimeout(moveBall ,20);

};

moveBall();


function seekerMovement(evt) {
     // Ta bort den nuvarande cirkeln
     draw.circle(seeker.x, seeker.y, 16, "blue", true);//
     // Hämta koordinater till den nya cirkeln
     seeker.x = evt.pageX-draw.canvasX();
     seeker.y = evt.pageY-draw.canvasY();
     // Rita den nya cirkeln
     draw.circle(seeker.x, seeker.y, seeker.r, "maroon", true);
     xDif = (kvick.x - seeker.x);
     yDif = (kvick.y - seeker.y);
     distance2 = ((xDif * xDif) + (yDif * yDif));
     radie2 = (kvick.radie + seeker.radie) * (kvick.radie + seeker.radie);
     if(distance2 < radie2) {
     alert("Du fångade kvicken!")
     }

};


draw.canvas().onmousemove=seekerMovement;






