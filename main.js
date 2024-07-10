song1 = "";
song2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}  

function gotPoses(results)
{
    if(results.length > 0)
    {   
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 60, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        song2.stop();
        song1.play();
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);

        song1.stop();
        song2.play();
    }
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);

}

function stop()
{
    song1.stop();
    song2.stop();
}
