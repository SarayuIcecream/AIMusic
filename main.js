song1="";
song2="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
song1_status="";
song2_status="";
scoreleftWrist=0;
scorerightWrist=0;

function preload() {
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
    }
    
    function draw() {
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("red");
    stroke("black");
    if (scorerightWrist>0.2) {
        circle(rightWrist_x,rightWrist_y,20);
        song2.stop();
        if (song1_status==false) {
       song1.play();
       document.getElementById("song").innerHTML="Playing Harry Potter Song";   
        }
    }

    if (scoreleftWrist>0.2) {
        circle(leftWrist_x,leftWrist_y,20);
        song1.stop();
        if (song2_status==false) {
       song2.play();
       document.getElementById("song").innerHTML="Playing Peter Pan Song";   
        }
    }
    }



function setup() {
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);

poseNet.on('pose',gotPoses);
}

function gotPoses(results) {
if (results.length>0) {
console.log(results); 

leftWrist_x=results[0].pose.leftWrist.x;
leftWrist_y=results[0].pose.leftWrist.y;
rightWrist_x=results[0].pose.rightWrist.x;
rightWrist_y=results[0].pose.rightWrist.x;

scoreleftWrist=results[0].pose.keypoints[9].score;
scorerightWrist=results[0].pose.keypoints[10].score;
}

}

function modelLoaded() {
console.log("modelIsLoaded");
}



