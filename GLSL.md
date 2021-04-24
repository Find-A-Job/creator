# the book
https://thebookofshaders.com/?lan=ch

1.声明`uniform`类型需要在末尾加分号<br>
```
#if USE_OLD_PHOTO
  uniform OldPhoto {
    // 老化程度
    float oldLevel;
  };
#endif
```
2.声明定义函数
```
vec4 f1(vec2 a1, float a2){
  return vec4(1.0);
}

// 如果b<a返回0，否则返回1
step(a, b);
// a<c<b,c<a返回0,c>b返回1,否则返回0~1之间,若a>b返回undefined
smoothstep(a, b, c);
```

```
    // 目标节点targetNode
    genCameraNode(targetNode) {
        let size = cc.size(targetNode.width, targetNode.height)
        let node = new Node();
        node.size = size.clone();
        let camera = node.addComponent(cc.Camera);
        camera.backgroundColor = cc.Color.TRANSPARENT;
        camera.clearFlags = cc.Camera.ClearFlags.DEPTH |
            cc.Camera.ClearFlags.STENCIL |
            cc.Camera.ClearFlags.COLOR;
        // 设置你想要的截图内容的 cullingMask
        camera.cullingMask = 0xffffffff;
        // 不用对齐且适配屏幕
        camera.alignWithScreen = false;

        // 创建RenderTexture
        let texture = new cc.RenderTexture();
        texture.initWithSize(size.width, size.height);
        camera.targetTexture = texture;
        // 正交投影视窗尺寸，这个Size是当前正交摄像机高的一半的值
        camera.orthoSize = size.height / 2;
        cc.log(`orthoSize=${camera.orthoSize}, ${camera.zoomRatio}`);

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render();

        // 将精灵赋值给目标节点
        let node2 = targetNode; //cc.find('c2/sp1', this.node);
        let spriteFrame = new cc.SpriteFrame(texture);
        node2.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        // 图片需要翻转
        node2.scaleY = -1;
    },
```
