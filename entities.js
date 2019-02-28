//Entity Classes

function EntityGameArea(){
	this.canvas=document.getElementById("gameArea");
	this.canvas.width=1000;
	this.canvas.height=500;
	this.clear=function(){
		let context=this.canvas.getContext("2d");
		context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}

}
function EntityComponent(npX,npY,npWidth,npHeight,cpColour,npImage,npImageX,npImageY,npImageWidth,npImageHeight){
	this.X=npX;
	this.Y=npY;
	this.Width=npWidth;
	this.Height=npHeight;
	this.Colour=cpColour;

	this.Image=new Image();


	this.Source=npImage;
	this.ImageX=npImageX;
	this.ImageY=npImageY;
	this.ImageWidth=npImageWidth;
	this.ImageHeight=npImageHeight;

}
function EntityBloodStain(npX,npY,npWidth,npHeight,cpColour,npImage,npImageX,npImageY,npImageWidth,npImageHeight){
	EntityComponent.call(this,npX,npY,npWidth,npHeight,cpColour,npImage,npImageX,npImageY,npImageWidth,npImageHeight);
	this.BloodStains=[[],[]];

	this.drawStains=function(opGameArea){
		let lovStain=new EntityComponent(0,0,this.Width,this.Height,this.Colour,
											this.Source,this.ImageX,this.ImageY,this.ImageWidth,this.ImageHeight);
		let lovComponentUI=new ComponentUI();

		for (var i = this.BloodStains[0].length; i >= 0; i--) {
			lovStain.X=this.BloodStains[0][i];
			lovStain.Y=this.BloodStains[1][i];
			lovComponentUI.drawPicture(opGameArea,lovStain);
		}

	};
}
function EntitySnake(npX,npY,npWidth,npHeight,cpColour,npDirection,npSpeed,npImage,npImageX,npImageY,npImageWidth,npImageHeight){
	EntityComponent.call(this,npX,npY,npWidth,npHeight,cpColour,npImage,npImageX,npImageY,npImageWidth,npImageHeight);
	this.Direction=npDirection;
	this.Speed=npSpeed;
	this.Body=[[],[]];


	this.move=function(){

		let lovSnakeController=new SnakeController();

		lovSnakeController.moveUp(this);
		lovSnakeController.moveDown(this);
		lovSnakeController.moveLeft(this);
		lovSnakeController.moveRight(this);
	};

	this.moveBody=function(){
		let lnvLength= this.Body[0].length-1;
		for (var i =lnvLength; i > 0 ; i--) {
			this.Body[0][i]=this.Body[0][i-1];
			this.Body[1][i]=this.Body[1][i-1];
		}
		if (lnvLength>=0) {
		
				this.Body[0][0]=this.X;
				this.Body[1][0]=this.Y;
		}
	}
	this.drawBody=function(opGameArea){
		let lovBody=new EntityComponent(0,0,this.Width,this.Height,this.Colour,"",0,0,0,0);
		let lovComponentUI=new ComponentUI();

		for (var i = 0; i < this.Body[0].length; i++) {
			lovBody.X=this.Body[0][i];
			lovBody.Y=this.Body[1][i];
			lovComponentUI.draw(opGameArea,lovBody);
		}

	};
	this.eat=function(opFood,opBloodStain){
		let lovSnakeController;
		let lnvMinXfood=opFood.X;
		let lnvMaxXfood=opFood.X+opFood.Width;
		let lnvMinYfood=opFood.Y;
		let lnvMaxYfood=opFood.Y+opFood.Width;


		let lnvMinXsnake=this.X;
		let lnvMaxXsnake=this.X+this.Width;
		let lnvMinYsnake=this.Y;
		let lnvMaxYsnake=this.Y+this.Width;

		if (
			(lnvMinXfood>=lnvMinXsnake&&lnvMinXfood<=lnvMaxXsnake)&&(lnvMaxXfood>=lnvMinXsnake&&lnvMaxXfood<=lnvMaxXsnake)&&
			(lnvMinYfood>=lnvMinYsnake&&lnvMinYfood<=lnvMaxYsnake)&&(lnvMaxYfood>=lnvMinYsnake&&lnvMaxYfood<=lnvMaxYsnake)

			)
		{
			this.Body[0].unshift(this.X);
			this.Body[1].unshift(this.Y);
			opBloodStain.BloodStains[0].unshift(this.X-50);
			opBloodStain.BloodStains[1].unshift(this.Y-50);
			changeFoodPosition(opFood,this);
		}
	};

	this.eatBody=function(){
		let lovLength=this.Body[0].length;
		for (var i = 1; i < lovLength; i++) {
			if (this.X==this.Body[0][i]&&this.Y==this.Body[1][i]) {
				this.restartValues();
				
			}
		}
	};

	this.notOutSideX=function(npCanvaWidth){
		if (this.X<0||
			(this.X+this.Width)>=npCanvaWidth) {
			this.restartValues();
			
		}
	};
	this.notOutSideY=function(npCanvaHeight){
		if (this.Y<0||
			(this.Y+this.Height)>npCanvaHeight) {
			this.restartValues();
		}
	};

	this.restartValues=function(){
		this.X=500;
		this.Y=250;
		this.Body=[[],[]];
		this.Direction=0;
	}

}