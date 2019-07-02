import GameConfig from "../GameConfig";
import GlowFilter = Laya.GlowFilter;
import MainUI from "../scripts/MainUI";
  export default class HouseUI extends Laya.Scene {
    private bg:Laya.Sprite;
    public btlReturn:Laya.Button;
    private maxLeftX: number = 0;
    private maxTopY: number = 0;
    constructor() { 
        super();
        this.init();
    }
    
    private hourse:Laya.Sprite;
    init():void{
        this.autoDestroyAtClosed = true;
        this.bg = new Laya.Sprite();
        this.bg.loadImage("res/bg/bg_newyear.png");
        this.addChild(this.bg);
        this.bg.pos(0, 0);

        this.hourse = new Laya.Sprite();
        this.hourse.loadImage("res/item/win_165.png");
        this.addChild(this.hourse);
        this.hourse.pos(100, 750);
    }
    onEnable():void{
        this.btlReturn.on(Laya.Event.CLICK, this, this.onReturn);
    }
    onReturn():void {
        Laya.Scene.close("HouseScene.scene", "houseScene");
        MainUI.curScene.bStop = false;
    }
}
