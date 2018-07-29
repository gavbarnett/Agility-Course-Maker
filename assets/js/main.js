/* Notes:
 * Area = 30 x 30 m
 * 
 */

function main() {
    var canvas = document.createElement('canvas');
    
    canvas.id = "MainCanvas";
    canvas.width = 1224;
    canvas.height = 768;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);

    var Field = new field
    Field.draw()
    canvas.addEventListener("click",Field.click)
}

function field(){
    var xoffset = 10
    var yoffset = 10
    var x = 30
    var y = 30
    var scaler = 20
    var gridSize = 2
    this.scaled = [
        xoffset,
        yoffset,
        xoffset + x*scaler,
        yoffset + y*scaler,
    ]

    this.draw = function() {
        var canvas = document.getElementById('MainCanvas');
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#006400";
        ctx.fillRect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.strokeStyle = '#888888';
        for (i = 0; i <= x; i+=gridSize){
            ctx.moveTo(this.scaled[0] + i * scaler, this.scaled[1])
            ctx.lineTo(this.scaled[0] + i * scaler, this.scaled[3])
            ctx.stroke();
        }
        for (i = 0; i <= y; i+=gridSize){
            ctx.moveTo(this.scaled[0], this.scaled[1] + i * scaler)
            ctx.lineTo(this.scaled[2], this.scaled[1] + i * scaler)
            ctx.stroke();
        }

    }
    this.click = function(){
        output = []
        output = [((event.offsetX || event.layerX)-xoffset)/scaler, ((event.offsetY || event.layerY)-yoffset)/scaler]
        console.log (output)
    }
}

function getRelativeCoords(event) {
    output = []
    output = [event.offsetX || event.layerX, event.offsetY || event.layerY]
    console.log (output)
}