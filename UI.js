//UserInterface Classes

function ComponentUI(){
	this.draw=function(opGameArea,opComponent){
		let context=opGameArea.canvas.getContext("2d");
		context.fillStyle=opComponent.Colour;
		context.fillRect(opComponent.X,
						 opComponent.Y,
						 opComponent.Width,
						 opComponent.Height);
	};
	this.drawPicture=function(opGameArea,opComponent){
		let context=opGameArea.canvas.getContext("2d");

		context.drawImage(opComponent.Image,
						  opComponent.ImageX,
						  opComponent.ImageY,
						  opComponent.ImageWidth,
						  opComponent.ImageHeight,
						  opComponent.X,
						  opComponent.Y,
						  opComponent.Width,
						  opComponent.Height);
		opComponent.Image.src=opComponent.Source;

	}

}