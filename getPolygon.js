var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
var output = document.getElementById("answer");
function reOffset(){
  var BB=canvas.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }

context.lineWidth=2;
context.strokeStyle='blue';

var coordinates = [];
var storeCoordinates = [];
var isDone=false;
var pointsOfPolygon = [];
var congruentPolygonPoints = [];

$('#done').click(function() {
  if (!isDone) {
    isDone=true;
    calculatePolys();
  }
});

function calculatePolys() {
  pointsOfPolygon = [];
  for(index=0; index<storeCoordinates.length;index++) {
    pointsOfPolygon.push(storeCoordinates[index])
  }

  document.getElementById("answer").innerHTML = pointsOfPolygon
  congruentPolygonPoints = splitPolygon(pointsOfPolygon)
  document.getElementById("output1").innerHTML = congruentPolygonPoints[0]
  document.getElementById("output2").innerHTML = congruentPolygonPoints[0]

  if (congruentPolygonPoints != null) {
    context.strokeStyle = "#DD00DD";
    drawPolygon(toCoords(congruentPolygonPoints[0]));
    context.strokeStyle = "#00DDDD";
    drawPolygon(toCoords(congruentPolygonPoints[1]));
  }
}

function toCoords(arr) {
  return arr.map(function(arr) {
    return { 'x': arr[0], 'y': arr[1] };
  })
}

$("#canvas").mousedown(function(e){handleMouseDown(e);});

function handleMouseDown(e){
  if(isDone || coordinates.length>10){return;}

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);
  mouseX = Math.round(mouseX / 50) * 50
  mouseY = Math.round(mouseY / 50) * 50
  storeCoordinates.push([mouseX, mouseY]);
  coordinates.push({x:mouseX,y:mouseY});

  context.clearRect(0,0,cw,ch);
  context.strokeStyle = "#00DDDD";
  drawPolygon(coordinates);
}

function drawPolygon(coords){
  context.beginPath();
  context.moveTo(coords[0].x, coords[0].y);
  for(index=1; index<coords.length;index++) {
    context.lineTo(coords[index].x, coords[index].y);
  }
  context.closePath();
  context.stroke();
}
