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
    totspeed : 10,
    isMoving : false
};


var seeker = {
    x : 1,
    y : 1
};

var count = 0;
var notCatched = true;
var started = false;

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
     //Rensa först spelplanen = radera bollen i dess första position
   //draw.clearRect(field.x , field.y, field.width, field.height, true);
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
   //console.log(kvick.angle * 180 / Math.PI);
    count++;
    if (count > 100) {
        setDirection();
       count = 0;
    }
    xDif = (kvick.x - seeker.x);
     yDif = (kvick.y - seeker.y);
     distance2 = ((xDif * xDif) + (yDif * yDif));
     radie2 = 625;
     //radie2 = (kvick.radie + seeker.radie) * (kvick.radie + seeker.radie);
     if(distance2 < radie2) {
        notCatched = false;
     alert("Du fångade kvicken!")
     }
//   if (kvick.isMoving ) {
   //if (started = true ) {
      //Om man tar bort denna flyttar bollen
       //ett steg per klick
       setTimeout(moveBall ,20);
  //}

};

moveBall();

function seekerMovement(evt) {
     // Ta bort den nuvarande cirkeln
     draw.circle(seeker.x, seeker.y, 16, "blue", true);//
     // Hämta koordinater till den nya cirkeln
     seeker.x = evt.pageX-draw.canvasX();
     seeker.y = evt.pageY-draw.canvasY();
     // Rita den nya cirkeln
     draw.circle(seeker.x, seeker.y, 15, "maroon", true);
     xDif = (kvick.x - seeker.x);
     yDif = (kvick.y - seeker.y);
     distance2 = ((xDif * xDif) + (yDif * yDif));
     radie2 = (kvick.radie + seeker.radie) * (kvick.radie + seeker.radie);
     if(distance2 < radie2) {
     alert("Du fångade kvicken!")
     }

};

//draw.canvas().onclick=seekerMovement;

draw.canvas().onmousemove=seekerMovement;


//draw.strokeRect(field.x, field.y, field.width, field.height, "maroon");
//värden för en cirkel = bollen
//Den startar i mitten
//Vinkeln är mellan 0 och " pi

//setDirection();
//setInterval(setDirection, 1000);






document.getElementById("start").removeAttribute("disabled");
//Start
document.getElementById("start").onclick = function () {
        started = true;
/*
        if (kvick.isMoving ) {
        return false;
        }
        kvick.isMoving = true;
*/
       
        this.setAttribute("disabled", "disabled");
        //this är knappen vi tryckt på
        document.getElementById("stop").removeAttribute("disabled")
};

document.getElementById("stop").setAttribute("disabled", "disabled");
//Stopp
document.getElementById("stop").onclick = function () {
        kvick.isMoving = false;
        document.getElementById("start").removeAttribute("disabled");
        this.setAttribute("disabled", "disabled");
};






