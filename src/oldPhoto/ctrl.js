// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.sp1 = cc.find('sp1', this.node);

        if (!this.sp1) {
            cc.log(`empty sp1`);
            return;
        }
    },

    // 老化程度
    oldDegree(slider, cd) {
        cc.log(`${slider.progress}`);
        let sp = this.sp1.getComponent(cc.Sprite);
        let m = sp.getMaterial(0);
        m.setProperty("oldLevel", slider.progress);
        sp.setMaterial(0, m);
    },

    // update (dt) {},
});