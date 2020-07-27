/**
* Copyright (c) 2020—2020 dsa  All rights reserved.
* Autor: Created by NEKOPARA  on 2020-07-27.
* Desc: 
* Tips: 
@exg Design：

@exp Use Cases：

*/

const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onJumpToMainScene(){
        cc.assetManager.loadBundle("res",(err,bundle)=>{
            if(!err){
                cc.director.loadScene("main");
            }
        })
    }

    // update (dt) {}
}
