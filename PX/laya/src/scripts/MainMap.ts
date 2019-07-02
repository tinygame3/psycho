    
    import GameConfig from "../GameConfig";
    import MainUI from "../scripts/MainUI";
    export default class MainMap extends Laya.Sprite {
    constructor(curScene:MainUI) { 
        super();
        this.curScene = curScene;
    }
    private bg:Laya.Sprite;
    private hourse:Laya.Sprite;
    private curScene:MainUI;
    onEnable(): void {
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
        Laya.timer.frameLoop(1, this, this.onUpdate);
    }

    onDisable(): void {
        Laya.timer.clear(this, this.onUpdate);
    }
    onUpdate(): void {
        this.hourse.pos(100 + this.x, 750 + this.y);
    }
    OnLoadBgCompleted():void {
        this.curScene.maxLeftX = GameConfig.width - this.bg.width;
        if (this.curScene.maxLeftX > 0)
        {
            this.curScene.maxLeftX = 0;
        }
        this.curScene.maxTopY = GameConfig.height - this.bg.height;
        if (this.curScene.maxTopY > 0)
        {
            this.curScene.maxTopY = 0;
        }
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
        this.curScene.bStop = true;
        Laya.Scene.open("HouseScene.scene", false);
    }
}