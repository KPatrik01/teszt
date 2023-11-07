export class Camera{
    constructor(view){
        this.view = view;
        this.zoom = 1;
        this.wheelZoom = 1;
        this.stage = this.view.app.stage;
        window.addEventListener("wheel",this.onWheel.bind(this))
    }
    update(){
        // this.stage.position.x = -this.view.playerShape.container.position.x + window.innerWidth/2;
        // this.stage.position.y = -this.view.playerShape.container.position.y + window.innerHeight/2;
        this.zoomTo(this.wheelZoom);
    }
    zoomTo(newZoom){
        const cx = window.innerWidth/2;
        const cy = window.innerHeight/2;
        const newOffsetX = -newZoom*(cx-this.stage.position.x)/this.zoom+cx;
        const newOffsetY = -newZoom*(cy-this.stage.position.y)/this.zoom+cy;
        this.zoom = newZoom;
        this.stage.position.set(newOffsetX,newOffsetY);
        const targetX = window.innerWidth/2 - this.view.playerShape.container.position.x*this.zoom;
        const targetY = window.innerHeight/2 - this.view.playerShape.container.position.y*this.zoom;
        this.stage.position.set(targetX,targetY)
        this.stage.scale.set(this.zoom,this.zoom);
    }
    onWheel(e){
        this.wheelZoom=this.wheelZoom*(Math.pow(0.9,e.deltaY/100));
    }
}