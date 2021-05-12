// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import * as sdkTool from "./main";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property({
        type: cc.Prefab,
    })
    pipePF: cc.Prefab = null;

    // 
    // 
    // 所有水管
    _pipes: [cc.Node, cc.Node][] = [];

    // height 竖排两个水管之间的间隔
    // width 横排两个水管之间的间隔
    _space: cc.Size = cc.size(300, 200);

    // 横排水管数量
    _horNum: number = Math.ceil(cc.winSize.width / this._space.width) + 1;

    // 初始坐标
    _startX: number = 0;

    // 最右边水管的x轴坐标,后续添加的水管坐标会根据这个变量进行调整
    _rightX: number = 0;

    // 游标，指向x值最大的pipe的下标
    _rightPipeInd: number = 0;

    // LIFE-CYCLE CALLBACKS:

    _randomPosX = function (): number {

        return Math.round(Math.random() * (cc.winSize.height - 2 * this._space.height)) + this._space.height;
    };

    _beginMove = function () {
        let moveTime = 1;
        cc.tween().by(moveTime, { x: -(this._space.width) });
    };

    onLoad() {
        // wx7beb89e9aa81487f wx app id
        // 84969c98ebbbf5d2de15463f1b760859 app secret
        // A16DEA06A2A8450E9486F4B8A6B5610B app id
        // talkingdata.a16dea06a2a8450e9486f4b8a6b5610b schema 灵动分析

        // 用箭头函数会导致 需指定版本的iOS才能预览
        // console.log('wx.console touch test');

        // var tdweapp = require('./sdk/tdweapp.js'); 错误的示范
        // var tdweapp = require('./tdweapp.js'); 正确的

        // 在ts中拿到js文件中定义的全局变量
        // 以window['xxx']或者window['GameGlobal']['xxx']的方式调用;
        // var tdweapp = require('./tdweapp.js');
        // let sdk = window['tdAppSdk'];
        // cc.log(`log test = ${this._horNum}, ${this._space}, ${this._startX}, ${this._rightX}`);
        this._rightX = this._startX;
        for (let i = 0; i < this._horNum; i++) {
            let r = this._randomPosX();
            // Math.round(Math.random() * (cc.winSize.height - 2 * this._space.height)) + this._space.height;

            // 顶 管
            let node = cc.instantiate(this.pipePF);
            node.parent = cc.find('pipeLayout', this.node);
            node.height = r;
            node.x = this._rightX;
            node.getComponent(cc.Widget).updateAlignment();

            // 底 管
            let node2 = cc.instantiate(this.pipePF);
            node2.parent = cc.find('pipeLayout', this.node);
            node2.height = cc.winSize.height - r - this._space.height;
            node2.x = this._rightX;
            let n2w = node2.getComponent(cc.Widget);
            n2w.isAlignTop = false;
            n2w.isAlignBottom = true;
            n2w.bottom = 0;
            n2w.updateAlignment();

            this._pipes.push([node, node2]);
            // 更新`_rightX`
            this._rightX = node.x + this._space.width;
        }

        // 游标指向
        this._rightPipeInd = this._pipes.length - 1;


        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            // 用箭头函数会导致 需指定版本的iOS才能预览
            // console.log('wx.console touch test');

            let sdk = window['tdAppSdk'];

            // console.log(`GameGlobal = ${sdk}, ${window}, ${window['GameGlobal']}, ${window['tdAppSdk']};`);
            console.log(`GameGlobal = ${window}, ${window['GameGlobal']};`);
            // for (let p in window){
            //     console.log(`${p}`);
            // }
            console.log(`----------------`);
            for (let p in window['tdAppSdk']) {
                console.log(`${p}`);
            }
            sdk.event({
                id: 'eventId',
                label: 'eventLabel',
                params: {
                    key1: 'value1',
                    key2: 'value2'
                }
            });
            return;
            wx.navigateToMiniProgram({
                appId: '',
                path: 'page/index/index?id=123',
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'develop',
                success(res) {
                    console.log(`success = ${res}`);

                    for (let key in res) {
                        console.log(key + '---' + res[key])
                    }
                    // 打开成功
                },
                fail(res) {
                    console.log(`fail = ${res}`);

                    for (let key in res) {
                        console.log(key + '---' + res[key])
                    }
                }
            })
        });

        // console.log(`${sdkTool.mKey}`);
        // sdkTool.sayHello();
        sdkTool.platformTest();
    }

    start() {

    }

    update() {
        for (let i = 0; i < this._pipes.length; i++) {
            const element = this._pipes[i];

            if (element[0].x > -(cc.winSize.width / 2 + element[0].width)) {
                continue;
            }

            let np = this._pipes[this._rightPipeInd][0].x + this._space.width;
            element[0].x = np;
            element[1].x = np;
            let r = this._randomPosX();
            element[0].height = r;
            element[1].height = cc.winSize.height - r - this._space.height;
            element[0].getComponent(cc.Widget).updateAlignment();
            element[1].getComponent(cc.Widget).updateAlignment();


            // 游标指向
            this._rightPipeInd = i;
            break;
        }
    }
}
