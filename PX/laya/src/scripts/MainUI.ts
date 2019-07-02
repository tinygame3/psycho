import GameConfig from "../GameConfig";
import GlowFilter = Laya.GlowFilter;
  export default class MainUI extends Laya.Scene {
    private bg:Laya.Sprite;
    public btlHouse:Laya.Button;
    public btlWorld:Laya.Button;
    public btlFriends:Laya.Button;

    private maxLeftX: number = 0;
    private maxTopY: number = 0;
    public bStop:boolean = false;
    public static curScene:MainUI;
    constructor() { 
        super();
        this.init();
    }
    
    private hourse:Laya.Sprite;
    init():void{
        this.bg = new Laya.Sprite()
        this.bg.loadImage("res/bg/bg_newyear.png", Laya.Handler.create(this, this.OnLoadBgCompleted));
        this.addChild(this.bg);
        this.bg.pos(0, 0);

        this.hourse = new Laya.Sprite()
        this.hourse.loadImage("res/item/win_164.png");
        this.addChild(this.hourse);
        this.hourse.pos(100, 750);
        this.hourse.on(Laya.Event.MOUSE_OUT, this, this.OnFocusOff, [this.hourse]);
        this.hourse.on(Laya.Event.MOUSE_OVER, this, this.OnFocusOn, [this.hourse]);
        this.hourse.on(Laya.Event.CLICK, this, this.OnHourseClick, [this.hourse]);
        MainUI.curScene = this;
    }
    onEnable(): void {
        this.btlHouse.on(Laya.Event.CLICK, this, this.onHouseClick);
        this.btlWorld.on(Laya.Event.CLICK, this, this.onWorldClick);
        this.btlFriends.on(Laya.Event.CLICK, this, this.onFriendsClick);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.OnMouseEnd);
        Laya.timer.frameLoop(1, this, this.onUpdate);
    }
    onDisable(): void{
        Laya.timer.clear(this, this.onUpdate);
    }
    onUpdate(): void{
        //this.hourse.pos(100 + this.bgX, 750 + this.bgY);
        //this.bg.x = this.bgX;
        //this.bg.y = this.bgY;
        console.log(this.bg.x)
    }

    private GlowFilter(hourse:Laya.Sprite, bShowGlow:Boolean): void {
        if (bShowGlow)
        {
            //创建一个发光滤镜
            var glowFilter: Laya.GlowFilter = new Laya.GlowFilter("#ffff00", 10, 0, 0);
            //设置滤镜集合为发光滤镜
            hourse.filters = [glowFilter];
        }
        else
        {
            hourse.filters = [];
        }

    }
    OnFocusOff(sp:Laya.Sprite):void {
        this.GlowFilter(sp, false);
    }
    OnFocusOn(sp:Laya.Sprite):void {
        this.GlowFilter(sp, true);
    }
    OnHourseClick(sp:Laya.Sprite) {
        this.bStop = true;
        Laya.Scene.open("HouseScene.scene", false);
    }
    OnLoadBgCompleted():void {
        this.maxLeftX = GameConfig.width - this.bg.width;
        if (this.maxLeftX > 0)
        {
            this.maxLeftX = 0;
        }
        this.maxTopY = GameConfig.height - this.bg.height;
        if (this.maxTopY > 0)
        {
            this.maxTopY = 0;
        }
    }

    private lastX:number = null;
    private lastY:number = null;

    private bgX:number = 0;
    private bgY:number = 0;
    OnMouseMove(): void {
        if (this.bStop) {
            return;
        }
        if (this.lastX == null || this.lastY == null)
        {

        }
        else
        {
            //return;
            var deltaX:number = Laya.stage.mouseX - this.lastX;
            var deltaY:number = Laya.stage.mouseY - this.lastY;
            this.bg.x = this.bg.x + deltaX;
            this.bg.y = this.bg.x + deltaY;
            this.bgX = this.bg.x;
            this.bgY = this.bg.y;
            
            if (this.bg.x > 0)
            {
                this.bg.x = 0;
            }
            if (this.bg.y > 0)
            {
                this.bg.y = 0;
            }
            if (this.bg.x < this.maxLeftX)
            {
                this.bg.x = this.maxLeftX;
            }
            if (this.bg.y < this.maxTopY)
            {
                this.bg.y = this.maxTopY;
            }
            this.hourse.pos(100 + this.bg.x, 750 + this.bg.y);
        }
        this.lastX = Laya.stage.mouseX;
        this.lastY = Laya.stage.mouseY;
    }
    OnMouseEnd(): void {
        this.lastX = null;
        this.lastY = null;
    }
    onHouseClick(e: Laya.Event):void{
        this.btlHouse.label = "pressed";
    }
    onWorldClick(e: Laya.Event):void{
        this.btlWorld.label = "pressed";
    }
    onFriendsClick(e: Laya.Event):void{
        this.btlFriends.label = "pressed";
    }
}
