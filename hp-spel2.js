var draw = startCanvas("maincanvas")

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
var kvick = {
    x : field.x + field.width / 2,
    y : field.y + field.height / 2,
    r : 10,
    totspeed : 10,
    color : "orange"
};
kvick = Object.create(kvick);


    kvick.color = "orange";
    kvick.angle = Math.random() * Math.PI * 2;
    //Räknas om när farten eller vinkeln ändras
    kvick.xSpeed = Math.cos(kvick.angle) * kvick.totspeed;
    kvick.ySpeed = Math.sin(kvick.angle) * kvick.totspeed;


// Funktion som kan anropas
function uppdatera() {
       //Rensa först spelplanen = radera bollen i dess första position
   draw.clearRect(field.x , field.y, field.width, field.height, true);
    // Kollisonsdetektering
   if (kvick.x < (field.x + kvick.r / 2) ) {
       kvick.xSpeed = Math.abs(kvick.xSpeed);
   } else if (kvick.x > (field.x + field.width - kvick.r / 2) ) {
      kvick.xSpeed = -Math.abs(kvick.xSpeed);
   } else if (kvick.y < (field.y  + kvick.r / 2) ) {
      kvick.ySpeed = Math.abs(kvick.ySpeed)
   } else if (kvick.y > (field.y + field.height - kvick.r / 2) ) {
      kvick.ySpeed = -Math.abs(kvick.ySpeed)
    // Räkna ut x och y för kvicken
   kvick.x +=kvick.xSpeed;
   kvick.y +=kvick.ySpeed;
   draw.circle(kvick.x, kvick.y, kvick.r, kvick.color);
   }
   //console.log(kvick.angla * 180 / Math.PI);


    setTimeout(uppdatera, 20);
};
uppdatera();

