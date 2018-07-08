let widthWin = window.innerWidth - 20;
let heightWin = window.innerHeight - 20;
var usersizeX = prompt("размер поля в длинну, не больше " + widthWin);
var usersizeY = prompt("размер поля в высоту, не больше " + heightWin);
$("#canvas").prop('width', usersizeX);
$("#canvas").prop('height', usersizeY);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var widthCan = canvas.width;
var heightCan = canvas.height;

//Создаем поля для змейки

var seporetion = 3; 
for (var i = 10 ; i < 50 ; i++) {
	var cellNumberX = widthCan / (i + seporetion); //кол-во по X
	let temp = cellNumberX + ' ';

	if ( -1 == temp.indexOf('.')){
		var cellSize = i;		
		break;
	}	
}
console.log('размер клетки ' + cellSize);
console.log('кол по X ' + cellNumberX);

var cellNumberY = heightCan / (cellSize + seporetion); // кол-во по Y
let temp = cellNumberY + ' ' // в строку

if ( -1 != temp.indexOf('.')) {
	cellNumberY = temp.slice(0,temp.indexOf('.'));
}
console.log('кол по Y ' + cellNumberY);

var fieldX = [];
var fieldY = [];
var tailX = [];
var tailY = [];
var collision = false;

for (var i = 1; i < cellNumberY; i++) {
	fieldY[0] = 0 ;
	fieldY.push(fieldY[i - 1] + cellSize + seporetion);
}

for (var j = 1; j < cellNumberX; j++){
	fieldX[0] = 0 ;
	fieldX.push(fieldX[j - 1] + cellSize + seporetion);
}
//рисуем еду - food

function drawingFood() {
	var foodX = Math.floor(Math.random() * fieldX.length);
	var foodY = Math.floor(Math.random() * fieldY.length);			
	for (var i = 0; i < tailX.length + 1 ; i++) {
		if (tailX[i] != fieldX[foodX] && tailY[i] != fieldY[foodY]) {
			var foodCor = [fieldX[foodX], fieldY[foodY]];
			break;
		}else{
			foodX = Math.floor(Math.random() * fieldX.length);
			foodY = Math.floor(Math.random() * fieldY.length);
			var foodCor = [fieldX[foodX], fieldY[foodY]];
		}	
	}

	ctx.fillStyle = "red";
	ctx.fillRect(foodCor[0], foodCor[1], cellSize, cellSize);
	return foodCor
}

var foodCor = drawingFood()

//рисуем змейку
var time = prompt('Скорость змейки?');

var x = fieldX[0];
var y = fieldY[0];
var z = 0;
var size = cellSize;
var turbo = 1;
var stop = 1;

$("body").keydown(function (event) {
	console.log(event.keyCode)
	if (event.keyCode === 39 && z != 4){ 		
		z = 1;
		stop = 1;
	}
	if (event.keyCode === 40 && z != 3){ 
		z = 2;
		stop = 1;
	}
	if (event.keyCode === 38 && z != 2){ 
		z = 3;
		stop = 1;
	}
	if (event.keyCode === 37  && z != 1){ 
		z = 4;
		stop = 1;
	}
	if (event.keyCode === 96) {
		stop = 0;
	}
});

function drive() {
	if (stop == 1) {
		if (tailX.length < 1) {
			ctx.clearRect(x, y, size, size)
		}else {
			ctx.clearRect(tailX[tailX.length - 1], tailY[tailY.length - 1] , size, size)
		}
		if (x == foodCor[0] && y == foodCor[1]) {
			foodCor = drawingFood()
			tailX.unshift(x);
			tailY.unshift(y);
		}else {
			tailX.unshift(x);
			tailY.unshift(y);
			tailX.pop();
			tailY.pop();
		}
		for (var i = 0; i < tailX.length; i++) {
			ctx.fillStyle = "green";
			ctx.fillRect(tailX[i], tailY[i], size, size)
			console.log(tailX[i] + " " + tailY[i])
		}

		if(z === 1) 
			x = x + (size + seporetion);
		if(z === 2) 
			y = y + (size + seporetion);
		if(z === 3) 
			y = y - (size + seporetion);
		if(z === 4)
			x = x - (size + seporetion);
		
		if ( x >= widthCan){
			x = 0;
		}
		if ( y >= heightCan){
			y = 0;
		}
		if ( x <= (-1 * (size + seporetion))){
			x = fieldX[fieldX.length - 1];
		}
		if ( y <= (-1 * (size + seporetion))){
			y = fieldY[fieldY.length - 1];	
		}

		ctx.fillStyle = "#ccc";//рисуем голову
		ctx.fillRect(x, y, size, size);

		for (var i = 0; i < tailX.length; i++) {
			if (x == tailX[i] && y == tailY[i]) {
				clearInterval(idInt);
				ctx.fillStyle = '#0a0a0a3d';
				ctx.fillRect(0, 0, widthCan, heightCan);
				$("#canvas").append('<h1>THE END</h1>')
			}
		}
	}
}

var idInt = setInterval(drive, time);

$("body").keydown(function (event) {
	console.log(event.keyCode)
	if (event.keyCode === 110){
		clearInterval(idInt);
		ctx.fillStyle = "#aba8a8a6";
		ctx.fillRect(0, 0, widthCan, heightCan);
		$("#canvas").append('<h1>THE END</h1>')
	}
});
