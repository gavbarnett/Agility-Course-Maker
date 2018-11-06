var container;
var pause = false
var camera, scene, renderer
var equipment = [];
var loader = new THREE.ColladaLoader(manager);
var manager = new THREE.LoadingManager();

function start3D() {
    container = document.getElementById( 'MainCanvas2' );
    container.id = "MainCanvas2";
    container.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    container.height =  container.width
    container.style.border = "1px solid";
    container.tabIndex = 1
    container.focus()
    camera = new THREE.PerspectiveCamera( 45, container.width / container.height, 0.1, 2000 );
    //camera.position.set( 30, 30, 10 );
    //camera.lookAt( 15, 3, 15 );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 30, 150 );
    // loading manager
    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( equipment );
    } );

    // collada
    FieldDraw3D()

    //scene
    scene.add( new THREE.AmbientLight( 0x666666 ) );
				var light = new THREE.DirectionalLight( 0xdfebff, 1 );
				light.position.set( 50, 200, 100 );
				light.position.multiplyScalar( 1.3 );
				light.castShadow = true;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
				var d = 300;
				light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;
				light.shadow.camera.far = 1000;
				scene.add( light );

    camera = new THREE.PerspectiveCamera( 30, container.width / container.height, 1, 1000 );

    // ground
    var loaderT = new THREE.TextureLoader();
    var groundTexture = loaderT.load( './assets/3Dassets/textures/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 300, 300 ), groundMaterial );
    mesh.position.y = 0;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { canvas: MainCanvas2 } );
				//renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( document.getElementById( 'MainCanvas2' ).width, document.getElementById( 'MainCanvas2' ).height );
                renderer.setClearColor( 0x7EC0EE, 1 );
                //container.appendChild( renderer.domElement );
    //
    //controls
    var controls = new THREE.OrbitControls( camera, container );
                controls.maxPolarAngle = Math.PI * 0.49;
				controls.minDistance = 1;
                controls.maxDistance = 50;
                controls.object.position.set(15, 50, 30);
                controls.target = new THREE.Vector3(15,0,15)
                //window.addEventListener( 'resize', onWindowResize, false );
                controls.update();
                animate();
    

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
                    scene.add(dae);
                    render();
               // }
           // }
        }, function(progress) {
            // show some progress
    });
}
//function onWindowResize() {
 //   camera.aspect = window.innerWidth / window.innerHeight;
  //  camera.updateProjectionMatrix();
  //  renderer.setSize( window.innerWidth, window.innerHeight );
//}
function animate() {
    render();
    if (!pause) {
        requestAnimationFrame( animate );
    }
}
function render() {
    renderer.render( scene, camera );
}
