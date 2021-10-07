video="";

function preload()
{
    video=createVideo("video.mp4")
    video.hide()
}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,380)
    if(status!="")
    {
        object_detector.detect(video,gotresult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status;Object Detacted";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are: "+objects.length; 

            fill("#FF0000")
            percent=floor(objects[i].confidence * 100) 
            text(objects[i].label + " " +percent+ "%", objects[i].x, objects[i].y)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width,objects[i].hieght)
        }
    }
}
objects=[]

function gotresult(error,results)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(results)
        objects=results
    }
}

function start()
{
    object_detector=ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status=true
    video.loop()
    video.speed(1)
    video.volume(0)
}

