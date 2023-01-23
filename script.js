//global score of both players
var playerZeroScore=0;
var playerOneScore=0;
var cross=0;
var circle=0;
// var countZero
//var to store turn order
// game board stored as 
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
  cross=0;
  circle=0;
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
// document.getElementById("print").innerHTML=board;
}

//fn to only reset the board
function resetboard(){
  cross=0;
  circle=0;
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


//resets the entire board and scoreboard...
function resetAll(){
  playerZeroScore=0;
  playerOneScore=0;
  circle=0;
  cross=0;
  setNull();
  document.getElementById("plyZeroScore").innerHTML=playerZeroScore;
  document.getElementById("plyOneScore").innerHTML=playerOneScore;
}

// ************************single player*****************************
function setCompTurnVal(id,turn){
  let row=Math.floor(id/3);
  let col=id%3;
  board[row][col]=turn;
  // document.getElementById("print").innerHTML=board[row][col];
  //calls fn to chk win on each turn
  let win=chkwin(row,col,true,turn);
  if(win===true)
  {
    if(turn===1)
    alert ("Player X Wins" );
    else
    alert ("Computer O Wins");
    
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

function defense(turn){
  //horizontal
  for(let i=0;i<3;i++)
  { 
    let count=0;
    for(let j=0;j<3;j++)
    {
      if(board[i][j]===turn)
      {
        count++;
      }
      if(board[i][j]===0)
      count--;
    }
    if(count===2)
    {
      let id=chkidRow(i);
      if(board[Math.floor(id/3)][id%3]===0)
      id=-1;
      return id;
    }
  }
  //vertical
  for(let i=0;i<3;i++)
  { 
    let count=0;
    for(let j=0;j<3;j++)
    {
      if(board[j][i]===turn)
      {
        count++;
      }
      if(board[i][j]===0)
      count--;
    }
    if(count===2)
    {
      let id=chkidCol(i);
      if(id===-1)
      return -1;
      else if(board[Math.floor(id/3)][id%3]===0)
      id=-1;
      return id;
    }
  }
  //diagonal1
    let countd=0;
    let iterator=0;
    for(let iterator=0;iterator<3;iterator++)
    {
      if(board[iterator][iterator]===turn)
      {
        countd++;
      }
      if(board[iterator][iterator]==0)
      countd--;
    }
    if(countd===2)
    {
      let id=chkidDia1(iterator);
      if(board[Math.floor(id/3)][id%3]===0)
      id=-1;
      return id;
    }

  //diagonal2
    let countd2=0;
    let kterator=0;
    let jterator=2;
    for(let kterator=0;kterator<3;kterator++)
    {
      if(board[kterator][jterator]===turn)
      {
        countd2++
      }
      if(board[kterator][jterator]===0)
      countd2--;
      jterator--;
    }
    if(countd2===2)
    {
      let id=chkidDia2(kterator);
      if(board[Math.floor(id/3)][id%3]===0)
      id=-1;
      return id;
    }

  return -1;
}
function chkidRow(row)
{
  for(let i=0;i<3;i++)
  {
    if(board[row][i]===-1)
    return 3*row+i;
  }
  return -1;
}
function chkidCol(col)
{
  for(let i=0;i<3;i++)
  {
    if(board[i][col]===-1)
    return 3*i+col;
  }
  return -1;
}
function chkidDia1()
{
  for(let i=0;i<3;i++)
  {
    if(board[i][i]===-1)
    return 3*i+i;
  }
  return -1;
}
function chkidDia2()
{
  let j=2;
  for(let i=0;i<3;i++)
  {
    if(board[i][j]===-1)
    return 3*i+j;
    j--;
  }
  return -1;
}
function attack(turn){
  for(let i=0;i<3;i++)
  { 
    let count=0;
    for(let j=0;j<3;j++)
    {
      if(board[i][j]===turn)
      {
        count++;
      }
      if(board[i][j]===1)
      count--;
    }
    if(count===2)
    {
      let id=chkidRow(i);
      if(board[Math.floor(id/3)][id%3]===1)
      id=-1;
      return id;
    }
  }
  //vertical
  for(let i=0;i<3;i++)
  { 
    let count=0;
    for(let j=0;j<3;j++)
    {
      if(board[j][i]===turn)
      {
        count++;
      }
      if(board[i][j]===1)
      count--;
    }
    if(count===2)
    {
      let id=chkidCol(i);
      if(id===-1)
      return -1;
      else if(board[Math.floor(id/3)][id%3]===1)
      id=-1;
      return id;
    }
  }
  //diagonal1
    let countd=0;
    let iterator=0;
    for(let iterator=0;iterator<3;iterator++)
    {
      if(board[iterator][iterator]===turn)
      {
        countd++;
      }
      if(board[iterator][iterator]==1)
      countd--;
    }
    if(countd===2)
    {
      let id=chkidDia1(iterator);
      if(board[Math.floor(id/3)][id%3]===1)
      id=-1;
      return id;
    }

  //diagonal2
    let countd2=0;
    let kterator=0;
    let jterator=2;
    for(let kterator=0;kterator<3;kterator++)
    {
      if(board[kterator][jterator]===turn)
      {
        countd2++
      }
      if(board[kterator][jterator]===1)
      countd2--;
      jterator--;
    }
    if(countd2===2)
    {
      let id=chkidDia2(kterator);
      if(board[Math.floor(id/3)][id%3]===1)
      id=-1;
      return id;
    }

  return -1;
}

function computerturn(playerturn)
{
  var compTurn=-1;
  if(cross<2)
  {
    compTurn=Math.floor((Math.random()*10)-1);
    
    while(compTurn==playerturn || compTurn>8 || compTurn<0)
    compTurn=Math.floor((Math.random()*10)-1);
    // setvalue(element.id,1);
  }
  if(cross>=2)
  {
    compTurn=attack(0);
    if(compTurn==-1)
    compTurn=defense(1); 
  }
  if(compTurn==-1)
  {
    compTurn=Math.floor((Math.random()*10)-1);
    
    while(compTurn==playerturn || compTurn>8 || compTurn<0)
    compTurn=Math.floor((Math.random()*10)-1);
  }

  let row=Math.floor(compTurn/3);
  let col=compTurn%3;
  if(board[row][col]===1 || board[row][col]===0)
  {
    compTurn=Math.floor((Math.random()*10)-1);
    
    while(compTurn==playerturn || compTurn>8 || compTurn<0)
    compTurn=Math.floor((Math.random()*10)-1);
  }

  
  let element=document.getElementById(compTurn);
  element.removeEventListener('click',doTurn);

  let circleImg=document.createElement("img");
  circleImg.src="image/circle.svg";
  circleImg.height=130;
  circleImg.width=100;
  element.appendChild(circleImg); 
  
  setCompTurnVal(compTurn,0);
  circle++;

  // setvalue(3*row+col,1);
  
}
function doTurn(){
    let mark=document.createElement("img");
    mark.src="image/mark.svg";
    mark.height=130
    mark.width=100
    this.appendChild(mark); 
    cross++;
    setvalue(this.id,1);
}

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
    if(turn===1)
    alert ("Player + Wins" );
    else
    alert ("Computer Wins");
    
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

  computerturn(id);
  
  // document.getElementById("print").innerHTML=board;
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