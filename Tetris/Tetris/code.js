//Sets up Empty Board Matrix and other Global Variables
var piece=1;
var nextpiece=randomNumber(1,7);
var orientation=1;
var speed=800;
var lose=false;
var dropping=false;
var updatepiece=true;
var location=[0,5];
var board=[];
var totallines=0;
var level=1;
var next=10;
var highscore=0;
var score=0;
var activelines=0;
var run;
for(var i=0; i<20; i++){
appendItem(board, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
//Starts the game when "Play" button is clicked
onEvent("playbutton", "click", function(){
setScreen("playscreen");
setActiveCanvas("board");
setStrokeColor("blue");
newpiece();
run = setInterval(function(){
move(); 
}, speed);
});
//Starts the game over when "Play Again" button is clicked
onEvent("backbutton", "click", function(){
setScreen("welcomescreen");
for(var i=0; i<20; i++){
board[i]= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
score=0;
speed=800;
lose=false;
totallines=0;
level=1;
next=10;
}
});
//Displays Instructions when "How to Play" button is clicked
onEvent("instructionsbutton", "click", function(){
setScreen("instructions");
});
onEvent("menubutton", "click", function(){
setScreen("welcomescreen");
});
//Function to Update Canvas based on Board Matrix in addition to Score, Highscore, Level, and Next Piece Displays
function updateboard(){
setText("level", level);
setText("score", score);
setText("lines", totallines);
if(score>highscore){
highscore=score;
setText("highscore", highscore);
}
if(updatepiece==true){
setActiveCanvas("nextpiece");
clearCanvas();
setFillColor("cyan");
if(nextpiece==1){
rect(25, 25, 25, 25);
rect(50, 25, 25, 25);
rect(25, 50, 25, 25);
rect(50, 50, 25, 25);
}
if(nextpiece==2){
rect(12, 25, 25, 25);
rect(37, 25, 25, 25);
rect(62, 25, 25, 25);
rect(37, 50, 25, 25);
}
if(nextpiece==3){
rect(12, 50, 25, 25);
rect(37, 50, 25, 25);
rect(37, 25, 25, 25);
rect(62, 25, 25, 25);
}
if(nextpiece==4){
rect(12, 25, 25, 25);
rect(37, 25, 25, 25);
rect(37, 50, 25, 25);
rect(62, 50, 25, 25);
}
if(nextpiece==5){
rect(12, 25, 25, 25);
rect(37, 25, 25, 25);
rect(62, 25, 25, 25);
rect(62, 50, 25, 25);
}
if(nextpiece==6){
rect(12, 25, 25, 25);
rect(37, 25, 25, 25);
rect(62, 25, 25, 25);
rect(12, 50, 25, 25);
}
if(nextpiece==7){
rect(0, 37, 25, 25);
rect(25, 37, 25, 25);
rect(50, 37, 25, 25);
rect(75, 37, 25, 25);
}
setActiveCanvas("board");
updatepiece=false;
}
for(var y=0; y<20; y++){
for(var x=0; x<10; x++){
if(board[y][x]==0){
setFillColor("black");
}
if(board[y][x]==1){
setFillColor("lightblue");
}
if(board[y][x]==2){
setFillColor("cyan");
}
rect(20*x, 20*y, 20, 20);
}
}
}
//Function to check if player has lost
function checklose(){
for(var i=0; i<10; i++){
if(board[0][i]==1){
lose=true;
}
}
}
//Function to create new piece and check if player has lost
function newpiece() {
//New piece is generated only if player has not already lost
clearlines();
checklose();
if(lose==false){
if(dropping==true){
dropping=false;
updateboard();
}
piece=nextpiece;
nextpiece=randomNumber(1,7);
updatepiece=true;
location[0]=0;
location[1]=5;
if(piece==1){
//2x2 square piece
board[0][4]=2;
board[0][5]=2;
board[1][4]=2;
board[1][5]=2;
updateboard();
}
if(piece==2){
//Line with square sticking out piece
board[0][4]=2;
board[0][5]=2;
board[0][6]=2;
board[1][5]=2;
updateboard();
}
if(piece==3){
//ZigZag 1 piece
board[1][4]=2;
board[1][5]=2;
board[0][5]=2;
board[0][6]=2;
updateboard();
}
if(piece==4){
//ZigZag 2 piece
board[1][6]=2;
board[1][5]=2;
board[0][5]=2;
board[0][4]=2;
updateboard();
}
if(piece==5){
//Backwards L piece
board[0][4]=2;
board[0][5]=2;
board[0][6]=2;
board[1][6]=2;
updateboard();
}
if(piece==6){
//L piece
board[0][4]=2;
board[0][5]=2;
board[0][6]=2;
board[1][4]=2;
updateboard();
}
if(piece==7){
//Line piece
board[0][3]=2;
board[0][4]=2;
board[0][5]=2;
board[0][6]=2;
updateboard();
}
orientation=1;
}
else{
clearInterval(run);
setScreen("losescreen");
setText("finalscore", "Final Score: "+score);
setText("finalhighscore", "High Score: "+highscore);
}
}
//This onEvent handles player inputs (Rotating pieces or moving them left/right/down)
onEvent("playscreen", "keydown", function(event){
if(event.key=="Right"){
//Code to move active piece right
var count=0;
var flag=true;
for(var y=0; y<20; y++){
for(var x=8; x>=0; x--){
if(board[y][x]==2){
if(board[y][x+1]==1){
flag=false;
y=20;
x=-1;
}
else{
count++;
}
if(count==4){
y=20;
x=-1;
}
}
}
}
for(var r=0; r<20; r++){
if(board[r][9]==2){
flag=false;
}
}
if(flag==true){
for(var a=0; a<20; a++){
for(var b=8; b>=0; b--){
if(board[a][b]==2){
board[a][b]=0;
board[a][b+1]=2;
}
}
}
location[1]++;
updateboard();
}
}
if(event.key=="Left"){
//Code to move active piece left
var count2=0;
var flag2=true;
for(var c=0; c<20; c++){
for(var d=0; d<10; d++){
if(board[c][d]==2){
if(board[c][d-1]==1){
flag2=false;
c=20;
d=9;
}
else{
count2++;
}
if(count2==4){
c=20;
d=9;
}
}
}
}
for(var l=0; l<20; l++){
if(board[l][0]==2){
flag2=false;
}
}
if(flag2==true){
for(var e=0; e<20; e++){
for(var f=0; f<10; f++){
if(board[e][f]==2){
board[e][f]=0;
board[e][f-1]=2;
}
}
}
location[1]--;
updateboard();
}
}
if(event.key=="Down"){
dropping=true;
while(dropping==true){
score++;
move();
}
}
if(event.key==" "||event.key=="Up"){
//Code to Rotate Active Piece
var flag3=false;
if(piece==2){
if(orientation==1){
if(location[0]>0&&board[location[0]-1][location[1]]==0){
board[location[0]-1][location[1]]=2;
board[location[0]][location[1]+1]=0;
flag3=true;
}
}
if(orientation==2){
if(location[1]<9&&board[location[0]][location[1]+1]==0){
board[location[0]][location[1]+1]=2;
board[location[0]+1][location[1]]=0;
flag3=true;
}
}
if(orientation==3){
if(board[location[0]+1][location[1]]==0){
board[location[0]+1][location[1]]=2;
board[location[0]][location[1]-1]=0;
flag3=true;
}
}
if(orientation==4){
if(location[1]>0&&board[location[0]][location[1]-1]==0){
board[location[0]][location[1]-1]=2;
board[location[0]-1][location[1]]=0;
flag3=true;
}
}
}
if(piece==3){
if(orientation==1||orientation==3){
if(location[0]>0&&board[location[0]][location[1]-1]==0&&board[location[0]+2][location[1]]==0){
board[location[0]][location[1]-1]=2;
board[location[0]-1][location[1]-1]=2;
board[location[0]][location[1]+1]=0;
board[location[0]+1][location[1]-1]=0;
flag3=true;
}
}
if(orientation==2||orientation==4){
if(location[1]<9&&board[location[0]][location[1]+1]==0&&board[location[0]+1][location[1]-1]==0){
board[location[0]][location[1]+1]=2;
board[location[0]+1][location[1]-1]=2;
board[location[0]][location[1]-1]=0;
board[location[0]-1][location[1]-1]=0;
flag3=true;
}
}
}
if(piece==4){
if(orientation==1||orientation==3){
if(location[0]>0&&board[location[0]-1][location[1]]==0&&board[location[0]+1][location[1]-1]==0){
board[location[0]-1][location[1]]=2;
board[location[0]+1][location[1]-1]=2;
board[location[0]+1][location[1]]=0;
board[location[0]+1][location[1]+1]=0;
flag3=true;
}
}
if(orientation==2||orientation==4){
if(location[1]<9&&board[location[0]+1][location[1]+1]==0&&board[location[0]+1][location[1]]==0){
board[location[0]-1][location[1]]=0;
board[location[0]+1][location[1]-1]=0;
board[location[0]+1][location[1]]=2;
board[location[0]+1][location[1]+1]=2;
flag3=true;
}
}
}
if(piece==5){
if(orientation==1){
if(location[0]>0&&board[location[0]+1][location[1]]==0&&board[location[0]-1][location[1]+1]==0){
board[location[0]+1][location[1]]=2;
board[location[0]-1][location[1]+1]=2;
board[location[0]][location[1]]=0;
board[location[0]][location[1]-1]=0;
flag3=true;
}
}
if(orientation==2){
if(location[1]>0&&board[location[0]][location[1]-1]==0&&board[location[0]+1][location[1]-1]==0){
board[location[0]][location[1]-1]=2;
board[location[0]+1][location[1]-1]=2;
board[location[0]][location[1]+1]=0;
board[location[0]-1][location[1]+1]=0;
flag3=true;
}
}
if(orientation==3){
if(location[0]>0&&board[location[0]][location[1]]==0&&board[location[0]-1][location[1]]==0&&board[location[0]-1][location[1]+1]==0){
board[location[0]][location[1]]=2;
board[location[0]-1][location[1]]=2;
board[location[0]-1][location[1]+1]=2;
board[location[0]][location[1]-1]=0;
board[location[0]+1][location[1]-1]=0;
board[location[0]+1][location[1]+1]=0;
flag3=true;
}
}
if(orientation==4){
if(location[1]>0&&board[location[0]][location[1]-1]==0&&board[location[0]][location[1]+1]==0&&board[location[0]+1][location[1]+1]==0){
board[location[0]][location[1]-1]=2;
board[location[0]][location[1]+1]=2;
board[location[0]+1][location[1]+1]=2;
board[location[0]-1][location[1]]=0;
board[location[0]-1][location[1]+1]=0;
board[location[0]+1][location[1]]=0;
flag3=true;
}
}
}
if(piece==6){
if(orientation==1){
if(location[0]>0&&board[location[0]-1][location[1]]==0&&board[location[0]-1][location[1]-1]==0&&board[location[0]+1][location[1]]==0){
board[location[0]-1][location[1]]=2;
board[location[0]-1][location[1]-1]=2;
board[location[0]+1][location[1]]=2;
board[location[0]][location[1]-1]=0;
board[location[0]+1][location[1]-1]=0;
board[location[0]][location[1]+1]=0;
flag3=true;
}
}
if(orientation==2){
if(location[1]<9&&board[location[0]][location[1]+1]==0&&board[location[0]+1][location[1]+1]==0&&board[location[0]+1][location[1]-1]==0){
board[location[0]][location[1]+1]=2;
board[location[0]+1][location[1]+1]=2;
board[location[0]+1][location[1]-1]=2;
board[location[0]][location[1]]=0;
board[location[0]-1][location[1]]=0;
board[location[0]-1][location[1]-1]=0;
flag3=true;
}
}
if(orientation==3){
if(location[0]>0&&board[location[0]][location[1]-1]==0&&board[location[0]-1][location[1]-1]==0){
board[location[0]][location[1]-1]=2;
board[location[0]-1][location[1]-1]=2;
board[location[0]][location[1]+1]=0;
board[location[0]+1][location[1]+1]=0;
flag3=true;
}
}
if(orientation==4){
if(location[1]<9&&board[location[0]][location[1]]==0&&board[location[0]][location[1]+1]==0){
board[location[0]][location[1]]=2;
board[location[0]][location[1]+1]=2;
board[location[0]+1][location[1]]=0;
board[location[0]-1][location[1]-1]=0;
flag3=true;
}
}
}
if(piece==7){
if(orientation==1||orientation==3){
if(board[location[0]+1][location[1]]==0&&board[location[0]+2][location[1]]==0&&board[location[0]+3][location[1]]==0){
board[location[0]+1][location[1]]=2;
board[location[0]+2][location[1]]=2;
board[location[0]+3][location[1]]=2;
board[location[0]][location[1]+1]=0;
board[location[0]][location[1]-1]=0;
board[location[0]][location[1]-2]=0;
flag3=true;
}
}
if(orientation==2||orientation==4){
if(board[location[0]][location[1]+1]==0&&board[location[0]][location[1]-1]==0&&board[location[0]][location[1]-2]==0){
board[location[0]+1][location[1]]=0;
board[location[0]+2][location[1]]=0;
board[location[0]+3][location[1]]=0;
board[location[0]][location[1]+1]=2;
board[location[0]][location[1]-1]=2;
board[location[0]][location[1]-2]=2;
flag3=true;
}
}
}
if(flag3==true){
orientation++;
}
if(orientation==5){
orientation=1;
}
updateboard();
}
});
//Function to move active piece downwards
function move(){
var flag=true;
var count=0;
for(var y=18; y>=0; y--){
for(var x=0; x<10; x++){
if(board[y][x]==2){
if(board[y+1][x]==1){
flag=false;
y=-1;
x=10;
}
else{
count++;
}
if(count==4){
y=-1;
x=10;
}
}
}
}
for(var b=0; b<10; b++){
if(board[19][b]==2){
flag=false;
}
}
if(flag==true){
for(var y2=18; y2>=0; y2--){
for(var x2=0; x2<10; x2++){
if((board[y2][x2]==2)){
board[y2][x2]=0;
board[(y2+1)][x2]=2;
}
}
}
location[0]++;
}
else{
var count2=0;
for(var y3=0; y3<20; y3++){
for(var x3=0; x3<10; x3++){
if(board[y3][x3]==2){
board[y3][x3]=1;
count2++;
if(count2==4){
y3=20;
x3=10;
}
}
}
}
newpiece();
}
if(dropping==false){
updateboard();
}
}
//Function to clear all completed lines and update score/level accordingly
function clearlines(){
var update=false;
var clearedlines=[];
for(var c=0; c<20; c++){
var flag2=true;
for(var check=0; check<10; check++){
if(board[c][check]==0){
flag2=false;
}
}
if(flag2==true){
appendItem(clearedlines, c);
board[c]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
}
activelines=clearedlines.length;
totallines=totallines+clearedlines.length;
if(clearedlines!=""){
for(var drop = clearedlines.length; drop>0; drop--){
for(var y=clearedlines[clearedlines.length-1]; y>0; y--){
for(var x=0; x<10; x++){
board[y][x]=board[y-1][x];
}
}
for(var t=0; t<10; t++){
board[0][t]=0;
}
removeItem(clearedlines, 0);
}
if(totallines>=next){
level++;
update=true;
next+=10;
}
if(activelines==1){
score+=40*level;
}
if(activelines==2){
score+=100*level;
}
if(activelines==3){
score+=300*level;
}
if(activelines==4){
score+=1200*level;
}
if(update==true){
if(level==2){
speed=717;
}
if(level==3){
speed=633
}
if(level==4){
speed=550;
}
if(level==5){
speed=467;
}
if(level==6){
speed=383;
}
if(level==7){
speed=300;
}
if(level==8){
speed=217;
}
if(level==9){
speed=133;
}
if(level==10){
speed=100;
}
if(level==11){
speed=83;
}
if(level==14){
speed=67;
}
if(level==17){
speed=50;
}
if(level==20){
speed=33;
}
if(level==30){
speed=17;
}
clearInterval(run);
run = setInterval(function(){
move(); 
}, speed);
}
}
}