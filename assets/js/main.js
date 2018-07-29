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

//http://agilitynerd.com/images/CourseLegend.jpg
allEquipment = []
allEquipment["Contact"] = ["A-frame","Dog Walk"]
allEquipment["Over"] = ["Winged Single Jump","Spread", "Tire Jump"]
allEquipment["Through"] = ["Tunnel","Chute"]
allEquipment["Weave"] = ["6", "9", "12"]

function field(){
    var mouse = []
    mouse.x = 0
    mouse.y = 0
    var xoffset = 10
    var yoffset = 10
    var x = 30
    var y = 30
    var scaler = 20
    this.gridSize = 5
    this.scaled = [
        xoffset,
        yoffset,
        xoffset + x*scaler,
        yoffset + y*scaler,
    ]
    PlacedEquipment = []
    var tempEquipment
    this.AddTempEquipment = function(inputType){
        tempEquipment = []
        tempEquipment.type = inputType
        tempEquipment.rotation = 0
    }
    this.SwitchTempEquipment = function(){
        if (tempEquipment){
            if ((allEquipment[tempEquipment.type[0]].length-1)>tempEquipment.type[1]){
                tempEquipment.type[1] += 1
            } else{
                tempEquipment.type[1] = 0
            }
            console.log (tempEquipment.type)
        }
    }
    this.RotateTempEquipment = function(){
        if (tempEquipment){
            tempEquipment.rotation += Math.PI/8
            if(tempEquipment.rotation >= Math.PI*2){
                tempEquipment.rotation = 0 
            }
            console.log (tempEquipment)
        }
    }
    this.PlaceEquipment = function(test){
        PlacedEquipment.push(new equipment("Over"))
    }
    this.draw = function() {
        var canvas = document.getElementById('MainCanvas');
        var ctx = canvas.getContext("2d");
        //Draw Field
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.stroke();
        ctx.fillStyle = "#006400";
        ctx.fillRect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.strokeStyle = '#888888';
        for (i = 0; i <= x; i+=this.gridSize){
            console.log(this.gridSize)
            ctx.moveTo(this.scaled[0] + i * scaler, this.scaled[1])
            ctx.lineTo(this.scaled[0] + i * scaler, this.scaled[3])
            ctx.stroke();
        }
        for (i = 0; i <= y; i+=this.gridSize){
            ctx.moveTo(this.scaled[0], this.scaled[1] + i * scaler)
            ctx.lineTo(this.scaled[2], this.scaled[1] + i * scaler)
            ctx.stroke();
        }
        //Draw Placed Equipment
        /* note to self - draw through equipment after contacts */
        for (i = 0; i <PlacedEquipment.length-1; i++){
            console.log("draw " + ListedEquipment[i])
        }
        //Draw Temp Equipment
        if (tempEquipment){
            //console.log (tempEquipment)
        }


    }
    this.mousemove = function(){
        mouse.x = ((event.offsetX || event.layerX)-xoffset)/scaler
        mouse.y = ((event.offsetY || event.layerY)-yoffset)/scaler
        mouse.x = Math.max(mouse.x,0)
        mouse.y = Math.max(mouse.y,0)
        mouse.x = Math.min(mouse.x,x)
        mouse.y = Math.min(mouse.y,y)
        if (tempEquipment){
            Field.draw()
        }
    }
}


function buttonMaster(){
    var canvas = document.getElementById('MainCanvas');
    
    //canvas.addEventListener("click",Field.click)

    canvas.addEventListener("mousemove",Field.mousemove)

    document.addEventListener("keydown", function(e){
        var keyvalue = e.keyCode
        e.preventDefault()
        console.log (keyvalue)
        switch(keyvalue){
            case 67: //C
                Field.AddTempEquipment(["Contact",0]) 
                break
            case 79: //O
                Field.AddTempEquipment(["Over",0])
                break
            case 84: //T
                Field.AddTempEquipment(["Through", 0])
                break
            case 87: //W
                Field.AddTempEquipment(["Weave",0])
                break
            case 82: //R - rotate
                Field.RotateTempEquipment()
                break
            case 71: //G
                if (Field.gridSize == 5){
                    Field.gridSize = 2
                } else {
                    Field.gridSize = 5
                }
                Field.draw()
                break
            case 27: //Esc
                Field.AddTempEquipment("")
                break
            case 9: //Tab
                Field.SwitchTempEquipment()
                break
        }
    })
}