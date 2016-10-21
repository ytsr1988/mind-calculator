var flagGame = 0; 
var flagAnswered = 0;
var gameInterval1,gameInterval2;
/*
0  no game/not answered yet
1  in game/already answered
*/
var timePerEquation = 2000;
var YN = 0;
var delta = 0;
var correctNum = 0;
var mistakeNum = 0;
var totalNum = 0;
function equationGenerator()
{
	var x = Math.round(Math.random()*80);
	var y = Math.round(Math.random()*(140-x));
	var temp = Math.round(Math.random()*100);
	if (temp<10)
		delta = temp;
	else if (temp<30)
		delta = 10;	
	else if (temp<50)
		delta = -10;
	else
		delta = 0;
	var z = x+y+delta;
	return x+"+"+y+"="+z;
}

function displayEquationOrResult(x)
{
	if (x==1)
	{
		document.getElementById("equation").style.display="inline";
		document.getElementById("resultPic").style.display="none";		
	}
	else
	{
		document.getElementById("resultPic").style.display="inline";
		document.getElementById("equation").style.display="none";	
	}
}
function displayScore()
{
	document.getElementById("statistics").innerHTML="Total: "+totalNum+"<br>Right: "+correctNum+"<br>Wrong: "+mistakeNum;
}

function gameStart()
{
	if (flagGame==0) 
	{
		flagGame=1;
		correctNum = 0;
		mistakeNum = 0;
		totalNum = 0;
		displayScore();
		oneRound();
		document.getElementById("buttStart").disabled=true;
		document.getElementById("buttStart").className="myButtonDisableA"
		document.getElementById("buttExit").disabled=false;
		document.getElementById("buttExit").className="myButtonStartExit"
		gameInterval1 = window.setInterval("oneRound()",timePerEquation+500);
	}	
}
function reply(x)
{
	if (flagGame==1 && flagAnswered==0)
	{
		YN = x;
		checkAnswer();
		flagAnswered = 1;
		document.getElementById("butt"+x).className="myButtonB";
		
	}
}

function refreshFlag()
{
	document.getElementById("butt1").className="myButtonA";
	document.getElementById("butt0").className="myButtonA";
	document.getElementById("butt1").disabled=false;
	document.getElementById("butt0").disabled=false;
	displayEquationOrResult(1);
	flagAnswered = 0;
}

function oneRound()
{
	refreshFlag();
	document.getElementById("equation").innerHTML=equationGenerator();
	totalNum++;
	gameInterval2 = setTimeout("checkAnswerOrnot()",timePerEquation);
}

function checkAnswerOrnot()
{
	if (flagAnswered==0)
	{
		flagAnswered = 1;
		document.getElementById("resultPic").src="wrong.jpg";
		displayEquationOrResult(2);
		mistakeNum++;
		displayScore();
		document.getElementById("butt1").disabled=true;
		document.getElementById("butt0").disabled=true;
		document.getElementById("butt1").className="myButtonDisableB";
		document.getElementById("butt0").className="myButtonDisableB";
		
	}
}


function checkAnswer()
{
	var answer = (delta==0);
	document.getElementById("equation").innerHTML="";
	if (answer == YN)
	{
		document.getElementById("resultPic").src="right.jpg";
		correctNum++;
	}
	else
	{
		document.getElementById("resultPic").src="wrong.jpg";
		mistakeNum++;
	}
	displayEquationOrResult(2);
	displayScore();
}
 
function endGame()
{
	clearInterval(gameInterval1);
	clearTimeout(gameInterval2);
	refreshFlag();
	flagGame=0;
	document.getElementById("buttExit").disabled=true;
	document.getElementById("buttExit").className="myButtonDisableA"
	document.getElementById("buttStart").disabled=false;
	document.getElementById("buttStart").className="myButtonStartExit"
	document.getElementById("butt1").disabled=true;
	document.getElementById("butt1").className="myButtonDisableB"
	document.getElementById("butt0").disabled=true;
	document.getElementById("butt0").className="myButtonDisableB"
	document.getElementById("equation").innerHTML="GAME OVER";
}
