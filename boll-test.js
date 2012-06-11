var draw = startCanvas("maincanvas");

//field för bollen att studsa inom
var field = {
   x : 100,
   y : 50,
   width : 600,
   height :350
};

draw.strokeRect(field.x, field.y, field.width, field.height, "maroon");
//värden för en cirkel = bollen
//Den startar i mitten
//Vinkeln är mellan 0 och " pi
var ball = {
    x : field.x + field.width / 2,
    y : field.y + field.height / 2,
    r : 10,
    totspeed : 10,
    isMoving : false

};
var balls = []; //tom array
balls[0] = Object.create(ball);


var colors = ["purple", "green", "blue", "yellow", "maroon"];


     balls[0].color = colors[0];

function setDirection() {
    balls[0].angle = Math.random() * Math.PI * 2;
    //Räknas om när farten eller vinkeln ändras
    balls[0].xSpeed = Math.cos(balls[0].angle) * balls[0].totspeed;
    balls[0].ySpeed = Math.sin(balls[0].angle) * balls[0].totspeed;
};



function moveBall() {
   //Rensa först spelplanen = radera bollen i dess första position
   draw.clearRect(field.x , field.y, field.width, field.height, true);
   for ( var i = 0; i < balls.length; i += 1) {
   //kollisionsdetektera
   if (balls[i].x < (field.x + balls[i].r / 2) ) {
       balls[i].xSpeed = Math.abs(balls[i].xSpeed);
   } else if (balls[i].x > (field.x + field.width - balls[i].r / 2) ) {
      balls[i].xSpeed = -Math.abs(balls[i].xSpeed);
   } else if (balls[i].y < (field.y  + balls[i].r / 2) ) {
      balls[i].ySpeed = Math.abs(balls[i].ySpeed)
   } else if (balls[i].y > (field.y + field.height - balls[i].r / 2) ) {
      balls[i].ySpeed = -Math.abs(balls[i].ySpeed)
   }
   //Räkna ut en ny placering av bollen
   balls[i].x +=balls[i].xSpeed;
   balls[i].y +=balls[i].ySpeed;
   draw.circle(balls[i].x, balls[i].y, balls[i].r, balls[i].color);
   }
   //console.log(balls[i].angla * 180 / Math.PI);
   if (ball.isMoving ) {
       //Om man tar bort denna flyttar bollen
       //ett steg per klick
       setTimeout(moveBall ,20);
   }
}
moveBall();

setDirection();
setInterval(setDirection, 1000);

document.getElementById("start").removeAttribute("disabled");
//Start
document.getElementById("start").onclick = function () {
        if (ball.isMoving ) {
        return false;
        }
        ball.isMoving = true;
        moveBall();
        this.setAttribute("disabled", "disabled");
        //this är knappen vi tryckt på
        document.getElementById("stop").removeAttribute("disabled")
};

document.getElementById("stop").setAttribute("disabled", "disabled");
//Stopp
document.getElementById("stop").onclick = function () {
        ball.isMoving = false;
        document.getElementById("start").removeAttribute("disabled");
        this.setAttribute("disabled", "disabled");
};

