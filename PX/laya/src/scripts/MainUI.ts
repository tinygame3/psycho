export default class MainUI extends Laya.Scene {
    private bg:Laya.Sprite;
    constructor() { 
        super(); 
        this.init();
    }
    
    init():void{
        this.bg = new Laya.Sprite()
        this.bg.loadImage("res/bg/bg_newyear.png");
        this.addChild(this.bg);
    }
}