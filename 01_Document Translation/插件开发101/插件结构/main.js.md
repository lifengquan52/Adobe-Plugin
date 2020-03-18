## main.js 文件
       在manifest.json中声明的每个UI入口点都必须通过从main.js模块导出的定义来实现。
              
                     置module.exports的值进行导出：
              `
              dule.exports = {
                      commands: {
                    // definitions for each commandId in manifest go here
                },
                      panels: {
                    // definitions for each panelId in manifest go here
          },
       ;
              `
       
根据UI入口点的类型，您需要导出的内容的细节有所不同。一个插件可以使用多种类型的UI入口点。

## 直接动作命令(commandId)
[exports.commands] 是一个遍历连接[commandId]从 manifest 到一个JS handler函数。
Manifest:
```
"uiEntryPoints": [
    {
        "type": "menu",
        "label": "Hello World Command",
        "commandId": "helloCommand"
    }
]
```

mani.js:
```
    function sayHello(selection,documentRoot){
        console.log('Hello,world!');
    }

    module.exports = {
        commands:{
            helloCommand:sayHello
        }
    }
```

请注意，导出的地图对象如何建立从清单到代码的连接：
1.commandId 来自 manifest, helloCommand是关键
2.handler函数，[sayHello]是键映射到的值

每次调用程序的处理命令都是被引用，然后XD通过它提供有用上下文的两个参数。您的处理程序功能可以在对话框中显示UI和/或编辑XD文档。

Panel UI (panelId)
exports.panels 是将清单中的每个panelId链接到代码中的JS面板对象的映射。

Manifest:
```
"uiEntryPoints": [
    {
        "type": "panel",
        "label": "Hello World Panel",
        "panelId": "helloPanel"
    }
]
```


main.js
```
function show(event) {
    let dom = document.createElement("panel");
    dom.innerHTML = `
        <form method="dialog" id="main">
        </form>
    `;
    event.node.appendChild(dom);
}

function hide(event) {
    event.node.firstChild.remove();
}

function update(selection, documentRoot) {
    // ...update panel DOM based on selection...
}

module.exports = {
    panels: {
        helloPanel: {
            show,
            hide,
            update
        }
    }
};
```

请注意，导出的地图对象如何建立从清单到代码的连接：
