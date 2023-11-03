export class Camera{
    constructor(view){
        this.view = view;
    }
    update(){
        const stage = this.view.app.stage;
        stage.position.x = -this.view.playerShape.container.position.x + window.innerWidth/2;
        stage.position.y = -this.view.playerShape.container.position.y + window.innerHeight/2;
    }
}