function main() {
    end_preload()
    setview()
}

function end_preload(){
    console.log("Loaded!")
    document.getElementById("loader").style.display = "none";
    document.getElementById("MainDiv").style.display = "grid";
}

function setview(z='All'){
    //set view zoom/scale
    CanvasDiv = document.getElementById( 'CanvasDiv' );
    CanvasScale = document.getElementById( 'canvasscale' );
    Workspace = document.getElementById( 'Workspace' ).getBoundingClientRect();

    Template = document.getElementById( 'Template' ).getBoundingClientRect();
    CurrentScale = CanvasScale.getAttribute("transform", "scale")
    CurrentScale = parseFloat(CurrentScale.substr(6,CurrentScale.length - 7))
    NewScale = CurrentScale

    if (z=='+'){
        oldTopc = (CanvasDiv.scrollTop +500)/CurrentScale
        oldLeftc = (CanvasDiv.scrollLeft +500)/CurrentScale
        NewScale = CurrentScale * 1.1
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
        CanvasDiv.scrollTop = oldTopc*NewScale -500
        CanvasDiv.scrollLeft = oldLeftc*NewScale -500
    }
    if (z=='-'){
        oldTopc = (CanvasDiv.scrollTop +500)/CurrentScale
        oldLeftc = (CanvasDiv.scrollLeft +500)/CurrentScale
        NewScale = CurrentScale * 0.9
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
        CanvasDiv.scrollTop = oldTopc*NewScale -500
        CanvasDiv.scrollLeft = oldLeftc*NewScale -500
    }
    if (z=='All'){
       // console.log(Template.width, CanvasDiv.offsetWidth, CurrentScale)
        NewScale = CanvasDiv.offsetWidth/(Template.width/CurrentScale)
        NewScale = Math.min(NewScale, CanvasDiv.offsetHeight/(Template.height/CurrentScale))*0.95
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
        z='Center'
    }
    
    if (z=='Center'){
        //set view coordinates
        CanvasDiv = document.getElementById( 'CanvasDiv' );
        Template = document.getElementById( 'Template' ).getBoundingClientRect();
        if ( CanvasDiv.offsetWidth/(Template.width/CurrentScale) < CanvasDiv.offsetHeight/(Template.height/CurrentScale)){
            CanvasDiv.scrollTop = 2500*NewScale  - (CanvasDiv.offsetHeight-Template.height)/2*NewScale
            CanvasDiv.scrollLeft = 2500*NewScale
        } else {
            CanvasDiv.scrollTop = 2500*NewScale
            CanvasDiv.scrollLeft = 2500*NewScale - (CanvasDiv.offsetWidth-Template.width)/2*NewScale 
        }
    }
    
}

function buttonMaster(){
    //var canvas = document.getElementById('MainCanvas');
    var canvas = document.getElementById('CanvasDiv');

    
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
            case 68: //d
            if (DrawDogsPath == true){
                DrawDogsPath = false
            } else {
                DrawDogsPath = true
            }
            Field.draw()
            break
        }
    })
}
