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
6.[option]->[save bitmap font as]保存成fnt文件
```
