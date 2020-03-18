// 1.从scenegraph获取矩形和颜色的对象
const {Rectangle,Color} =require("scenegraph");

// 2.创造处理函数handler function 
function RectangleHandlerFunction(selection){
//3.创建的内容
    //创建一个新的矩形
    const newElement = new Rectangle();
    //矩形的宽度100px
    newElement.width=100;
    //矩形的高度是50px
    newElement.height=;
    //矩形的颜色是紫色
    newElement.fill=new Color("Purple");

//4.添加矩形父元素中的到左上角的坐标轴，默认是(0,0)
selection.insertionParent.addChild(newElement);

//5.新对象的坐标轴自动移动到100,100
newElement.moveInParentCoordinates(100,100);
}

//6.通过commands属性导出一个对象，commands的值是一个与JavaScript处理函数相关联的处理函数(当前是RectangleHandlerFunction),与清单的commandId属性一起使用,必须与mainfest.json清单中声明的​​commandId值完全匹配。
module.exports={
    commands:{
        createRectangle: RectangleHandlerFunction
    }
}