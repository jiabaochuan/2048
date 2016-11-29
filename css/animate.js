/**
 * Created by jiabaochuan on 2016/11/27.
 */
function showAnimate(x,y,number){//
    var numberCell=$("#number-cell-"+x+'-'+y);
    numberCell.css('background-color',getNumberBgColor(number));
    numberCell.css("color",getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getTop(x,y),
        left:getLeft(x,y)
    },50)
}
function moveAnimation(x,y,x1,y1){//移动动画效果
    var numberCell=$("#number-cell-"+x+"-"+y);
    numberCell.animate({
        top:getTop(x1,y1),
        left:getLeft(x1,y1)
    },200);
}
function scoreView(score){
    $("#score").text(score);
}