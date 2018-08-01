/* Notes:
 * Area = 30 x 30 m
 * 
 */
var Field = new field
var Equipment = []

function main() {
    var canvas = document.createElement('canvas');
    
    canvas.id = "MainCanvas";
    canvas.width = 620;
    canvas.height = 620;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    Field.draw()
    buttonMaster()
}

//http://agilitynerd.com/images/CourseLegend.jpg
allEquipment = []
allEquipment["Contact"] = ["A-frame","Dog Walk", "See Saw"]
allEquipment["Over"] = ["Winged Single Jump","Spread", "Tire Jump"]
allEquipment["Through"] = ["Tunnel","Chute"]
allEquipment["Weave"] = ["6", "9", "12"]

function drawEquipment(item, scaler, offset){
    this.drawContact = function(){
        switch(item.type[1]){
            case 0: //"A-frame"
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = '#000000';
                ctx.beginPath()
                ctx.rect(scaler*-2.136,scaler*-0.4585,scaler*4.272,scaler*0.917)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "#FFFF00";
                ctx.rect(scaler*-2.136,scaler*-0.4585, scaler*0.836,scaler*0.917)
                ctx.rect(scaler*1.3,scaler*-0.4585, scaler*0.836,scaler*0.917)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.moveTo(scaler*0,scaler*-0.4585)
                ctx.lineTo(scaler*0,scaler*0.4585)
                ctx.stroke()
                break
            case 1: //"Dog Walk"
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeStyle = '#000000';
                ctx.beginPath()
                ctx.rect(scaler*-5.78,scaler*-0.135,scaler*11.56,scaler*0.27)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "#FFFF00";
                ctx.rect(scaler*-5.78,scaler*-0.135, scaler*0.86,scaler*0.27)
                ctx.rect(scaler*4.92,scaler*-0.135, scaler*0.86,scaler*0.27)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.moveTo(scaler*-2,scaler*-0.135)
                ctx.lineTo(scaler*-2,scaler*0.135)
                ctx.moveTo(scaler*2,scaler*-0.135)
                ctx.lineTo(scaler*2,scaler*0.135)
                ctx.stroke()
                break
            case 2: //"See Saw"
                ctx.beginPath()
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#000000";
                ctx.rect(scaler*-0.2,scaler*-0.3, scaler*0.4,scaler*0.6)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "#FFFFFF";
                ctx.rect(scaler*-1.879,scaler*-0.135,scaler*3.758,scaler*0.27)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "#FFFF00";
                ctx.rect(scaler*-1.879,scaler*-0.135, scaler*0.8589,scaler*0.27)
                ctx.rect(scaler*1.02,scaler*-0.135, scaler*0.8589,scaler*0.27)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "#000000";
                ctx.moveTo(scaler*-0.5,scaler*0)
                ctx.lineTo(scaler*0.5,scaler*0)
                ctx.lineTo(scaler*0.3,scaler*-0.15)
                ctx.lineTo(scaler*0.3,scaler*0.15)
                ctx.lineTo(scaler*0.5,scaler*0)
                ctx.stroke()
                ctx.fill()
                break
        }
    }
    this.drawOver = function(){
        switch(item.type[1]){
            case 0: //"Winged Single Jump":
                ctx.beginPath()
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#FFFFFF";
                ctx.rect(scaler*-1.2095,scaler*-0.05, scaler*0.6,scaler*0.1)
                ctx.rect(scaler*0.6095,scaler*-0.05, scaler*0.6,scaler*0.1)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.strokeStyle = '#000000';
                ctx.moveTo(scaler*-0.6095,scaler*0)
                ctx.lineTo(scaler*0.6095,scaler*0)
                ctx.stroke()
                break
            case 1: //"Spread":
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#000000";
                var spread = 4
                ctx.beginPath()
                ctx.arc(scaler*(-0.6095-0.1), scaler*(-(0.225*spread)/2-0.2),0.1*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(-0.6095-0.1), scaler*((0.225*spread)/2+0.1),0.1*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(+0.6095+0.1), scaler*(-(0.225*spread)/2-0.2),0.1*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(+0.6095+0.1), scaler*((0.225*spread)/2+0.1),0.1*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                for (i = 0; i < spread; i ++){
                    ctx.beginPath()
                    ctx.rect(scaler*-0.6095,scaler*(-(0.225*spread)/2 + 0.225*i), scaler*1.219,scaler*0.10)
                    ctx.stroke()
                    ctx.fill()
                }
                //ctx.fill()
                break
            case 2: //"Tire Jump":
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#000000";
                ctx.beginPath()
                ctx.arc(0,0,scaler*0.733/2,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath()
                ctx.arc(0,0,scaler*0.533/2,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.strokeStyle = '#000000';
                ctx.moveTo(scaler*0.3665,scaler*0)
                ctx.lineTo(scaler*0.7095,scaler*0)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(scaler*0.7095,scaler*-0.2)
                ctx.lineTo(scaler*0.7095,scaler*0.2)
                ctx.stroke()
                ctx.beginPath()
                ctx.strokeStyle = '#000000';
                ctx.moveTo(scaler*-0.3665,scaler*0)
                ctx.lineTo(scaler*-0.7095,scaler*0)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(scaler*-0.7095,scaler*-0.2)
                ctx.lineTo(scaler*-0.7095,scaler*0.2)
                ctx.stroke()
                break
        }
    }
    this.drawThrough = function(){
        switch(item.type[1]){
            case 0: //"Tunnel":
                var length = item.type[2]
                var radius = item.type[3]
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#444444";
                ctx.beginPath()
                ctx.arc(0,radius*scaler,radius*scaler,-(length/radius)/2-Math.PI/2,(length/radius)/2-Math.PI/2)
                ctx.arc(0,radius*scaler,(radius-0.609)*scaler,(length/radius)/2-Math.PI/2,-(length/radius)/2-Math.PI/2,true)
                ctx.lineTo(Math.cos(-(length/radius)/2-Math.PI/2)*radius*scaler,Math.sin((length/radius)/2-Math.PI/2)*radius*scaler+radius*scaler)
                ctx.stroke()
                ctx.fill()
                break
            case 3: //"Chute":
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
                    ctx.fill()
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
                    ctx.fill()
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
                    ctx.fill()
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
        Field.draw()
    }
    this.draw = function() {
        canvas = document.getElementById('MainCanvas');
        ctx = canvas.getContext("2d");
        //Draw Field
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "#6A8455";
        ctx.fillRect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.strokeStyle = '#AAAAAA';
        for (i = 0; i <= x; i+=this.gridSize){
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
            if (PlacedEquipment[i].type[0] == "Through"){
                drawEquipment(PlacedEquipment[i], scaler, offset)
            }
        }
        for (var i = 0; i <PlacedEquipment.length; i++){
            if (PlacedEquipment[i].type[0] != "Through"){
                drawEquipment(PlacedEquipment[i], scaler, offset)
            }
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
                Field.AddTempEquipment(["Through", 0, 4.578, 1.457])
                //var length = 4.578 //3.048 //4.578 6.096
                //var radius = 1.457 
                Field.draw()
                break
            case 87: //W
                Field.AddTempEquipment(["Weave",0])
                Field.draw()
                break
            case 76: //L
                //Field.TunnelLength()
                //var length = 4.578 //3.048 //4.578 6.096
                //var radius = 1.457 
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