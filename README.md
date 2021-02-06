# creator

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

2.用cc.url.raw
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/sword/sword_stay1.png"));
        
3.cc.resources.load(creator 2.3.1 用不了，会报错invoking function failed,暂时没找到原因)
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
  <summary>图解</summary>    
    
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
