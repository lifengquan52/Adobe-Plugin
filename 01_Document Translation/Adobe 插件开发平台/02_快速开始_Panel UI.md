# 快速开始:制作你的第一个XD面板插件

让我们一起来一步步创建Adobe XD面板插件吧。

我们会开始简单的快速教程。一旦你完成了，你会牢固的掌握并开始创建自己的XD面板插件。

在这个教程的结尾，我们会建议一些进一步的步骤，可以让你进一步了解XD插件APIs。

# 先决条件
1. 基础的HTML,CSS和JavaScript知识
2. 一个文档编辑器来编写你的代码(例如 VScode,Subline Text, Brackets, Atom, etc)
   
# 开发步骤
```

完整的代码你可以在GitHub中进行查看

```

## 0.从I/O开发者控制台获取一个ID
在你开始之前，你会需要在I/O控制台进行注册。
1. 到I/O控制台进行注册和登录
2. 点击"创建插件"
3. 创建一个插件
4. 通过为其指定项目名称并单击"创建插件"来创建插件项目。请注意，该项目名称不是公开的。它仅对您可见，以后可以直接在控制台上进行更改。
5. （可选）在同一页面上，下载启动程序项目，该项目包含一个功能良好的Hello，World示例插件。
   
我们在下一个步骤中会使用插件ID

## 1. 定义你插件的位置
Adobe XD从[develop]中指定的文件夹加载插件。进入那个文件，简单的到菜单键里面：Plugins>Development>Show Develop Folder
当打开[develop]文件夹，我们就会进入到下一步。

## 2. 创建你的插件手脚架
在下一步，你会需要在[develop]文件夹中存储你能够创建的插件文件。给与你的喜好命名新的插件文件夹名称。
现在，让我们创建你的插件文件。打开你最喜欢的编辑器然后创建两个文件以及对应的扩展名称:
1. manifest.json
这个文件包含了插件的信息，例如它的名称，加入XD的菜单条目，以及其他更多。
[学习更多](https://adobexdplatform.com/plugin-docs/reference/structure/manifest.html)

2. main.js这个文件包含了你的Javascript 代码实现的插件功能。
[学习更多官员main.js](https://adobexdplatform.com/plugin-docs/reference/structure/handlers.html)

这两个文件会放置到你的父目录的插件中。当你有正确的结构时，就像如下文件夹所示：
```
my-plugin-folder
├── main.js
└── manifest.json
```
如果你想需要，这里可能会有更多的文件，但是这些文件是你最低级的需求，这是一本快速入门的教程。

## 3.创建你的插件manifest
在之前的步骤中，你创建了一个名为manifest.json的对象。打开这个文件，把如下的代码放置在JSON对象中。

```
{
  "id": "YOUR_ID_HERE",
  "name": "Enlarge a Rectangle",
  "version": "0.0.1",
  "description": "Description of your plugin.",
  "summary": "Summary of your plugin",
  "languages": ["en"],
  "author": "Your Name",
  "helpUrl": "https://mywebsite.com/help",
  "host": {
    "app": "XD",
    "minVersion": "18.0"
  },
  "uiEntryPoints": [
    {
      "type": "panel",
      "label": "Enlarge a Rectangle",
      "panelId": "enlargeRectangle"
    }
  ]
}
```
请确保替换你从Adobe I/O控制台获得的插件ID:
```
"id":"1234ABCD",
```
如果你好气气每一个条目的意思，请查看manifest文档，你能够学习关于所有manifest的需求用于出版一个XD插件管理器。
[panelId]属性可以是任何的字符串，在这个case中就是[enlargeRectangle].在下个章节，我们会查看此字符串是如何与我们的代码进项关联的。

## 4.创建你的插件代码
在下一步，我们需要为我们的插件创建JavaScript的代码。这些代码会主要存放在一个叫main.js的文件中，我们可以在步骤2中常见他们。

### 创建一个手脚架
首先让我们创建一些空的函数。复制和粘贴这些代码到 main.js:
```
function create(){}
function show(event){}
function update(selection){}

module.exports={
    panels:{
        enlargeRectangle:{
            show,
            update
        }
    }
}
```
现在，让我们看看每个函数的详细内容，通过一个[create]帮助函数我们会使用它创建我们的UI

### 创建UI
[create]函数是一个帮助函数能够帮助我们开始。这将要创建一个HTML [paenl]元素，插入我们的标记，并且添加一个点击的事件监听器。函数会分会我们的UI在代码中，但是不会显示它(我们会在下一步中获得)：

let panel;

function create(){
    //[1]
    const html=
    <style>
    .break {
        flex-wrap: wrap;
    }
    label.row > span {
        color: #8E8E8E;
        width: 20px;
        text-align: right;
        font-size: 9px;
    }
    label.row input {
        flex: 1 1 auto;
    }
    form {
        width:90%;
        margin: -20px;
        padding: 0px;
    }
    .show {
        display: block;
    }
    .hide {
        display: none;
    }
</style>

<form method="dialog" id="main">
    <div class="row break">
        <label class="row">
            <span>↕︎</span>
            <input type="number" uxp-quiet="true" id="txtV" value="10" placeholder="Height" />
        </label>
        <label class="row">
            <span>↔︎</span>
            <input type="number" uxp-quiet="true" id="txtH" value="10" placeholder="Width" />
        </label>
    </div>
    <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
</form>
}

<p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
`;

  function increaseRectangleSize() { // [2]
    const { editDocument } = require("application"); // [3]
    const height = Number(document.querySelector("#txtV").value); // [4]
    const width = Number(document.querySelector("#txtH").value); // [5]

    // [6]
    editDocument({ editLabel: "Increase rectangle size" }, function(selection) {
      const selectedRectangle = selection.items[0]; // [7]
      selectedRectangle.width += width; // [8]
      selectedRectangle.height += height;
    });
  }

  panel = document.createElement("div"); // [9]
  panel.innerHTML = html; // [10]
*   panel.querySelector("form").addEventListener("submit", increaseRectangleSize); // [11]



