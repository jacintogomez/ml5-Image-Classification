let video;
let detector;
let detections=[];
//img.crossOrigin='Anonymous';

function preload(){
    //img=loadImage('img/puffin.jpg');
    detector=ml5.objectDetector('cocossd');
}

function gotdetections(error,results){
    if(error){console.error(error);}
    console.log(results);
    detections=results;
    setTimeout(function(){
        detector.detect(video,gotdetections);
    },1000);
}

function setup(){
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();
    detector.detect(video,gotdetections);
}

function draw(){
    image(video,0,0);
    for(let i=0;i<detections.length;i++){
        let ob=detections[i];
        let xnorm=ob.normalized.x*width;
        let ynorm=ob.normalized.y*height;
        let wnorm=ob.normalized.width*width;
        let hnorm=ob.normalized.height*height;
        stroke(0,255,0);
        strokeWeight(4);
        noFill();
        rect(xnorm,ynorm,wnorm,hnorm);
        noStroke();
        fill(255);
        textSize(24);
        text(ob.label+', with '+(ob.confidence*100).toFixed(2)+'% confidence',xnorm+10,ynorm+24);
    }
}