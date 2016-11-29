/**
 * Created by jiabaochuan on 2016/11/27.
 */
var board=new Array();
var score=0;
var hasimpact=new Array();//判断是否发生过碰撞
$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格
    init();
    //随机在两个格子生成数字
    createOneNumber();
    createOneNumber();
    //初始化分数
    score=0;
    scoreView(score);
}
function init(){//初始化
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gameCell=$("#game-cell-"+i+"-"+j);
            gameCell.css("top",getTop(i,j));
            gameCell.css("left",getLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasimpact[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasimpact[i][j]=false;
        }
    }
    boardView();
}

function  boardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#game-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$("#number-cell-"+i+"-"+j);

            if(board[i][j]==0){
                theNumberCell.css("width",0);
                theNumberCell.css("height",0);
                theNumberCell.css("top",getTop(i,j)+50);
                theNumberCell.css("left",getLeft(i,j)+50);
            }else{
                theNumberCell.css("width",100);
                theNumberCell.css("height",100);
                theNumberCell.css("top",getTop(i,j));
                theNumberCell.css("left",getLeft(i,j));
                theNumberCell.css("background-color",getNumberBgColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasimpact[i][j]=false;
        }
    }
}

function createOneNumber(){
    if(space(board)){
        return false;
    }
    //随机一个位置
    var x=parseInt(Math.floor(Math.random() * 4));
    var y=parseInt(Math.floor(Math.random() * 4));
    var times=0;
    while(times<50){//循环判断，优化算法
        if(board[x][y]==0){
            break;
        }
        x=parseInt(Math.floor(Math.random() * 4));
        y=parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    x=i;
                    y=j;
                }
            }
        }
    }
    //随机一个数字
    var number=Math.random()<0.5?2:4;//利用random()按半对半的概率生成

    //在随机位置上显示随机数字
    board[x][y]=number;
    showAnimate(x,y,number);
    return true;
}
$(document).keydown(function(event){
    event=event||window.event;
    switch(event.keyCode){
        case 37://left
            if(moveLeft()){
                setTimeout(createOneNumber(),300);
                setTimeout(isGameOver(),500);
            }
                break;
        case 38://up
            if(moveUp()){
                setTimeout(createOneNumber(),300);
                setTimeout(isGameOver(),500);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout(createOneNumber(),300);
                setTimeout(isGameOver(),500);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout(createOneNumber(),300);
                setTimeout(isGameOver(),500);
            }
            break;
        default:
            break;
    }
});
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i=0;i<4;i++){//双重循环，寻找落脚点
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noPrevent(i,k,j,board)){//move
                        moveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noPrevent(i,k,j,board)&&!hasimpact[i][k]){//move&&add
                        moveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        hasimpact[i][k]=true;
                        scoreView(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("boardView()",200);
    return true;
}
function moveDown(){//向下移动
    if(!canMoveDown(board)){
        return false;
    }
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noPreventDown(i,k,j,board)){//move
                        moveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noPreventDown(i,k,j,board)&&!hasimpact[k][j]){//move&&add
                        moveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][i];
                        hasimpact[k][j]=true;
                        scoreView(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("boardView()",200);
    return true;
}
function moveUp(){//向上移动
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noPreventUp(k,i,j,board)){
                        moveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noPreventUp(k,i,j,board)&&!hasimpact[k][j]){//move&&add
                        moveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        hasimpact[k][j]=true;
                        scoreView(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("boardView()",200);
    return true;
}
function moveRight(){//向右移动
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noPrevent(i,j,k,board)){//move
                        moveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noPrevent(i,j,k,board)&&!hasimpact[i][k]){//move&&add
                        moveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        hasimpact[i][k]=true;
                        scoreView(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("boardView()",200);
    return true;
}
function isGameOver(){
    if(space(board)&&noMove(board)){
        gameOver();
    }
}
function gameOver(){
    $("#jieshu").css("display","block");
}