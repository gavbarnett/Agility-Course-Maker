/* Notes:
 * Area = 30 x 30 m
 * 
 */
var Field = new field
var Equipment = []

function main() {
    var canvas = document.createElement('canvas');
    
    canvas.id = "MainCanvas";
    canvas.width = 1224;
    canvas.height = 768;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    Field.draw()
    buttonMaster()
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

function equipment(type){
    this.type = type
    this.draw = function(){
        var canvas = document.getElementById('MainCanvas');
        var ctx = canvas.getContext("2d");
        switch(this.type){
            case "Jump":
                console.log("jump")
        }
    }

}


/*Boring Functions*/
function getRelativeCoords(event) {
    output = []
    output = [event.offsetX || event.layerX, event.offsetY || event.layerY]
    console.log (output)
}

function buttonMaster(){
    var canvas = document.getElementById('MainCanvas');
    canvas.addEventListener("click",Field.click)
    document.addEventListener("keydown", function(e){
        var keyvalue = e.keyCode
        switch(keyvalue){
            case 67: //C 
                Equipment.push(new equipment("Contact"))
                break
            case 79: //O
                Equipment.push(new equipment("Over"))
                break
            case 84: //T
                Equipment.push(new equipment("Through"))
                break
            case 87: //W
                Equipment.push(new equipment("Weave"))
                break
        }
    })
}