import GameConfig from "../GameConfig";
import GlowFilter = Laya.GlowFilter;
import MainMap from "./MainMap";
import WorldMap from "./WorldMap";
  export default class MainUI extends Laya.Scene {

    public btlHouse:Laya.Button;
    public btlWorld:Laya.Button;
    public btlFriends:Laya.Button;

    public maxLeftX: number = 0;
    public maxTopY: number = 0;
    public bStop:boolean = false;
    public static curScene:MainUI;
    private curMap:Laya.Sprite;
    constructor() { 
        super();
        this.init();
    }
    

    init():void{
        MainUI.curScene = this;
    }
    onEnable(): void {
        this.btlHouse.on(Laya.Event.CLICK, this, this.onHouseClick);
        this.btlWorld.on(Laya.Event.CLICK, this, this.onWorldClick);
        this.btlFriends.on(Laya.Event.CLICK, this, this.onFriendsClick);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.OnMouseEnd);
        //Laya.timer.frameLoop(1, this, this.onUpdate);
        this.switchMap(1);
    }
    onDisable(): void{
        //Laya.timer.clear(this, this.onUpdate);
    }
    onUpdate(): void{
        //this.hourse.pos(100 + this.bgX, 750 + this.bgY);
        //this.bg.x = this.bgX;
        //this.bg.y = this.bgY;
        //console.log(this.bg.x)
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
            this.curMap.x = this.curMap.x + deltaX;
            this.curMap.y = this.curMap.x + deltaY;
            this.bgX = this.curMap.x;
            this.bgY = this.curMap.y;
            
            if (this.curMap.x > 0)
            {
                this.curMap.x = 0;
            }
            if (this.curMap.y > 0)
            {
                this.curMap.y = 0;
            }
            if (this.curMap.x < this.maxLeftX)
            {
                this.curMap.x = this.maxLeftX;
            }
            if (this.curMap.y < this.maxTopY)
            {
                this.curMap.y = this.maxTopY;
            }
            //
        }
        this.lastX = Laya.stage.mouseX;
        this.lastY = Laya.stage.mouseY;
    }
    OnMouseEnd(): void {
        this.lastX = null;
        this.lastY = null;
    }
    onHouseClick(e: Laya.Event):void{
        //this.btlHouse.label = "pressed";
        this.switchMap(1);
    }
    onWorldClick(e: Laya.Event):void{
        this.switchMap(2);
    }
    onFriendsClick(e: Laya.Event):void{
        //this.btlFriends.label = "pressed";
    }
    switchMap(index:number):void{
        this.btlHouse.selected = false;
        this.btlWorld.selected = false;
        this.btlFriends.selected = false;
        this.removeChild(this.curMap);
        if (index == 1)
        {
            this.btlHouse.selected = true;        
            this.curMap = new MainMap(this);
        }
        if (index == 2)
        {
            this.curMap = new WorldMap(this);
            this.btlWorld.selected = true;
        }
        if (index == 3)
        {
            this.btlFriends.selected = true;
        }
        this.addChildAt(this.curMap, 0);
    }
}
