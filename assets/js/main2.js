function main() {
    end_preload()
    setview()
}

function end_preload(){
    console.log("Loaded!")
    document.getElementById("loader").style.display = "none";
    document.getElementById("MainDiv").style.display = "grid";
}

function setview(z='Center'){
    //set view zoom/scale
    CanvasScale = document.getElementById( 'canvasscale' );
    CurrentScale = CanvasScale.getAttribute("transform", "scale")
    CurrentScale = parseFloat(CurrentScale.substr(6,CurrentScale.length - 7))
    if (z=='+'){
        NewScale = CurrentScale * 1.1
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
    }
    if (z=='-'){
        NewScale = CurrentScale * 0.9
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
    }
    if (z=='All'){
        NewScale = 1 //Much more complex than this!
        CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")
        z='Center'
    }
    
    if (z=='Center'){
        //set view coordinates
        CanvasDiv = document.getElementById( 'CanvasDiv' );
        CanvasDiv.scrollTop = CanvasDiv.scrollHeight/2
        CanvasDiv.scrollLeft = CanvasDiv.scrollWidth/2
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
