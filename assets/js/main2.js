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
    Workspace = document.getElementById( 'Workspace' );

    TemplateR = document.getElementById( 'Template' ).getBoundingClientRect();
    CurrentScale = CanvasScale.getAttribute("transform", "scale")
    CurrentScale = parseFloat(CurrentScale.substr(6,CurrentScale.length - 7))
    NewScale = CurrentScale

    if (z=='+'){
        oldTop = CanvasDiv.scrollTop + CanvasDiv.offsetHeight/2
        oldLeft = CanvasDiv.scrollLeft + CanvasDiv.offsetWidth/2
        Workspace.setAttribute('width',Workspace.getAttribute('width')*1.1)
        Workspace.setAttribute('height',Workspace.getAttribute('height')*1.1)
        CanvasDiv.scrollTop = oldTop*(1.1) - CanvasDiv.offsetHeight/2
        CanvasDiv.scrollLeft = oldLeft*(1.1) - CanvasDiv.offsetWidth/2
    }
    if (z=='-'){
        oldTop = CanvasDiv.scrollTop + CanvasDiv.offsetHeight/2
        oldLeft = CanvasDiv.scrollLeft + CanvasDiv.offsetWidth/2
        Workspace.setAttribute('width',Workspace.getAttribute('width')*0.9)
        Workspace.setAttribute('height',Workspace.getAttribute('height')*0.9)
        CanvasDiv.scrollTop = (Workspace.getAttribute('height')*0.45)
        CanvasDiv.scrollLeft = (Workspace.getAttribute('width')*0.45)
        CanvasDiv.scrollTop = oldTop*(0.9) - CanvasDiv.offsetHeight/2
        CanvasDiv.scrollLeft = oldLeft*(0.9) - CanvasDiv.offsetWidth/2
    }
    if (z=='All'){
        NewScale = CanvasDiv.offsetWidth/(TemplateR.width)
        NewScale = Math.min(NewScale, CanvasDiv.offsetHeight/(TemplateR.height))*9.5
        //CanvasScale.setAttribute("transform", "scale(" + NewScale + ")")

        Workspace.setAttribute('width', TemplateR.width*NewScale)
        Workspace.setAttribute('height', TemplateR.height*NewScale)
        z='Center'
    }
    
    if (z=='Center'){
        CanvasDiv = document.getElementById( 'CanvasDiv' );
        Template = document.getElementById( 'Template' ).getBoundingClientRect();
        CanvasDiv.scrollTop = (Workspace.getAttribute('height')*0.45) - (CanvasDiv.offsetHeight-Template.height)/2
        CanvasDiv.scrollLeft = (Workspace.getAttribute('width')*0.45) - (CanvasDiv.offsetWidth-Template.width)/2 
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
