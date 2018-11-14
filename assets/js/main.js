/* Notes:
 * Area = 30 x 30 m
 * 
 */
var dragging = false
var oldwindowwidth = 0
var mousebutton = false
var Field = new field(30,30)
var Equipment = []
var PlacedEquipment = []
var offset = 10
var scaler = (Math.min(window.innerWidth*0.95,window.innerHeight*0.75) -offset*2)/Math.max(30,30)
function main() {
    container = document.getElementById( 'MainCanvas2' );
    container.style.visibility = "collapse";
    var canvas = document.getElementById('MainCanvas');
    var canvasDiv = document.getElementById('CanvasDiv')
    canvas.id = "MainCanvas";
    canvas.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    oldwindowwidth = window.innerWidth
    canvas.height =  canvas.width
    canvas.style.border = "1px solid";
    canvas.tabIndex = 1
    canvas.focus()
    var notes = document.getElementById('Notes')
    notes.width = canvas.width
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

    //IE11 object.assign fix:
    if (typeof Object.assign != 'function') {
        Object.assign = function(target, varArgs) {
     'use strict';
     if (target == null) { // TypeError if undefined or null
       throw new TypeError('Cannot convert undefined or null to object');
     }
     
     var to = Object(target);
     
     for (var index = 1; index < arguments.length; index++) {
       var nextSource = arguments[index];
     
       if (nextSource != null) { // Skip over if undefined or null
         for (var nextKey in nextSource) {
           // Avoid bugs when hasOwnProperty is shadowed
           if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
             to[nextKey] = nextSource[nextKey];
             }
            }
          }
        }
        return to;
       };
      }
}

//http://agilitynerd.com/images/CourseLegend.jpg
var allEquipment = []
allEquipment["Contact"] = ["A-frame","Dog Walk", "See Saw", "Table", "Pause Box"]
allEquipment["Over"] = ["Winged Single Jump","Spread", "Tire Jump"]
allEquipment["Through"] = ["Tunnel","Chute"]
allEquipment["Weave"] = ["6", "9", "12"]
allEquipment["Numbers"] = ["S",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,"F"]
var numberTracker = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

