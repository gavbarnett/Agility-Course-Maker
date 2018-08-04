/* Notes:
 * Area = 30 x 30 m
 * 
 */
var Field = new field
var Equipment = []
var PlacedEquipment = []
var filename = "MyAgilityField.json"
function main() {
    var canvas = document.createElement('canvas');
    var canvasDiv = document.getElementById('CanvasDiv')
    canvas.id = "MainCanvas";
    canvas.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    canvas.height =  canvas.width
    canvas.style.zIndex = 8;
    canvas.style.position = "flex";
    canvas.style.border = "1px solid";
    canvasDiv.appendChild(canvas);
    Field.draw()

    //This is code to add a tool bar for users without keyboards
    //It is a work in progress
    //***************
    // var toolCanvas = document.createElement('canvas');
    // var ToolDiv = document.getElementById('ToolDiv')
    // toolCanvas.id = "ToolCanvas";
    // toolCanvas.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    // toolCanvas.height =  toolCanvas.width*0.2
    // toolCanvas.style.zIndex = 8;
    // toolCanvas.style.position = "flex";
    // var tempeq = Field.AddTempEquipment({type:["Contact",0],'x':1,'y':1})
    // console.log (tempeq)
    // scaler = (Math.min(window.innerWidth*0.95,window.innerHeight*0.75) -10*2)/(50)
    // drawEquipment(tempeq, scaler, 10, toolCanvas)
    // Field.AddTempEquipment("")
    // ToolDiv.appendChild(toolCanvas);
    buttonMaster()
}

//http://agilitynerd.com/images/CourseLegend.jpg
var allEquipment = []
allEquipment["Contact"] = ["A-frame","Dog Walk", "See Saw"]
allEquipment["Over"] = ["Winged Single Jump","Spread", "Tire Jump"]
allEquipment["Through"] = ["Tunnel","Chute"]
allEquipment["Weave"] = ["6", "9", "12"]
allEquipment["Numbers"] = ["S",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,"F"]
var numberTracker = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

