let mobilenet;
let img;

function modelready(){
    console.log('Model is ready!');
    mobilenet.predict(img,gotresults)
}

function gotresults(error,results){
    if(error){console.error(error);}
    else{
        console.log(results);
        let label=results[0].label;
        let prob=results[0].confidence.toFixed(3);
        fill(0);
        textSize(64);
        text(`This is a ${label}`,10,50);
        text(`With ${prob*100}% confidence`,10,height-30);
        createP(`Label: ${label}`);
        createP(`Probability: ${prob}`);
        console.log('Done');
    }
}

function imageready(){image(img,0,0,width,height);}
function setup(){
    createCanvas(640,480);
    let imgname='img/sloth.jpg'
    img=createImg(imgname,imageready);
    img.hide();
    background(0);
    mobilenet=ml5.imageClassifier('MobileNet',modelready);
}