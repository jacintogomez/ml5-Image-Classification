let img;
let detector;
//img.crossOrigin='Anonymous';

function preload(){
    img=loadImage('img/dogsnake.jpg');
    detector=ml5.objectDetector('cocossd');
}

function gotdetections(error,results){
    if(error){console.error(error);}
    console.log(results);
    for(let i=0;i<results.length;i++){
        let ob=results[i];
        stroke(0,255,0);
        strokeWeight(4);
        noFill();
        rect(ob.x,ob.y,ob.width,ob.height);
        noStroke();
        fill(255);
        textSize(24);
        text(ob.label,ob.x+10,ob.y+24);
    }
}

function setup(){
    createCanvas(640,480);
    image(img,0,0,width,height);
    detector.detect(img,gotdetections);
}