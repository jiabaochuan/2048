/**
 * Created by jiabaochuan on 2016/11/27.
 */
function getTop(i,j){//小方块的top
    return 20+i*120;
}
function getLeft(i,j){//小方块的Left
    return 20+j*120;
}
function getNumberBgColor(number){//小方格背景色
    switch(number){
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67e5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#99cc00";
            break;
        case 1028:
            return "#33b5e5";
            break;
        case 2048:
            return "#0099cc";
            break;
        case 4096:
            return "#aa66cc";
            break;
        case 8192:
            return "#9933cc";
            break;
    }
    return "black";
}
function getNumberColor(number){//小方格文字颜色
    if(number<=4){
        return "#776e65";
    }
    return "#ffffff";
}
function  space(board){//判断小方格是否有数字(判断是否有空间)
    for(var i =0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){//判断是否可以左移
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noPrevent(row,cur1,cur2,board){
    for(var i=cur1+1;i<cur2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}
function canMoveDown(board){//判断是否可以下移
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){//不等于0，才有值，才可以移动
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noPreventDown(cur1,cur2,row,board){
    for(var i=cur1+1;i<cur2;i++){
        if(board[i][row]!=0){
            return false;
        }
    }
    return true;
}
function canMoveUp(board){//判断是否可以向上移动
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noPreventUp(cur1,cur2,row,board){//判断向上移动时是否有障碍物
    for(var i=cur1+1;i<cur2;i++){
        if(board[i][row]!=0){
            return false
        }
    }
    return true;
}
function canMoveRight(board){//判断是否可以右移
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noMove(board){
    if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)){
        return false;
    }
    return true;
}