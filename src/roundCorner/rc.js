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

        this.oriSize = cc.size(this.sp1.width, this.sp1.height);
        this.stepSize = cc.size((this.sp1.width - 10) / 5, (this.sp1.height - 10) / 5);
    },

    // 圆角
    changeRoundRadius(slider, cd) {
        let sp1 = this.sp1.getComponent(cc.Sprite);
        let m2 = sp1.getMaterial(0);
        let edge = slider.progress * 0.5;
        cc.log(`${edge}`);
        m2.setProperty("edge", edge);
        sp1.setMaterial(0, m2);
    },

    // change width
    changeWidth(slider, cd) {
        // let rate = slider.progress * this.oriSize.width;
        this.sp1.width = (slider.progress + 1) * this.oriSize.width;
    },
    // change width
    changeHeight(slider, cd) {
        // let rate = slider.progress * this.oriSize.width;
        this.sp1.height = (slider.progress + 1) * this.oriSize.height;
    },
    // update (dt) {},
});