function field(){
    var mouse = []
    mouse.x = 0
    mouse.y = 0
    var offset = 10
    var xoffset = offset
    var yoffset = offset
    var x = 30
    var y = 30
    var scaler = (Math.min(window.innerWidth*0.95,window.innerHeight*0.75) -offset*2)/x
    this.gridSize = 5
    this.scaled = [
        xoffset,
        yoffset,
        xoffset + x*scaler,
        yoffset + y*scaler,
    ]
    var tempEquipment = []
    this.AddTempEquipment = function(inputType){
        if (tempEquipment.type){
            if(tempEquipment.type[0] == "Numbers"){
                numberTracker[tempEquipment.type[1]] = 1
            }
        }

        tempEquipment = []
        
        if (inputType.type){
            tempEquipment = inputType
        } else {
            if(inputType[0] == "Numbers"){
                var noNumbers = true
                for(i = 0; i < 22; i++){
                    if (numberTracker[i] == 1){
                        noNumbers = false
                        inputType[1] = i
                        break
                    }
                }
                if (noNumbers == true){
                    inputType = ""
                }
            }
            tempEquipment.type = inputType
            tempEquipment.rotation = 0
        }
        return (tempEquipment)
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
    this.TunnelLength = function(){
        if (tempEquipment){
            if ((tempEquipment.type[0] == "Through") && (tempEquipment.type[1] == 0)){
                switch(tempEquipment.type[2]){
                    case 3.048:
                        tempEquipment.type[2] = 4.578
                        break
                    case 4.578:
                        tempEquipment.type[2] = 6.096
                        break
                    case 6.096:
                        tempEquipment.type[2] = 3.048
                        break
                } 
            }
        }
    }
    this.TunnelRadius = function(){
        if (tempEquipment){
            if ((tempEquipment.type[0] == "Through") && (tempEquipment.type[1] == 0)){
                switch(tempEquipment.type[3]){
                    case ((4.578+0.759*0)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*1)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*1)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*2)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*2)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*4)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*4)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*8)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*8)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*16)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*16)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*32)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*32)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*64)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*64)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*128)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*128)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*1024)/Math.PI).toFixed(3)
                        break
                    case ((4.578+0.759*1024)/Math.PI).toFixed(3):
                        tempEquipment.type[3] = ((4.578+0.759*0)/Math.PI).toFixed(3)
                        break
                } 
            }
        }
    }
    this.PlaceEquipment = function(){
        if (tempEquipment){
            if(tempEquipment.type[0] == "Numbers"){
                numberTracker[tempEquipment.type[1]] = 0
            }
            PlacedEquipment.push(Object.assign({},tempEquipment))
            tempEquipment= []
            Field.AddTempEquipment("")
        }
        Field.draw()
    }
    this.draw = function(print = false) {
        canvas = document.getElementById('MainCanvas');
        ctx = canvas.getContext("2d");
        //Draw Field
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if (!print){
            ctx.fillStyle = "#6A8455";
        }else{
            ctx.fillStyle = "#ffffff";
        }

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
        mouse.oldx = x
        mouse.oldy = y
        mouse.x = ((event.offsetX || event.layerX)-xoffset)/scaler
        mouse.y = ((event.offsetY || event.layerY)-yoffset)/scaler
        mouse.x = Math.max(mouse.x,0)
        mouse.y = Math.max(mouse.y,0)
        mouse.x = Math.min(mouse.x,x)
        mouse.y = Math.min(mouse.y,y)
        if (tempEquipment.type != ""){
            var mouseStyle = "move"
            Field.draw()
        } else {
            var distance = 0
            var mouseStyle = "auto"
                for (var i = 0; i < PlacedEquipment.length; i++){
                    distance = Math.sqrt(Math.pow((PlacedEquipment[i].x-mouse.x),2)+Math.pow((PlacedEquipment[i].y-mouse.y),2))
                    if (distance < 2){
                        mouseStyle = "move";
                        break
                    }
                }
        }
        document.body.style.cursor = mouseStyle
        
        
    }
    this.click = function(){
        if (tempEquipment.type != ""){ 
            Field.PlaceEquipment()
        } else{
            //check if centre of any piece of placed equipment is < 1 meter from mouse
            var distance = 0
            var minDist = 3
            var itemSelected = 0
            for (var i = 0; i < PlacedEquipment.length; i++){
                distance = Math.sqrt(Math.pow((PlacedEquipment[i].x-mouse.x),2)+Math.pow((PlacedEquipment[i].y-mouse.y),2))
                if (distance < minDist){
                    minDist = distance
                    itemSelected = i
                }
            }
            if (minDist<3){
                tempEquipment = PlacedEquipment[itemSelected]
                PlacedEquipment.splice(itemSelected, 1)
            }
        }
    }
    this.resize = function(){
        var canvas = document.getElementById('MainCanvas');
        canvas.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
        canvas.height =  canvas.width
        scaler = (canvas.width-offset*2)/x
        this.scaled = [
            xoffset,
            yoffset,
            xoffset + x*scaler,
            yoffset + y*scaler,
        ]
        Field.draw()
    }
}
function saveDesign(){
    //this seems like an odd way of doing this but it works.
    //this this should really be bound to the SaveAs button
    var blob = new Blob([JSON.stringify(PlacedEquipment)], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function loadDesign(){
    numberTracker = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        PlacedEquipment = JSON.parse(reader.result)
        Field.draw()
    }, false);

    if (file) {
        reader.readAsText(file);
        filename = (document.getElementById('OpenFile').value.split(/(\\|\/)/g).pop())
    }
}

function printDesign(){
    Field.draw(true)
    const dataUrl = document.getElementById('MainCanvas').toDataURL(); 
    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>Agility Course Designer</title></head>';
    windowContent += '<body>';
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';

    const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent); 

    printWin.document.addEventListener('load', function() {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();            
    }, true);
    Field.draw(false)
}

function buttonMaster(){
    var canvas = document.getElementById('MainCanvas');
    
    window.onresize = function(e) {
        Field.resize()
    }
    
    canvas.addEventListener("click",Field.click)
    canvas.addEventListener("resize",Field.click)
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
            case 74: //J
                Field.AddTempEquipment(["Over",0])
                Field.draw()
                break
            case 84: //T
                Field.AddTempEquipment(["Through", 0, 3.048, ((4.578+0.759*0)/Math.PI).toFixed(3)]) 
                Field.draw()
                break
            case 87: //W
                Field.AddTempEquipment(["Weave",0])
                Field.draw()
                break
            case 76: //L
                Field.TunnelLength()
                Field.draw()
                break
            case 66: //B
                Field.TunnelRadius()
                Field.draw()
                break
            case 82: //R - rotate
                Field.RotateTempEquipment()
                Field.draw()
                break
            case 78: //N
                Field.AddTempEquipment(["Numbers",0])
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