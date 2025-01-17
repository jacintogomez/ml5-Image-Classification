let video;
let detector;
let darr=[]; //detection array
img.crossOrigin='Anonymous';

async function preload(){
    detector=await ml5.objectDetector('cocossd');
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
    const ht=480;
    const wd=640;
    createCanvas(wd,ht);
    video=createCapture(VIDEO);
    video.size(wd,ht);
    video.hide();
    detectobjects=detector.detect(video,modelready);
    video.elt.addEventListener('loadeddata', begindet);
    document.getElementById('content').appendChild(canvas);
    document.getElementById('content').height=ht;
    document.getElementById('content').width=wd;
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