# creator


### 零散的记录
1. `cc.loader.loadResDir` 这个函数有一个回调参数，如果回调函数执行失败，则会一直尝试重新执行回调函数
2. 代码设置九宫格拉伸范围<br>
```
                let sp=this.getConponent(cc.Sprite)
                sp.type = cc.Sprite.Type.SLICED
                bib=sp.spriteFrame
                bib.insetTop = 4
                bib.insetBottom = 5
                bib.insetLeft = 4
                bib.insetRight = 5
```
3. ~带脚本的预制体编辑完成后，拖入其他脚本的属性栏中。如果后续更改了预制体... <br>
添加了脚本组件的预制体，如果将需要动态调整的参数设置为...<br>
当属性出现在面板上时，通过代码修改...<br>
脚本a绑定在预制体b上，并且将属性c暴露在面板上。将预制体b加入另一个脚本d中，并实例化。这时如果在脚本a里通过代码修改属性c，那么...<br>
脚本优先使用面板上设定的值，如果想动态更改，...<br>
当脚本上的属性暴露在面板上时，每次修改脚本...<br>
本来节点的面板上的属性会因为代码修改而自动更新，但是如果（将这个节点转为）预制体作为参数放在另一个脚本上，则另一个脚本上的数据不会因为预制体更新而更新，...~<br>
上面都是欲言又止没想明白该怎么表达<br>
总之就是如果发现修改数值后没反应，就重新拖放一下<br>
4. 层级管理器中的节点会执行onload、start等生命回调函数，但是将该节点修改为预制体并使用cc.initiate实例化后，则不会执行，所以实例化后需要自己调用初始化相关数据<br>
5. 层级管理器中有一个节点NodeA,它上面挂载着一个脚本jsA，在脚本B中的start中有设置this.abc=0，且有一个和start同级的函数funcA,里面有使用this.abc。层级管理器中有另外一个节点NodeB，挂载着脚本jsB,且该脚本的属性检查器中挂载着节点NodeA。此时在jsB中使用this.NodeA.getComponent('jsA').funcA(),这时在funcA中this并不是之前的this，所以也就找不到this.abc。所以在jsA的开头let xxx =cc.Class({}),然后在start里设置xxx.ins=this,并在funcA中调用xxx.ins就可以等同于理想情况下的this<br>
6. `把addChild的操作放到setColor后面就可以改变颜色了，先addChild再改变颜色就没有效果`，用代码增加节点时，先设置完属性，再设置父节点<br>
7. 添加子节点失败，节点A下有个节点B和节点C，B·C同名，但B在属性检查器中将显示的勾取消了，也就是说B不可见。这时想将实例化后的预制体pA作为子节点加入节点C下,而使用A节点查找子节点C(用getChildByName)，这时查找到的不是C（因为加入(A.getChildByName(）.addChild())后pA不可见），然后将B改名，再次执行，pA成功显示<br>
### js

```
    properties: {
        map: {
            default: null,
            type: cc.Node,
        },
        cursor: {
            default: null,
            type: cc.Node,
        },
    },
-- 调用cc.node类型的属性，访问时直接用
   this.map.x
   或
   this.map.position.x
-- 不需要多加个node
   this.map.node.x (错误)
```
```
-- 获取窗口size
   let s=cc.winSize
   s.width and s.height
  ```
  
### 预制节点prefab
```
1.在层级管理器中编辑好节点，然后拖入资源管理器，并删除层级管理器中的节点
2.在脚本中引用
        ...
        moveCell: {
            default: null,
            type: cc.Prefab
        },
        ...
        var map = this.map
        var node = cc.instantiate(this.moveCell);
        node.parent = map;
        node.setPosition(216, 240);
3.在cretor面板中，将prefab拖入对应的脚本
```

### 用代码加载图片
```
目录结构
-- assets
  -- resources
    -- sword
      -- sword_stay1.png
      -- sword_stay2.png
      -- sword_stay3.png
1.用cc.loader
        cc.loader.loadRes("sword/sword_stay1", cc.SpriteFrame, function(err, spriteFrame) {
            // self.node.getComponent(cc.Sprite).
            sp.spriteFrame = spriteFrame;
        })

2.用cc.url.raw，用这个方法加载的图片能做的操作有限，比如无法获取图片宽高，无法翻转图片，若需要使用这些功能，请使用cc.loader
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/sword/sword_stay1.png"));
        
3.cc.resources.load(creator 2.3.1 用不了，会报错invoking function failed,暂时没找到原因)// 版本不对
```

### 创建节点-绑定动画
```
        let that = this
        let oriSize = cc.size(32, 32)
        let scale = 3
        let desSize = that.sizeMultiplication(oriSize, scale)
        let heroAnchor = cc.v2(0.5, 0)
        let defPos = cc.v2(desSize.width * 2.5 / 2, desSize.height * 0)
        let stayAniSpeed = 1.5
        let heroName = ""
        let spritePath = "q1/q_05"

        var node = new cc.Node(heroName);
        node.width = desSize.width
        node.height = desSize.height
        node.setAnchorPoint(heroAnchor)
        node.setPosition(defPos)
        var sp = node.addComponent(cc.Sprite);
        sp.type = cc.Sprite.Type.SIMPLE
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sp.trim = false
        node.parent = this.herosLayout;

        // 绑定动画
        var animation = node.addComponent(cc.Animation);

        /* 添加SpriteFrame到frames数组 */
        var frames = [];
        frames[0] = new cc.SpriteFrame(cc.url.raw('resources/sword/sword_stay1.png'));
        frames[1] = new cc.SpriteFrame(cc.url.raw('resources/sword/sword_stay2.png'));
        frames[2] = new cc.SpriteFrame(cc.url.raw('resources/sword/sword_stay3.png'));

        var clip = cc.AnimationClip.createWithSpriteFrames(frames, 3);
        clip.name = 'anim_boom';
        clip.wrapMode = cc.WrapMode.PingPongReverse;//乒乓反转

        clip.speed = stayAniSpeed // 倍速播放，默认值为1，数值越大播放速度越快,0停止播放,负值也可以，效果等同于其绝对值（1==-1）

        animation.addClip(clip);
        animation.play('anim_boom');
```

### 画菱形

```
        // 以pos为原点，oStep为步长，画直径为((2*tStep+1)*oStep)的方块圆
        let getMoveRange = function(pos, oStep, tStep) {
            let ap = []
            for (let i = 0; i < tStep * 2 + 1; i++) {
                for (let j = 0; j < tStep * 2 + 1; j++) {
                    if (Math.abs(i - tStep) > Math.abs(Math.abs(j - tStep) - tStep)) {
                        continue
                    }  
                    ap.push({ x: pos.x - (tStep - i) * oStep, y: pos.y + (tStep - j) * oStep })
                }
            }
            return ap
        }
```
<details>
  <summary>图解(点击左侧小三角可以展开示意图)</summary>    
    
            /* 横坐标为i，纵坐标为j，tStep为3
            * 0  1  2  3  4  5  6
            0          *         
            1       *  *  *      
            2    *  *  *  *  *   
            3 *  *  *  *  *  *  *
            4    *  *  *  *  *   
            5       *  *  *      
            6          *         

            -- 当Math.abs(i - tStep)后横坐标就变为
            * 3  2  1  0  1  2  3
            0          *         
            1       *  *  *      
            2    *  *  *  *  *   
            3 *  *  *  *  *  *  *
            4    *  *  *  *  *   
            5       *  *  *      
            6          *         

            -- 当Math.abs(j - tStep)后纵坐标就变为
            * 3  2  1  0  1  2  3
            3          *         
            2       *  *  *      
            1    *  *  *  *  *   
            0 *  *  *  *  *  *  *
            1    *  *  *  *  *   
            2       *  *  *      
            3          *         

            -- 当Math.abs(Math.abs(j - tStep) - tStep)后纵坐标就变为
            * 3  2  1  0  1  2  3
            0          *         
            1       *  *  *      
            2    *  *  *  *  *   
            3 *  *  *  *  *  *  *
            2    *  *  *  *  *   
            1       *  *  *      
            0          *         
            
            
            
            
            */
</details>


### bmFont使用方法
```
1.打开[option]->[font settings]，设置一下size就行
2.[option]->[export option]
  设置width和height，比(导入的资源)总尺寸稍大一点
  [bit depth] -- 32
  A -- outline
  R -- glyph
  G -- glyph
  B -- glyph
  [font descriptor] -- text
  textures -- png
3.[edit]->[open image manager]->[image]->[import image]->选择一张图片（一个数字一张图片）->填写id（就是对应的ASCII码)
4.主界面右边的选项一个都不要勾上
5.[option]->[visualize]可以预览，如果width和height设置的太小就不能预览
6.[option]->[save bitmap font as]保存成fnt文件（还会附带一个文件，类型取决于textures设置)
7.将生成的fnt文件和png文件一起拖入creator
8.设置label属性，把[use system font]取消选中,然后拖动bf文件到font选项上
```
### tiled使用方法
```
// 首先需要注意的就是，保存的tmx文件要和原图放在同一个文件夹中，到时候一起拖到creator里，如果没放在一起则会提示找不到文件，这时可以用文本编辑器打开tmx文件，修改里面的路径(是相对路径)

1. 准备好地图块，可以是一整张地图
2. 新建一个地图，设置地图宽高和块宽高
3. 然后在[地图]-[新图块]-[浏览],选择那张准备好的地图，名字可以不填，会自动设为同名，要保持名字一致。设置块宽高
4. 工具栏有图章刷，地形刷，填充，橡皮擦。选择图章刷，然后在图块那里左键点选或拖动图块，选择好后就可以在作画了
5. 添加图层，可以将不同的图块放在不同的图层用以区分
6. 地形
7. 保存为tmx文件，将图片和该文件拖入creator资源管理器中
```
### 难点
1. 目标：沉浸式体验，地图铺满屏幕，移动过程中不露出黑边或白边背景。<br>
问题：地图在移动时，每次移动固定的距离，屏幕尺寸和地图尺寸不协调，会导致游戏变为非全屏，影响体验。<br>
解决方案：原游戏是尺寸适应，模拟器是留有黑边。我采取的方法是，在移动到边缘时，最后一次移动改为非固定距离移动，保证地图边缘紧贴屏幕边缘<br>
2. 目标：分离图片资源<br>
问题：动画帧被合并在图集中，手动分离很费力<br>
解决方案：用golang写了一个操作图片的程序，可以将非透明图片转换为带透明度的图片，将图集分离为多个单张图片，颜色替换<br>
3. 目标：制作序列帧动画（序列帧动画中的图片尺寸不一定相同）<br>
问题：<br>
```
            ...
            var sp = node.addComponent(cc.Sprite);
            sp.type = cc.Sprite.Type.SIMPLE
            sp.sizeMode = cc.Sprite.SizeMode.RAW;
            // sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sp.trim = false
            ...
            let animation = node.addComponent(cc.Animation);
            // asstes是一个数组序列帧动画需要的所有spriteframe资源
            // enums.Ca是一个map，包含从name到index的映射
            for (let ani = 0; ani < assets.length; ani++) {
                const an = assets[ani];
                let info = an.name.match(/([a-z]+|\d+)/g)
                let clipInd = (info[0] + '').toUpperCase()
                let clip = clips[enums.Ca[clipInd]]
                if (!('frames' in clip)) {
                    clip.frames = new Array(clip.sample)
                }
                let frameInd = parseInt(info[1]) - 1
                // ！！！！！！！！
                // how to modify an's prop to make it
                clip.frames[frameInd] = an
            }
            // clips是一个数组，里面存放着每个动画所需要的信息，包括frames，sample，type，wrapMode，speed
            for (let iteInd = 0; iteInd < clips.length; iteInd++) {
                let ite = clips[iteInd]
                let clip = cc.AnimationClip.createWithSpriteFrames(ite.frames, ite.sample);
                clip.name = ite.type;
                clip.wrapMode = ite.wrapMode;
                clip.speed = ite.speed; // 倍速播放，默认值为1，数值越大播放速度越快,0停止播放,负值也可以，效果等同于其绝对值（1==-1）
                animation.addClip(clip);
            }
```
这样设置完后，节点尺寸就可以随着序列帧图片的尺寸不同而改变<br>
但是我想将原图先放大n倍<br>
是否能直接修改图片资源的orisize，使其可以作用于raw属性<br>
~将sprite的sizeMode设置为raw后，节点大小会随着序列帧图片的尺寸不同而改变。但是序列帧的原始尺寸不是我想要的尺寸，我需要先将这个尺寸放大n倍，然后再设置为动画。~<br>
解决方法:<br>
1. ~SizeProvider ~
2. 通过监听SIZE_CHANGED事件`node.on(cc.Node.EventType.SIZE_CHANGED, node.sizeChange, this);`<br>
我猜测raw属性其实就是不断改变node的size，所以我直接覆盖node的setContentSize方法。完美解决<br> 
```
        node.setContentSize = (size) => {
            cc.log(`set size, ${arguments.length}, ${size}`)
            node.width = size.width * dc
            node.height = size.height * dc
        }
```
4.有一份原图，现在需要放大x倍后作为九宫格使用
5.有一组序列帧图片，每个图片尺寸可能一样也可能不一样，现在需要放大x倍且SizeMode设置为RAW。覆盖node的setContentSize方法
