//Controller Classes
function GameAreaController(){

	this.keyPress=function(opEntitySnake){
		window.addEventListener("keydown",function(e){
			let nvFutureDirection=e.keyCode;
			
			if (
				((opEntitySnake.Direction==38&&nvFutureDirection!=40)||
				(opEntitySnake.Direction==40&&nvFutureDirection!=38)||
				(opEntitySnake.Direction==37&&nvFutureDirection!=39)||
				(opEntitySnake.Direction==39&&nvFutureDirection!=37)||
				 opEntitySnake.Direction==0)&&
				 nvFutureDirection>=37&&nvFutureDirection<=40
				) 
			{
				opEntitySnake.Direction=nvFutureDirection;
			}



		});
	};

}
function SnakeController(){

	this.moveUp=function(opEntitySnake){
		if (opEntitySnake.Direction==38) {
			opEntitySnake.Y-=opEntitySnake.Width;
		}
	};
	this.moveDown=function(opEntitySnake){
		if (opEntitySnake.Direction==40) {
			opEntitySnake.Y+=opEntitySnake.Width;
		}
	};
	this.moveLeft=function(opEntitySnake){
		if (opEntitySnake.Direction==37) {
			opEntitySnake.X-=opEntitySnake.Width;
		}
	};
	this.moveRight=function(opEntitySnake){
		if (opEntitySnake.Direction==39) {
			opEntitySnake.X+=opEntitySnake.Width;
		}
	};
}