## The manifest.json file

manifest 文件包含了你插件的一些源信息。简单来说，manifest是一个以json对象列出来的清单对象。清单中没有可执行代码。

## manifest案例
```
{
    "id":"你的Id",
    "name":"你插件的名称",
    "版本":"0.0.1",
    "icons":[
        {"width":24, "height":24,"path":"images/icons@1x.png"},
        {"width":48,"height":48,"path":"images/icons@2x.png"}
    ],
    //这是指的是宿主的意思，也就是本机的主机
    "host":{
        "app":"XD",
        "minVersion":"21.0"
    },
    //ui的整个入口点,在这个入口点，有两个子菜单选项
    "uiEntryPoints":[
        //在这个入口，其中有一个是如此
        {
            "type":"menu",
            "label":"Hello World Command",
            "CommanId":"helloCommand"
        },

        //这里也有一个面板类型
        {
            "type":"panel",
            "label":"Hello World 面板"
            "panelId":"helloPanel"
        }
    ]
}
```

查看下面的章节学习每一个 键/值 域。除非下面另有说明，否则所有字段均为必填字段。

## Top-level metadata | 顶级元数据
manifest.JSON对象等级包含高等级的信息在你的插件中。
```
这里有一些明确的关键字是"必填"选项"：
Develop - 必填项，用于运行XD，XD不会加载插件。
Publish - 必填选项的插件用于I/O控制台的提交，并且会出版在插件管理器中。
```


关键字 | 类型 | 描述 | 必要性
---|:--:|:--:|:--:
id | string 字符串 | 独一无二的插件识别符，你可以在Adobe 控制台获取 | Develop/Publish
name | string 字符串 | 这个名字应该是3-45个字符。请注意:我们推荐你的插件名称匹配你创建的项目名称，当你的插件ID来自I/O控制台。| Develop/Publish
version | srting | 这个是关于你插件的版本，使用x.y.z格式，版本必须是3个片段，并且每个子片段在0到99之间 | Develop/Publish
icons | array<object> 数组对象 | Icons展示在XD's 插件面板中。PNG,JPG/JPEG格式是被支持并且最大的每个icon尺寸为1MB，2个尺寸是必须的[24,48]请注意:Icons用于XD的插件管理它是通过XD插件管理器进行直接上传，不包括你插件本身，详情请看"Publishing your plugin" 指南来学习更多 | Publish
host.app |  string | 表示这是Adobe XD的插件(当前，此处唯一有效的值为"XD") | Develop/Publish
host.minVersion | string | 最小需要的版本号在宿主app中(在x,y格式)你可以运行插件。最低的有效版本和最低的有效版本用于屋头和模块化是13.0，最低的有效版本用于面板插件是21.0。 请注意:版本数字通常是两个片段，你会将次要的设置为0，例如16.0. | Develop/Publish
host.maxVersion | string | 宿主app可以运行这个插件的最大版本号，host.minVersion也是同样的格式 | Optional
uiEntryPoints | array<MenuItemDefinition> | 描述了整个你添加到插件菜单的插件"插件启动版"XD侧边栏，可以查看下一张杰的详细内容。 | Develop/Publish

## UI entry points
uiEntryPoints 域是一个数组对象，用于匹配菜单定义的子选项格式。这些条目既出现在本机菜单栏的"插件"菜单中，又出现在"插件启动板"侧栏面板中。有关如何显示这些条目的详细信息，请参见插件菜单结构。

每个entry点都指定了他们的[commandId 或者 panelId],创建直接动作命令或面板显示/隐藏命令。

## MenuItemDefinition
关键字 | 类型 | 描述
---|:--:|:--:
type | string | 入口点类型:"menu"或者"panel"
label | ？ string|LocaleMap | 需要有多个MenuItemDefinition对象来进行定义，如果只有一个被定义则忽略。
commandId | string | 指定commandId来创建一个菜单用于直接运行整个代码--一个无头的命令或带有模式对话框UI的命令。该标识符将菜单项链接到插件的JavaScript代码中的处理函数。该标识符在您的插件中必须是唯一的。请勿同时指定commandId和panelId。
panelId | string | 指定 [panelId] 用于创建一个菜单条目用于打开你面板的插件。此标识符将菜单项链接到插件的JavaScript代码中的面板定义对象。这个指示符需要在你的插件中独一无二。不要同时指定[commandId]以及[panelId]。
shortcut | Object | 可选，对象定义了Mac和Windows的键盘快捷键。你可以查看下列的"Keyboard shortcuts"


##键盘快捷键
例如:"shortcut": { "mac": "Cmd+Shift+P", "win": "Ctrl+Shift+P" }

键盘快捷键tongue不同的平台被进行定义，每个定义都遵循下列字符串的语法：
* 一个或者多个修改键，在任何的顺序中，么诶一个都跟着"+"
 * Mac: 修饰符可能是Cmd,Ctrl,Opt/Alt,或者 Shift.快捷键必须包含Cmd或者Ctrl其中一个选项。
 * Win: 修饰符可能包含Ctrl,Alt或者Shift。快捷键必须包含Ctrl。
  
* 字符或数字键
  * 字母不区分大小写(例如"CMD+P"以及"CMD+P"表示的相同的事情并且都不需要按Shift).
  * 其他的按键(包括标点符号，箭头键或F1-F12)目前不支持。

```
如果您的快捷方式与内置的XD命令或另一个插件的快捷方式发生冲突，则您的快捷方式将被忽略，并且您会看到一条警告打印在开发者控制台上
```


## 菜单本地化
插件菜单项标签或面板标签可以本地化以匹配XD当前的UI语言设置其他清单字段（例如[name]和[description]）不能被本地化。

本地化标签表示为包含多个翻译而不是单个字符串值的对象
```
"label":{
    "default":"Menu Label",
    "fr":"Etiquette de Menu",
    "de":"Menübezeichnung"
}
```

默认的字符串通常是必须的，该语言必须是ISO 639-1中的两个字母的代码，而不是诸如en-US之类的连字符代码。为避免与XD的其他内置菜单项不一致，将忽略XD不支持的语言。

```
你同样可以本地化字符串显示你自己的对话框UI，通过选择通过根据application.appLanguage的值选择在UI中使用哪些字符串。
```