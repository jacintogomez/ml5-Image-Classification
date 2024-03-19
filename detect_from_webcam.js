let video;
let detector;
let darr=[]; //detection array
//img.crossOrigin='Anonymous';

function preload(){
    detector=ml5.objectDetector('cocossd');
}

function modelready(){
    console.log('Model is ready!');
    begindet();
}

function begindet(){
    detector.detect(video,gotdetections);
}

function gotdetections(error,results){
    if(error){console.error(error);}
    else{
        console.log(results);
        darr=results;
        setTimeout(function(){
            detector.detect(video,gotdetections);
        },100);
        //detector.detect(video,gotdetections);
    }
}

function setup(){
    createCanvas(640,480);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();
    detectobjects=detector.detect(video,modelready);
    video.elt.addEventListener('loadeddata', begindet);
}

function draw(){
    image(video,0,0);
    for(let i=0;i<darr.length;i++){
        let ob=darr[i];
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