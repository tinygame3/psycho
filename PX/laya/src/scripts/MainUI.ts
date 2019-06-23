  export default class MainUI extends Laya.Scene {
    private bg:Laya.Sprite;
    public btlHouse:Laya.Button;
    public btlWorld:Laya.Button;
    public btlFriends:Laya.Button;
    constructor() { 
        super();
        this.init();
    }
    
    init():void{
        this.bg = new Laya.Sprite()
        this.bg.loadImage("res/bg/bg_newyear.png");
        this.addChild(this.bg);
    }
    onEnable(): void {
        this.btlHouse.on(Laya.Event.CLICK, this, this.onHouseClick);
        this.btlWorld.on(Laya.Event.CLICK, this, this.onWorldClick);
        this.btlFriends.on(Laya.Event.CLICK, this, this.onFriendsClick);
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
