//global score of both players
var playerZeroScore=0;
var playerOneScore=0;
//var to store turn order
var turn=1;
//game board stored as array of array
var board = new Array(3);
for(let i=0;i<3;i++)
{
  board[i]=new Array(3).fill(-1);
}

//fn to chk if marking x or o makes the player win
function chkwin(row,col,win,turn)
{
  //chk vertical
  for(let i=0;i<3;i++)
  {
    if(turn!==board[i][col])
    {
      win=false;
      break;
    }
  }
  if(win===true)
    return win;
  win=true;

  //chk horizontal
  for(let i=0;i<3;i++)
  {
    if(turn!==board[row][i])
    {
      win=false;
      break;
    }
  }
  if(win===true)
  return win;
  
  
  //diagonals
  if(row===col)
  {
    win=true;
    //chk diagonal
    for(let i=0;i<3;i++)
    {
      if(turn!==board[i][i])
      {
        win=false;
        break;
      }
    }
    if(win===true)
    return win;
  }

  // second diagonal
  if((row+col)===2)
  {
    win=true;
    let i=0,j=2;
    for(i;i<3;i++)
    {
      if(turn!==board[i][j])
      {
        win=false;
        break;
      }
      j--;
    }
    if(win===true)
    return win;
  }
  return win;
}

// to calc the score count and display on the scorecard
function calcScores(player)
{
  if(player===0)
  {
    playerZeroScore++;
  }
  else{
    playerOneScore++;
  }
  document.getElementById("plyZeroScore").innerHTML=playerZeroScore;
  document.getElementById("plyOneScore").innerHTML=playerOneScore;
  return;
}

//to reset board array, its values 
function setNull()
{

  //cleans the board
document.getElementById('0').innerHTML=null;
document.getElementById('1').innerHTML=null;
document.getElementById('2').innerHTML=null;
document.getElementById('3').innerHTML=null;
document.getElementById('4').innerHTML=null;
document.getElementById('5').innerHTML=null;
document.getElementById('6').innerHTML=null;
document.getElementById('7').innerHTML=null;
document.getElementById('8').innerHTML=null;

//adds the event listeners again
document.getElementById('0').addEventListener('click',doTurn, {once : true});
document.getElementById('1').addEventListener('click',doTurn, {once : true});
document.getElementById('2').addEventListener('click',doTurn, {once : true});
document.getElementById('3').addEventListener('click',doTurn, {once : true});
document.getElementById('4').addEventListener('click',doTurn, {once : true});
document.getElementById('5').addEventListener('click',doTurn, {once : true});
document.getElementById('6').addEventListener('click',doTurn, {once : true});
document.getElementById('7').addEventListener('click',doTurn, {once : true});
document.getElementById('8').addEventListener('click',doTurn, {once : true});

//cleans the array board
for(let i=0;i<3;i++)
{
  for(let j=0;j<3;j++)
  {
    board[i][j]=-1;
  }
}
}

//fn to only reset the board
function resetboard(){
  turn=1;
  setNull();
}

function chkdraw(){
  let flag=true;
  for(let i=0;i<3;i++)
  {
    for(let j=0;j<3;j++)
    {
      if(board[i][j]===-1)
      {
        flag=false;
        break;
      }
    }
  }
  return flag;
}

//fn to map the screen board to array of array board
function setvalue(id,turn)
{
  let row=Math.floor(id/3);
  let col=id%3;
  board[row][col]=turn;
  // document.getElementById("print").innerHTML=board[row][col];
  //calls fn to chk win on each turn
  let win=chkwin(row,col,true,turn);
  if(win===true)
  {
    let play=turn;
    play++;
    alert ("Player "+ play + " Wins" );
    calcScores(turn);
    resetboard();
    return;
  }
  
  let draw=chkdraw();
  if(draw===true && win===false)
  {
    alert ("Game Draw" );
    resetboard();
    return;
  }

  
  // document.getElementById("print").innerHTML=board;
}

//fn to click the board button and place img on it.
function doTurn(val){
  turn++;
  turn=turn%2;
  //places cross
  if(turn===1)
  {
    let mark=document.createElement("img");
    mark.src="image/mark.svg";
    mark.height=130
    mark.width=100
    this.appendChild(mark);
  }
  //places circle
  else
  {
    let mark=document.createElement("img");
    mark.src="image/circle.svg";
    mark.height=100
    mark.width=100
    this.appendChild(mark);
  }
  setvalue(this.id,turn);
}

//resets the entire board and scoreboard...
function resetAll(){
  turn=1;
  playerZeroScore=0;
  playerOneScore=0;
  setNull();
  document.getElementById("plyZeroScore").innerHTML=playerZeroScore;
  document.getElementById("plyOneScore").innerHTML=playerOneScore;
}

// added event listeners... clickable only once
document.getElementById('0').addEventListener('click',doTurn, {once : true});
document.getElementById('1').addEventListener('click',doTurn, {once : true});
document.getElementById('2').addEventListener('click',doTurn, {once : true});
document.getElementById('3').addEventListener('click',doTurn, {once : true});
document.getElementById('4').addEventListener('click',doTurn, {once : true});
document.getElementById('5').addEventListener('click',doTurn, {once : true});
document.getElementById('6').addEventListener('click',doTurn, {once : true});
document.getElementById('7').addEventListener('click',doTurn, {once : true});
document.getElementById('8').addEventListener('click',doTurn, {once : true});
document.getElementById('reset').addEventListener('click',resetAll);