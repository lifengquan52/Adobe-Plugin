## 可行的API
Adobe XD提供了多个APIs分类：
· APIs用于整合XD自身内容，特别是起文档模型，scenegraph

· UXP的运行时，它提供了并非XD特定的所有功能：
1. 一个类浏览器的HTML和CSS引擎（ browser-like HTML and CSS engine），它驱动了XD本地的UIcomponents-它不是一个完整的浏览器引擎，但是能够让你构建类似webAPIs的UI以及框架。
2. Network APIs 很像网站标准XHR，fetch和WebSocket可以在浏览器中找到。
3. 常用的 core JavaScript language APIs 你能够在所有JS运行时中找到，例如setTimeout()以及Date
4. 一个简单的module-loader require()API

让我们看看怎么访问XD和UXP的APIs

```
什么是处理函数，handler function，handler function就是我们通常通常所说的专注于处理某一类数据或者任务的routine/function/method
举例：
· 事件处理Event Handler-接受和周围处理的事件和信号从周围的系统(e.g. OS 或者 GUI)。
· 内存处理 Memory Handler-执行某些在内存中的特殊任务
· 文件输入处理-一个函数接受文件输入并且在数据中执行特殊的人物，这所有的一切都取决于内容的上下文。


```
# XD-specific APIs
大多数XD APIs都可以通过require(),进行访问，但是有一些插件会直接传递给你的处理函数。

·selection-代表选择的节点以及相关的上下文。
 该对象通过参数传递给命令处理程序函数（参见上面）

scenergraph-APIs 在文档节点中。
1. 通常你使用scenegraph对象，只需访问传递给命令的处理函数（selection和documentRoot）
2. 为了在文档中创建新的节点，显式加载此模块以访问构造函数：
```
let Rectangle = require("scenegraph").Rectangle
let node = new Rectgangle();
```
## Scenegraph
一个Scenegraph代表用户文档。之所以这么称呼它，因为它是一个节点树 (一种图形)，当在一起时，代表着整个"scene"文档。Adobe XD 提供一个API用于操纵scenegraph。学习更多关于Scenegraph。


## SceneNodeList
场景节点列表。阅读更多