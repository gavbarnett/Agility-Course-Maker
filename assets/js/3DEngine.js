var container;
var pause = false
var camera, scene, renderer
var equipment = [];
var loader = new THREE.ColladaLoader(manager);
var manager = new THREE.LoadingManager();
var sceneObjects = []
var lastposition
function start3D() {
    var canvas = document.getElementById('MainCanvas');
    var canvasDiv = document.getElementById('CanvasDiv')
    canvas.id = "MainCanvas";
    container = document.getElementById( 'MainCanvas2' );
    container.id = "MainCanvas2";
    container.width =  canvas.width 
    container.height =   canvas.width
    container.style.border = "1px solid";
    container.style.visibility = "visible";
    container.tabIndex = 1
    container.focus()
    pause = false
    //camera.position.set( 30, 30, 10 );
    //camera.lookAt( 15, 3, 15 );
    try {
        //scene = scene.dispose.apply(scene, scene.children);
        scene.remove.apply(scene, scene.children);
    }
    catch {
        scene = new THREE.Scene();
        sceneObjects.background = new THREE.Color( 0xcce0ff ); 
        sceneObjects.fog = new THREE.Fog( 0xcce0ff, 30, 150 );
        sceneObjects.ambLight = new THREE.AmbientLight( 0xffffff, 0.3 )
        sceneObjects.dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
            sceneObjects.dirLight = sceneObjects.dirLight
            sceneObjects.dirLight.color.setHSL( 0.1, 1, 0.95 );
            sceneObjects.dirLight.position.set( 200, 200, 200 );
            sceneObjects.dirLight.position.multiplyScalar( 1 );
            sceneObjects.dirLight.castShadow = true;
            sceneObjects.dirLight.shadow.mapSize.width = 2048;
            sceneObjects.dirLight.shadow.mapSize.height = 2048;
            var d = 25;
            sceneObjects.dirLight.shadow.camera.left = - d;
            sceneObjects.dirLight.shadow.camera.right = d;
            sceneObjects.dirLight.shadow.camera.top = d;
            sceneObjects.dirLight.shadow.camera.bottom = - d;
            sceneObjects.dirLight.shadow.camera.far = 3500;
            sceneObjects.dirLight.shadow.bias = - 0.0001;
        sceneObjects.camera = new THREE.PerspectiveCamera( 30, container.width / container.height, 1, 1000 )    
        sceneObjects.renderer = new THREE.WebGLRenderer( { canvas: MainCanvas2 } );
            //renderer = new THREE.WebGLRenderer();
            sceneObjects.renderer.setPixelRatio( container.devicePixelRatio );
            sceneObjects.renderer.setSize( document.getElementById( 'MainCanvas2' ).width, document.getElementById( 'MainCanvas2' ).height );
            sceneObjects.renderer.setClearColor( 0x7EC0EE, 1 );
            sceneObjects.renderer.shadowMap.enabled = true
            sceneObjects.renderer.shadowMapSoft = true;
            sceneObjects.controls = new THREE.OrbitControls( sceneObjects.camera, container );
            sceneObjects.controls.maxPolarAngle = Math.PI * 0.49;
            sceneObjects.controls.minDistance = 1;
            sceneObjects.controls.maxDistance = 70;
            sceneObjects.controls.object.position.set(15, 50, 30);
            sceneObjects.controls.target = new THREE.Vector3(15,0,15)
            //window.addEventListener( 'resize', onWindowResize, false );
        var loaderT = new THREE.TextureLoader();
        var groundTexture = loaderT.load( './assets/3Dassets/textures/grassII.jpg' );
            groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
            groundTexture.repeat.set( 25, 25 );
            groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
            groundMaterial.receiveShadow = true
         sceneObjects.groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 300, 300 ), groundMaterial );
            sceneObjects.groundMesh.position.y = 0;
            sceneObjects.groundMesh.rotation.x = - Math.PI / 2;
            sceneObjects.groundMesh.receiveShadow = true;
            camera = sceneObjects.camera
            renderer = sceneObjects.renderer
            renderer.setPixelRatio( container.devicePixelRatio );
            controls = sceneObjects.controls
            controls.update();
    }
    scene.background = sceneObjects.background;
    scene.fog = sceneObjects.fog 
    // draw equipment
    FieldDraw3D()
    // LIGHTS
    scene.add( sceneObjects.ambLight)
    scene.add( sceneObjects.dirLight );
    //dirLightHeper = new THREE.DirectionalLightHelper( sceneObjects.dirLight, 10 );
    //scene.add( dirLightHeper );

    //camera = sceneObjects.camera
    
    //var helper = new THREE.CameraHelper( light.shadow.camera );
    //scene.add( helper );
    
    // ground
    scene.add( sceneObjects.groundMesh );

    //renderer = sceneObjects.renderer
    
    //fence
    load( './assets/3Dassets/Collada Objects/Fence30m.dae', 0, 0, 30, 0)
    //controls
    //controls = sceneObjects.controls
    //controls.update();
    //controls.position = 
    animate();
    

}
function update3D(){
        start3D()
}

