function drawEquipment(item, scaler, offset, addPoints){
    var a = offset + scaler*item.x
    var b = offset + scaler*item.y
    var Theta = item.rotation

    this.PathOptionPoints = function (x1,y1,x2,y2){
        var tempPoints = []
        tempPoints.x1 = a + (x1 * Math.cos(Theta) - y1 * Math.sin(Theta))
        tempPoints.y1 = b + (x1 * Math.sin(Theta) + y1 * Math.cos(Theta))
        tempPoints.x2 = a + (x2 * Math.cos(Theta) - y2 * Math.sin(Theta))
        tempPoints.y2 = b + (x2 * Math.sin(Theta) + y2 * Math.cos(Theta))
        if (addPoints == true){ 
            PathOptions.push(Object.assign({},tempPoints))
        }
        return (tempPoints)
    }

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
            case 3: //"Table"
                ctx.fillStyle = "#FFFF00";
                ctx.strokeStyle = '#000000';
                ctx.beginPath()
                ctx.rect(scaler*-0.941/2,scaler*-0.941/2, scaler*0.941,scaler*0.941)
                ctx.fill()
                ctx.stroke()
                ctx.fillStyle = "#000000";
                ctx.font = "bold " + Math.round(scaler/1.5) + "px Arial";
                ctx.textAlign = "center";
                ctx.fillText("T",0,scaler*0.25);
                break
            case 4: //"Pause Box"
                ctx.fillStyle = "#FFFF00";
                ctx.strokeStyle = '#000000';
                ctx.beginPath()
                ctx.rect(scaler*-1.219/2,scaler*-1.219/2, scaler*1.219,scaler*1.219)
                ctx.fill()
                ctx.stroke()
                ctx.fillStyle = "#000000";
                ctx.font = "bold " + Math.round(scaler/1.5) + "px Arial";
                ctx.textAlign = "center";
                ctx.fillText("P",0,scaler*0.25);
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
                PathOptionPoints(0, scaler*0.05, 0, scaler*-0.05)
                break
            case 1: //"Spread":
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = "#000000";
                var spread = 4
                ctx.beginPath()
                ctx.arc(scaler*(-0.6095-0.1), scaler*(-(0.225*spread)/2-0.2),0.05*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(-0.6095-0.1), scaler*((0.225*spread)/2+0.1),0.05*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(+0.6095+0.1), scaler*(-(0.225*spread)/2-0.2),0.05*scaler,0,2*Math.PI)
                ctx.stroke()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(scaler*(+0.6095+0.1), scaler*((0.225*spread)/2+0.1),0.05*scaler,0,2*Math.PI)
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
            case 1: //"Chute":
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
    this.drawNumbers = function(){
        ctx.rotate(-item.rotation)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = '#000000';
        ctx.beginPath()
        ctx.rect(scaler*-0.5,scaler*-0.5, scaler*1,scaler*1)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = "#000000";
        ctx.font = "bold " + Math.round(scaler/1.5) + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText((allEquipment["Numbers"][item.type[1]]),0,0);
        //find nearest PathOption and add to DogsPath
        //list will be ordered this later
        var minDist = 99999
        addPoints = false
        var numLocation = this.PathOptionPoints(0,0,0,0)
        var tempDogPoint = []
        tempDogPoint = numLocation
        tempDogPoint.direction = 1
        for (let tempPath of PathOptions){
            tempDist = Math.sqrt(Math.pow(numLocation.x1 - tempPath.x1,2)+Math.pow(numLocation.y1 - tempPath.y1,2))
            if (tempDist < minDist){
                minDist = tempDist
                tempDogPoint = tempPath
                tempDogPoint.direction = 1
            }
            tempDist = Math.sqrt(Math.pow(numLocation.x1 - tempPath.x2,2)+Math.pow(numLocation.y1 - tempPath.y2,2))
            if (tempDist < minDist){
                minDist = tempDist
                tempDogPoint = tempPath
                tempDogPoint.direction = 2
            }
        }
        tempDogPoint.n = item.type[1]
        DogsPath.push(Object.assign({},tempDogPoint))
    }
    //if (!canvas){
        canvas = document.getElementById('MainCanvas');
    //}
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
        case "Numbers":
            this.drawNumbers()
            break
    }

    ctx.restore()

}

function drawDogsPath(points){
    points.sort(function(a,b){
        return a.n - b.n
    })
    canvas = document.getElementById('MainCanvas');
    ctx = canvas.getContext("2d");

    if(points.length>0){
        var bezPoints = []
        bezPoints.a = []
        bezPoints.b = []
        ctx.strokeStyle = '#0e1cea';
        ctx.setLineDash([3, 2])
        ctx.beginPath()
        if (points[0].direction == 1) {
            ctx.moveTo(points[0].x1,points[0].y1)
         
        } else {
            ctx.moveTo(points[0].x2,points[0].y2)
            
        }
        for (let tempPoints of points){
            if (tempPoints.direction == 1) {
                bezPoints.b.ang = Math.atan2((tempPoints.x1-tempPoints.x2),(tempPoints.y1-tempPoints.y2))
                bezPoints.b.x = tempPoints.x1 + 5*scaler*Math.sin(bezPoints.b.ang)
                bezPoints.b.y = tempPoints.y1 + 5*scaler*Math.cos(bezPoints.b.ang)
                ctx.bezierCurveTo(bezPoints.a.x, bezPoints.a.y, bezPoints.b.x, bezPoints.b.y, tempPoints.x1, tempPoints.y1)
                //ctx.lineTo(tempPoints.x1,tempPoints.y1)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(tempPoints.x2,tempPoints.y2)
                bezPoints.a.ang = Math.PI + bezPoints.b.ang
                bezPoints.a.x = tempPoints.x2 + 5*scaler*Math.sin(bezPoints.a.ang)
                bezPoints.a.y = tempPoints.y2 + 5*scaler*Math.cos(bezPoints.a.ang)
            } else {
                bezPoints.b.ang = Math.atan2((tempPoints.x2-tempPoints.x1),(tempPoints.y2-tempPoints.y1))
                bezPoints.b.x = tempPoints.x2 + 5*scaler*Math.sin(bezPoints.b.ang)
                bezPoints.b.y = tempPoints.y2 + 5*scaler*Math.cos(bezPoints.b.ang)
                ctx.bezierCurveTo(bezPoints.a.x, bezPoints.a.y, bezPoints.b.x, bezPoints.b.y, tempPoints.x2, tempPoints.y2)
                //ctx.lineTo(tempPoints.x2,tempPoints.y2)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(tempPoints.x1,tempPoints.y1)
                bezPoints.a.ang = Math.PI + bezPoints.b.ang
                bezPoints.a.x = tempPoints.x1 + 5*scaler*Math.sin(bezPoints.a.ang)
                bezPoints.a.y = tempPoints.y1 + 5*scaler*Math.cos(bezPoints.a.ang)
            }        
        }
        ctx.stroke()
        ctx.setLineDash([1, 0])
    }
}