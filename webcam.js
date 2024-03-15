let mobilenet;
let video;
let label='',prob='';
video.crossOrigin='Anonymous';

function modelready(){
    console.log('Model is ready!');
    mobilenet.predict(gotresults);
}

function gotresults(error,results){
    if(error){console.error(error);}
    else{
        console.log(results);
        label=results[0].label;
        prob=results[0].confidence.toFixed(3);
        console.log('Done');
        setTimeout(function(){
            mobilenet.predict(gotresults);
        },1000);
    }
}

function draw(){
    image(video,0,0);
    fill(0);
    textSize(64);
    text(`This is a ${label}`,10,50);
    text(`With ${prob*100}% confidence`,10,height-30);
}

//function imageready(){image(img,0,0,width,height);}
function setup(){
    createCanvas(640,480);
    //let imgname='img/sloth.jpg'
    video=createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet=ml5.imageClassifier('MobileNet',video,modelready);
}