
//Main
function startGame(){
	let lovGameArea=new EntityGameArea();
	let lovComponentUI=new ComponentUI();

	let lovSnake=new EntitySnake(500,250,50,50,"black",0,200,"",0,0,0,0);
	let lovFood=new EntityComponent(randomX(),randomY(),50,50,"green","images/mouse.png",0,0,115,115);
	let bloodStain=new EntityBloodStain(0,0,150,150,"red","images/blood.png",0,0,242,203);
	let lovGameController=new GameAreaController();
	lovGameController.keyPress(lovSnake);
	
	let lovtimer= setInterval(function(){
		lovSnake.eat(lovFood,bloodStain);
		lovSnake.moveBody();
		lovSnake.move();
		// action(lovFood,lovSnake);

		lovGameArea.clear();
		bloodStain.drawStains(lovGameArea);
		lovComponentUI.draw(lovGameArea,lovSnake);
		lovSnake.drawBody(lovGameArea);
		lovComponentUI.drawPicture(lovGameArea,lovFood);
		lovSnake.notOutSideX(lovGameArea.canvas.width);
		lovSnake.notOutSideY(lovGameArea.canvas.height);
		lovSnake.eatBody();


	},lovSnake.Speed);

}
function randomX(){
	return (Math.floor(Math.random() * 19))*50;
}


function randomY(){
	return (Math.floor(Math.random() * 9))*50;
}

function changeFoodPosition(opFood,opEntitySnake){
	opFood.X=randomX();
	opFood.Y=randomY();
	checkBody(opFood,opEntitySnake);
}
function checkBody(opFood,opEntitySnake){
	let lovLength=opEntitySnake.Body[0].length-1;
	for (var i = 0; i < lovLength; i++) {
		if (opFood.X==opEntitySnake.Body[0][i]&&opFood.Y==opEntitySnake.Body[1][i])
		{
			changeFoodPosition(opFood,opEntitySnake);
		}
	}

	if (opFood.X==opEntitySnake.X&&opFood.Y==opEntitySnake.Y) {
			changeFoodPosition(opFood,opEntitySnake);

	}
}



