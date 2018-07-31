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

function drawEquipment(item, scaler, offset){
    this.drawContact = function(){
        switch(item.type[1]){
            case "A-frame":
                break
            case "Dog Walk":
                break
        }
    }
    this.drawOver = function(){
        switch(item.type[1]){
            case 0: //"Winged Single Jump":
                break
            case 1: //"Spread":
                break
            case 2: //"Tire Jump":
                break
        }
    }
    this.drawThrough = function(){
        switch(item.type[1]){
            case 0: //"Tunnel":
                break
            case 1: //"Chute":
                break
            case 2: //"Tire Jump":
                break
        }
    }
    this.drawWeave = function(){
        switch(item.type[1]){
            case 0: //"6":
                var poles = 6
                for (i = 0; i < poles; i ++){
                    ctx.fillStyle = "#000000";
                    ctx.strokeStyle = '#000000';
                    ctx.beginPath()
                    ctx.arc((0.6*(-(poles-1)/2+i))*scaler,0,0.05*scaler,0,2* Math.PI)
                    ctx.stroke()
                }
                break
            case 1: //"9":
                var poles = 9
                for (i = 0; i < poles; i ++){
                    ctx.fillStyle = "#000000";
                    ctx.strokeStyle = '#000000';
                    ctx.beginPath()
                    ctx.arc((0.6*(-(poles-1)/2+i))*scaler,0,0.05*scaler,0,2* Math.PI)
                    ctx.stroke()
                }
                break
            case 2: //"12":
                var poles = 12
                for (i = 0; i < poles; i ++){
                    ctx.fillStyle = "#000000";
                    ctx.strokeStyle = '#000000';
                    ctx.beginPath()
                    ctx.arc((0.6*(-(poles-1)/2+i))*scaler,0,0.05*scaler,0,2* Math.PI)
                    ctx.stroke()
                }
                break
        }
    }
    canvas = document.getElementById('MainCanvas');
    ctx = canvas.getContext("2d");
    ctx.save()
    ctx.translate(offset + scaler*item.x,offset + scaler*item.y)
    ctx.rotate(item.rotation)
    switch(item.type[0]){
        case "Contact":
            this.drawContact()
            break
        case "Over":
            this.drawOver()
            break
        case "Through":
            this.drawThrough()
            break
        case "Weave":
            this.drawWeave()
            break
    }

    ctx.restore()

}

function field(){
    var mouse = []
    mouse.x = 0
    mouse.y = 0
    var offset = 10
    var xoffset = offset
    var yoffset = offset
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
    var tempEquipment = []
    this.AddTempEquipment = function(inputType){
        tempEquipment = []
        tempEquipment.type = inputType
        tempEquipment.rotation = 0
    }
    this.AddTempEquipment("")
    this.SwitchTempEquipment = function(){
        if (tempEquipment){
            if ((allEquipment[tempEquipment.type[0]].length-1)>tempEquipment.type[1]){
                tempEquipment.type[1] += 1
            } else{
                tempEquipment.type[1] = 0
            }
        }
    }
    this.RotateTempEquipment = function(){
        if (tempEquipment){
            tempEquipment.rotation += Math.PI/8
            if(tempEquipment.rotation >= Math.PI*2){
                tempEquipment.rotation = 0 
            }
        }
    }
    var PlacedEquipment = []
    this.PlaceEquipment = function(){
        if (tempEquipment){
            PlacedEquipment.push(Object.assign({},tempEquipment))
            Field.AddTempEquipment("")
        }
    }
    this.draw = function() {
        canvas = document.getElementById('MainCanvas');
        ctx = canvas.getContext("2d");
        //Draw Field
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.stroke();
        ctx.fillStyle = "#006400";
        ctx.fillRect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.strokeStyle = '#AAAAAA';
        for (i = 0; i <= x; i+=this.gridSize){
            console.log(this.gridSize)
            ctx.beginPath()
            ctx.moveTo(this.scaled[0] + i * scaler, this.scaled[1])
            ctx.lineTo(this.scaled[0] + i * scaler, this.scaled[3])
            ctx.stroke();
        }
        for (i = 0; i <= y; i+=this.gridSize){
            ctx.beginPath()
            ctx.moveTo(this.scaled[0], this.scaled[1] + i * scaler)
            ctx.lineTo(this.scaled[2], this.scaled[1] + i * scaler)
            ctx.stroke();
        }
        //Draw Placed Equipment
        /* note to self - draw through equipment after contacts */
        for (var i = 0; i <PlacedEquipment.length; i++){
            drawEquipment(PlacedEquipment[i], scaler, offset)
        }

        //Draw Temp Equipment
        if (tempEquipment.type != ""){
            tempEquipment.x = mouse.x
            tempEquipment.y = mouse.y
            drawEquipment(tempEquipment, scaler, offset)
        }


    }
    this.mousemove = function(){
        mouse.x = ((event.offsetX || event.layerX)-xoffset)/scaler
        mouse.y = ((event.offsetY || event.layerY)-yoffset)/scaler
        mouse.x = Math.max(mouse.x,0)
        mouse.y = Math.max(mouse.y,0)
        mouse.x = Math.min(mouse.x,x)
        mouse.y = Math.min(mouse.y,y)
        if (tempEquipment.type != ""){
            Field.draw()
        }
    }
}


function buttonMaster(){
    var canvas = document.getElementById('MainCanvas');
    
    canvas.addEventListener("click",Field.PlaceEquipment)

    canvas.addEventListener("mousemove",Field.mousemove)

    document.addEventListener("keydown", function(e){
        var keyvalue = e.keyCode
        e.preventDefault()
        console.log (keyvalue)
        switch(keyvalue){
            case 67: //C
                Field.AddTempEquipment(["Contact",0])
                Field.draw()
                break
            case 79: //O
                Field.AddTempEquipment(["Over",0])
                Field.draw()
                break
            case 84: //T
                Field.AddTempEquipment(["Through", 0])
                Field.draw()
                break
            case 87: //W
                Field.AddTempEquipment(["Weave",0])
                Field.draw()
                break
            case 82: //R - rotate
                Field.RotateTempEquipment()
                Field.draw()
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
                Field.draw()
                break
            case 9: //Tab
                Field.SwitchTempEquipment()
                Field.draw()
                break
        }
    })
}