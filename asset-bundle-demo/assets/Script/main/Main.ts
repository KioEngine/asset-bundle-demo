/**
* Copyright (c) 2020—2020 dsa  All rights reserved.
* Autor: Created by NEKOPARA  on 2020-07-27.
* Desc: 
* Tips: 
@exg Design：

@exp Use Cases：

*/

const {ccclass, property,inspector} = cc._decorator;

@ccclass
@inspector("packages://autoproperty/inspector.js")
export default class Main extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    @property(cc.Label)
    public loadTips: any = null;

    @property(cc.Label)
    public infoTip:cc.Label = null;

    @property(cc.Node)
    public showWindow: cc.Node = null;

    // @property({type: [cc.Label]})
    // public labels: Array<cc.Label> = [];

    private _audioSource: cc.AudioSource = null;

    private _isLoading: Boolean = false; //是否正在加载

    start () {

    }


    //加载背包ab,并实例化展示（实际运用：比如通过ui管理器打开背包ui）
    onLoadBag(){
        //当assetbundle被加载过之后，会被缓存下来，此时开发者可以使用ab名称来获取ab
        var testBundle = cc.assetManager.getBundle('prefab');
        if (testBundle || this._isLoading) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "prefab Bundle Loading....";
        cc.assetManager.loadBundle('prefab', (err,bundle) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            bundle.load('bag',cc.Prefab,(err,asset)=>{
                this._isLoading = false;
                this.loadTips.string = "Bundle loaded Successfully!";
                this.infoTip.string ="背包bundle加载成功";
                let node = cc.instantiate(asset)
                node.setParent(this.showWindow);
            })

        });
    }


    onLoadJson(){
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('resources');
        if (!testBundle) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Json file Loading....";
        testBundle.load("json/GameConfig",cc.JsonAsset, (err: Error, asset: cc.JsonAsset) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            console.log(asset);
            this.infoTip.string = "json文件加载成功，看控制台输出"
        });
    }

    onLoadScene(){
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('prefab');
        if (!testBundle) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.textKey = "Scene Loading....";
        testBundle.loadScene("sub-scene", (err: Error, asset: cc.SceneAsset) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.textKey = "";
            cc.director.runScene(asset);
        });
    }


    onLoadAudio(){
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('resources');
        if (!testBundle) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Audio Loading....";
        testBundle.load("audio/ss", (err: Error, asset: cc.AudioClip) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            var node = new cc.Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(cc.AudioSource);
            component.clip = asset;
            component.play();
            this._audioSource = component;
            this.infoTip.string = "音频加载成功"
            this.showWindow.addChild(node);
        });
    }

    onLoadSprite(){
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('resources');
        if (!testBundle) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Texture(Altas) Loading....";
        testBundle.load("atlas/gold", (err: Error, asset: cc.Texture2D) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            var node = new cc.Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(cc.Sprite);
            component.spriteFrame = new cc.SpriteFrame(asset);
            this.infoTip.string = "模拟图集加载成功"
            this.showWindow.addChild(node);
        });
    }

    onClickDestroy () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "cases/AssetBundle.9";
            return;
        }
        this._onClear();
        cc.assetManager.removeBundle(testBundle);
        this.loadTips.string = "销毁所有bundle";
    }

    onClickRelease () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "释放所有bundle";
            return;
        }
        this._onClear();
        testBundle.releaseAll();
    }

    _onClear () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    }
}