function field(x,y){
    var mouse = []
    if (!x) {
        var x = 30
        this.x = x
    } else {
        x = x
        this.x = x
    }
    if (!y) {
        var y = 30
        this.y = y
    } else {
        y = y
        this.y = y
    }
    mouse.x = x/2
    mouse.y = y/2
    offset = 10
    var xoffset = offset
    var yoffset = offset
    scaler = (Math.min(window.innerWidth*0.95,window.innerHeight*0.75) -offset*2)/Math.max(this.x,this.y)
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
            if(tempEquipment.type!=""){
                if ((allEquipment[tempEquipment.type[0]].length-1)>tempEquipment.type[1]){
                    tempEquipment.type[1] += 1
                } else{
                    tempEquipment.type[1] = 0
                }
            }
        }
    }
    this.RotateTempEquipment = function(){
        if (tempEquipment){
            tempEquipment.rotation += Math.PI/16
            if(tempEquipment.rotation >= Math.PI*2){
                tempEquipment.rotation = 0 
            }
        }
    }
    this.TunnelLength = function(){
        if (tempEquipment){
            if ((tempEquipment.type[0] == "Through") && (tempEquipment.type[1] == 0)){
                switch(tempEquipment.type[2]){
                    case 3:
                        tempEquipment.type[2] = 4
                        break
                    case 4:
                        tempEquipment.type[2] = 6
                        break
                    case 6:
                        tempEquipment.type[2] = 3
                        break
                } 
            }
        }
    }
    this.TunnelRadius = function(){
        var tunnelLength = 4
        var minOuterDiameter = 1.309*2 //1.309
        if (tempEquipment){
            if ((tempEquipment.type[0] == "Through") && (tempEquipment.type[1] == 0)){
                switch(tempEquipment.type[3]){
                    case (minOuterDiameter*1).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*2).toFixed(3)
                        break
                    case (minOuterDiameter*2).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*4).toFixed(3)
                        break
                    case (minOuterDiameter*4).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*8).toFixed(3)
                        break
                    case (minOuterDiameter*8).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*16).toFixed(3)
                        break
                    case (minOuterDiameter*16).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*32).toFixed(3)
                        break
                    case (minOuterDiameter*32).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*64).toFixed(3)
                        break
                    case (minOuterDiameter*64).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*1024).toFixed(3)
                        break
                    case (minOuterDiameter*1024).toFixed(3):
                        tempEquipment.type[3] = (minOuterDiameter*1).toFixed(3)
                        break
                } 
            }
        }
    }
    this.PlaceEquipment = function(){
        if (tempEquipment){
            if(tempEquipment.type!=""){
                if(tempEquipment.type[0] == "Numbers"){
                    numberTracker[tempEquipment.type[1]] = 0
                }
                PlacedEquipment.push(Object.assign({},tempEquipment))
                tempEquipment= []
                Field.AddTempEquipment("")
            }
        }
        Field.draw()
        if (document.getElementById( 'MainCanvas2' ).style.visibility != "collapse"){
            update3D()
        }
    }
    this.draw = function(print) {
        if (!print){
            print = false
        }
        canvas = document.getElementById('MainCanvas');
        ctx = canvas.getContext("2d");
        canvas.focus();
        //Draw Field
        ctx.fillStyle = "#ffffff";
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillRect(0,0,canvas.width,canvas.height)
        if (!print){
            //if display for web fill green
            ctx.fillStyle = "#9aa391"//"#6A8455";
        }else{
            //if display for printing fill white
            ctx.fillStyle = "#ffffff";
        }
        //draw grid
        ctx.fillRect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.strokeStyle = '#888';
        ctx.setLineDash([2, 2])
        ctx.font = "14px Arial";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx. textBaseline = 'middle';
        for (i = 0; i <= this.x; i+=this.gridSize){
            ctx.beginPath()
            ctx.moveTo(this.scaled[0] + i * scaler, this.scaled[1])
            ctx.lineTo(this.scaled[0] + i * scaler, this.scaled[3])
            ctx.stroke();
            if (i !=0 && i != this.x){
                ctx.fillText(i,this.scaled[0] + i * scaler, this.scaled[1]+0.5*this.gridSize*scaler);
            }
        }
        for (i = 0; i <= this.y; i+=this.gridSize){
            ctx.beginPath()
            ctx.moveTo(this.scaled[0], this.scaled[1] + i * scaler)
            ctx.lineTo(this.scaled[2], this.scaled[1] + i * scaler)
            ctx.stroke();
            if (i !=0 && i != this.y){
                ctx.fillText(i,this.scaled[0]+0.5*this.gridSize*scaler, this.scaled[1] + i * scaler);
            }
        }
        ctx.setLineDash([1,0])
        ctx.strokeStyle = '#000000';
        ctx.beginPath()
        ctx.rect(this.scaled[0], this.scaled[1], this.scaled[2]-this.scaled[0], this.scaled[3]-this.scaled[1]);
        ctx.stroke()
        //Draw Placed Equipment
        /* note to self - draw through equipment before contacts */
        for (var i = 0; i <PlacedEquipment.length; i++){
            if (PlacedEquipment[i].type[0] == "Through"){
                drawEquipment(PlacedEquipment[i], scaler, offset)
            }
        }
        for (var i = 0; i <PlacedEquipment.length; i++){
            if (PlacedEquipment[i].type[0] != "Through"){
                if (PlacedEquipment[i].type[0] == "Numbers"){
                    numberTracker[PlacedEquipment[i].type[1]] = 0
                }
                drawEquipment(PlacedEquipment[i], scaler, offset)
            }
        }
        //Draw Temp Equipment
        if (tempEquipment.type != ""){
            tempEquipment.x = mouse.x
            tempEquipment.y = mouse.y
            //draw highlight circle
            var grd=ctx.createRadialGradient(offset+scaler*mouse.x,offset+scaler*mouse.y,0,offset+scaler*mouse.x,offset+scaler*mouse.y,2*scaler);
            grd.addColorStop(0,"rgba(255, 255, 255, 0.5)");
            grd.addColorStop(1,"rgba(255, 255, 255, 0)");    
            ctx.fillStyle = grd;
            ctx.beginPath()
            ctx.arc(offset+scaler*mouse.x,offset+scaler*mouse.y,2*scaler,0,2*Math.PI)
            ctx.fill()

            //draw item
            drawEquipment(tempEquipment, scaler, offset)
        }


    }
    this.mousemove = function(event){
        if (mousebutton){
            mouse.x = ((event.offsetX || event.layerX)-xoffset)/scaler
            mouse.y = ((event.offsetY || event.layerY)-yoffset)/scaler
            mouse.x = Math.max(mouse.x,0)
            mouse.y = Math.max(mouse.y,0)
            mouse.x = Math.min(mouse.x,x)
            mouse.y = Math.min(mouse.y,y)
            if (Math.sqrt(Math.pow(mouse.oldx-mouse.x,2)+Math.pow(mouse.oldy-mouse.y,2))>1){
                dragging = true
            }
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
        } else {
            var mouseStyle = "auto"
        }
        document.body.style.cursor = mouseStyle    

        
    }
    this.touchmove = function(event){
        event.preventDefault();
        canvas = document.getElementById('MainCanvas');
        var touch = event.touches[0];
        mouse.x = (touch.clientX-xoffset-canvas.offsetLeft+window.scrollX)/scaler
        mouse.y = (touch.clientY-yoffset-canvas.offsetTop+window.scrollY)/scaler
        mouse.x = Math.max(mouse.x,0)
        mouse.y = Math.max(mouse.y,0)
        mouse.x = Math.min(mouse.x,x)
        mouse.y = Math.min(mouse.y,y)
        if (Math.sqrt(Math.pow(mouse.oldx-mouse.x,2)+Math.pow(mouse.oldy-mouse.y,2))>1){
            dragging = true
        }
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
    this.mouseup = function(event){
        mousebutton = false
        if (dragging){
            if (tempEquipment.type != ""){ 
                //Field.PlaceEquipment()
            }
        }
    }
    this.mousedown = function(event){
            mousebutton = true
            //check if centre of any piece of placed equipment is < 1 meter from mouse
            event.preventDefault();
            mouse.oldx = mouse.x
            mouse.oldy = mouse.y
            dragging = false;
            canvas = document.getElementById('MainCanvas');
            mouse.x = ((event.offsetX || event.layerX)-xoffset)/scaler
            mouse.y = ((event.offsetY || event.layerY)-yoffset)/scaler
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
            if (minDist<(2)){
                Field.PlaceEquipment()
                tempEquipment = PlacedEquipment[itemSelected]
                PlacedEquipment.splice(itemSelected, 1)
            } else {
                distance = Math.sqrt(Math.pow((tempEquipment.x-mouse.x),2)+Math.pow((tempEquipment.y-mouse.y),2))
                if(distance<(2)){
                    //keep focus on current item and don't place it yet.
                } else {
                    Field.PlaceEquipment()
                }
            }
            Field.draw()
    }
    this.touchend = function(event){
        if (dragging){
            if (tempEquipment.type != ""){ 
                //Field.PlaceEquipment()
            }
        }
    }
    this.touchstart = function(event){
        console.log("start")
        mouse.oldx = mouse.x
        mouse.oldy = mouse.y
        dragging = false;
        //check if centre of any piece of placed equipment is < 1 meter from mouse
        event.preventDefault();
        canvas = document.getElementById('MainCanvas');
        var touch = event.touches[0];
        mouse.x = (touch.clientX-xoffset-canvas.offsetLeft+window.scrollX)/scaler
        mouse.y = (touch.clientY-yoffset-canvas.offsetTop+window.scrollY)/scaler
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
        if (minDist<(2)){
            Field.PlaceEquipment()
            tempEquipment = PlacedEquipment[itemSelected]
            PlacedEquipment.splice(itemSelected, 1)
        } else {
            distance = Math.sqrt(Math.pow((tempEquipment.x-mouse.x),2)+Math.pow((tempEquipment.y-mouse.y),2))
            if(distance<(2)){
                //keep focus on current item and don't place it yet.
            } else {
                Field.PlaceEquipment()
            }
        }
        Field.draw()
    }
    this.resize = function(){
        scaler = (Math.min(window.innerWidth*0.95,window.innerHeight*0.75) -offset*2)/Math.max(this.x,this.y)
        if (window.innerWidth != oldwindowwidth) {
            var canvas = document.getElementById('MainCanvas');
            canvas.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
            canvas.height =  canvas.width
            this.scaled = [
                xoffset,
                yoffset,
                xoffset + x*scaler,
                yoffset + y*scaler,
            ]
            var notes = document.getElementById('Notes')
            notes.width = canvas.width
            Field.draw()
            if (pause = false) {
                var canvas2 = document.getElementById('MainCanvas2');
                canvas2.width = canvas.width 
                canvas2.height =  canvas.width
                start3D()
            }
            oldwindowwidth = window.innerWidth
        }
    }
}
function saveDesign(){
    //this seems like an odd way of doing this but it works.
    //this this should really be bound to the SaveAs button
    var notes = document.getElementById("Notes").value
    var fieldSize = {"x": Field.x, "y": Field.y}
    var blob = new Blob([JSON.stringify({'Field': fieldSize, 'Equipment': PlacedEquipment,'Notes':notes},null,2)], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    var date = new Date().toDateString();
    var time = new Date().toLocaleTimeString();
    a.download = "MyAgilityField" + " ("+ date + " - "+ time +").json"
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function loadDesign(){
    numberTracker = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    var notes = document.getElementById("Notes")
    reader.addEventListener("load", function () {
        var FileData = JSON.parse(reader.result)
        try{
            Field = new field(FileData.Field.x, FileData.Field.y)
            document.getElementById('fieldx').value = FileData.Field.x
            document.getElementById('fieldx').value = FileData.Field.y
        }
        catch{
            Field = new field(30, 30)
            document.getElementById('fieldx').value = 30
            document.getElementById('fieldx').value = 30
        }
        PlacedEquipment = FileData.Equipment
        notes.value = FileData.Notes
        Field.draw()
    }, false);

    if (file) {
        reader.readAsText(file);
        filename = (document.getElementById('OpenFile').value.split(/(\\|\/)/g).pop())
    }
}

function printDesign(){
    Field.draw(true)
    var notes = document.getElementById("Notes")
    if (notes.value.split('\n')[0] == "Add your notes here.") {
        notes = ""
    } else {
        notes = notes.value
    }
    const dataUrl = document.getElementById('MainCanvas').toDataURL()
    var windowContent = '<!DOCTYPE html>'
    windowContent += '<html>'
        windowContent += '<head>'
            windowContent += '<title>Agility Course Maker</title>'
            windowContent += '<style>body {font-size: 100%; font-family: "Verdana", sans-serif; text-align: left;}</style>'
            windowContent += '<style>img {display: block; margin: 0 auto;}</style>'
            windowContent += '<style>textarea {resize: none; width:100%; height:100%; font-family: "Verdana", sans-serif; text-align: left;}</style>'
            windowContent += '<style>footer {position: fixed; bottom:0; left:0; width 100%; font-size: 75%; font-family: "Verdana", sans-serif; text-align: left;}</style>'
            windowContent += '</head>'
        windowContent += '<body>'
            windowContent += '<img align="middle" src="' + dataUrl + '" width=90% height=90%>'
            windowContent += '<h3> Course Notes </h3>';
            windowContent += '<textarea resize="none" rows="13" cols="20">'  + notes + '</textarea>'
        windowContent += '</body>'
        windowContent += '<footer>'
            windowContent +='<p>Created on <b>Agility Course Maker</b> an Open Source project under MIT License</a></p>'
            windowContent +='<p><b>AgilityCourseMaker.com</b> Copyright © 2018 Gavin Barnett</p>'
        windowContent += '<footer>'
    windowContent += '</html>'
    const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight)
    printWin.document.open()
    printWin.document.write(windowContent)

    printWin.document.addEventListener('load', function() {
        printWin.setTimeout(function(){},500)
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();            
    }, true);
    Field.draw(false)
}

function updateFieldSize(){
    try{
        tempx = 30
        tempy = 30
        if (document.getElementById('fieldx').value>2){
            tempx = document.getElementById('fieldx').value
        }
        if (document.getElementById('fieldy').value>2){
            tempy = document.getElementById('fieldy').value
        }
        Field = new field(tempx, tempy)
    }
    catch{
        Field = new field(30,30)

    }
        Field.draw()

}

function buttonMaster(){
    var canvas = document.getElementById('MainCanvas');
    
    window.onresize = function(e) {
        Field.resize()
    }
    canvas.addEventListener("touchstart",function(e){Field.touchstart(e)}, false)
    canvas.addEventListener("touchmove",function(e){Field.touchmove(e)}, false)
    canvas.addEventListener("touchend",function(e){Field.touchend(e)}, false)
    canvas.addEventListener("mouseup",function(e){Field.mouseup(e)})
    canvas.addEventListener("mousedown",function(e){Field.mousedown(e)})
    canvas.addEventListener("resize",Field.resize)
    canvas.addEventListener("mousemove",function(e){Field.mousemove(e)})
    canvas.addEventListener("keydown", function(e){
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
                Field.AddTempEquipment(["Through", 0, 3, (1.309*2).toFixed(3)]) 
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
            case 46: //Del
            case 27: //Esc
                Field.AddTempEquipment("")
                Field.draw()
                break
            case 9: //Tab
                Field.SwitchTempEquipment()
                Field.draw()
                break
            case 51: //3
                start3D()
            break
            case 50: //2
                end3D()
            break
        }
    })
}