function FieldDraw3D(){
    for (var i = 0; i <PlacedEquipment.length; i++){
        drawEquipment3D(PlacedEquipment[i])
    }
}

function drawEquipment3D(item){

    this.drawContact = function(){
        switch(item.type[1]){
            case 0: //"A-frame"
            load( './assets/3Dassets/Collada Objects/Contact-1.dae', item.x, 0,item.y, -item.rotation-Math.PI/2)
                break
            case 1: //"Dog Walk"
            load( './assets/3Dassets/Collada Objects/Contact-2.dae', item.x, 0,item.y, -item.rotation-Math.PI/2)
                break
            case 2: //"See Saw"
                load( './assets/3Dassets/Collada Objects/Contact-3.dae', item.x, 0,item.y, -item.rotation-Math.PI/2)
                break
            case 3: //"Table"
                
                break
            case 4: //"Pause Box"
                
                break
        }
    }
    this.drawOver = function(){
        switch(item.type[1]){
            case 0: //"Winged Single Jump":
                load( './assets/3Dassets/Collada Objects/Over-1.dae', item.x, 0,item.y, -item.rotation)
                break
            case 1: //"Spread":
                
                break
            case 2: //"Tire Jump":
                load( './assets/3Dassets/Collada Objects/Over-3.dae', item.x, 0,item.y, -item.rotation)
                break
        }
    }
    this.drawThrough = function(){
        switch(item.type[1]){
            case 0: //"Tunnel":
                //var tunnel = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
                var length = item.type[2]
                var rads = item.type[3]*1 //not sure why *1 required... but it is
                var geometry = new THREE.TorusGeometry(rads, 0.609, 9, 20, length/rads);
                var material = new THREE.MeshLambertMaterial({color: 0x0000FF, side: THREE.DoubleSide})
                var mesh = new THREE.Mesh(geometry,material)
                mesh.position.set(item.x, 0.609, item.y); 
                mesh.rotation.y = 0//Math.PI/2
                mesh.rotation.z = -Math.PI/2-((length/rads)/2)+item.rotation
                mesh.rotation.x = Math.PI/2
                mesh.castShadow = true
                mesh.receiveShadow = true 
                mesh.position.x -= Math.cos(Math.PI/2-item.rotation)*rads 
                mesh.position.z += Math.sin(Math.PI/2-item.rotation)*rads
                //mesh.doubleSided =  true
                scene.add(mesh)
                
                break
            case 1: //"Chute":
                break
        }
    }
    this.drawWeave = function(){
        switch(item.type[1]){
            case 0: //"6":
                load( './assets/3Dassets/Collada Objects/Pole-1.dae', item.x, 0,item.y, -item.rotation+Math.PI/2)
                break
            case 1: //"9":
                load( './assets/3Dassets/Collada Objects/Pole-2.dae', item.x, 0,item.y, -item.rotation+Math.PI/2)
                break
            case 2: //"12":
                load( './assets/3Dassets/Collada Objects/Pole-3.dae', item.x, 0,item.y, -item.rotation+Math.PI/2)
                break
        }
    }
    this.drawNumbers = function(){
        //ctx.fillText((allEquipment["Numbers"][item.type[1]]),0,scaler*0.25);
    }
    if (!canvas){
        canvas = document.getElementById('MainCanvas');
    }
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
}

function load(daeLocation, x, y, z, rot){
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    loader.load(daeLocation, function(collada) {
            dae = collada.scene;
            //for (var x = 0; x < 6; x++) {
                //for (var z = 0; z < 6; z++) {
                  //  instance = dae.clone()
                    dae.position.set(x, y, z); 
                    dae.rotation.z = rot
                    dae.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.castShadow = true;
                            child.receiveShadow = true;                   
                        }
                    } );
                    scene.add(dae);
                    render();
               // }
           // }
        }, function(progress) {
            // show some progress
    });
}
function animate() {
    render();
    if (!pause) {
        requestAnimationFrame( animate );
    }
}
function render() {
    renderer.render( scene, camera );
}
function end3D(){
    container = document.getElementById( 'MainCanvas2' );
    container.style.visibility = "collapse";
    pause = true
    container.width = 1 
    container.height =  container.width
    Field.resize()
}

