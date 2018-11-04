var container;
var pause = false
var camera, scene, renderer
var equipment = [];
var loader = new THREE.ColladaLoader(manager);
var manager = new THREE.LoadingManager();

function drawEquipment3D() {
    container = document.getElementById( 'MainCanvas2' );
    container.id = "MainCanvas2";
    container.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    container.height =  container.width
    container.style.border = "1px solid";
    container.tabIndex = 1
    container.focus()
    camera = new THREE.PerspectiveCamera( 45, container.width / container.height, 0.1, 2000 );
    camera.position.set( 8, 10, 8 );
    camera.lookAt( 0, 3, 0 );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 30, 150 );
    // loading manager
    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( equipment );
    } );

    // collada
    load( './assets/3Dassets/Collada Objects/Over-1.dae', 0,0,0,0)
    load( './assets/3Dassets/Collada Objects/Over-1.dae', 5,0,5, Math.PI/2)
    load( './assets/3Dassets/Collada Objects/Over-3.dae', 3,0,0,0)
    load( './assets/3Dassets/Collada Objects/Contact-1.dae', 5,0,0,0)
    load( './assets/3Dassets/Collada Objects/Contact-2.dae', 7,0,0,0)
    load( './assets/3Dassets/Collada Objects/Contact-3.dae', 8,0,0,0)

   // load( './assets/3Dassets/Collada Objects/Over-1.dae', 0,0,2,0)
    //var loader = new THREE.ColladaLoader( loadingManager );
    //loader.load( './assets/3Dassets/Collada Objects/Over-1.dae', function ( collada ) {
    //    equipment = collada.scene;
    //} );

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

    camera = new THREE.PerspectiveCamera( 30, container.width / container.height, 1, 10000 );
    camera.position.set( 20, 5, 20 );
    camera.lookAt( scene.position )

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
				controls.maxPolarAngle = Math.PI * 0.5;
				controls.minDistance = 1;
				controls.maxDistance = 50;
   
                //window.addEventListener( 'resize', onWindowResize, false );
    animate();
    

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
    if ( equipment !== undefined ) {
    } else {
    }
    //if ( camera.position.y > 1 ) {
     //   camera.position.y -= 0.1
      //  camera.lookAt(new THREE.Vector3(0,0,0));
        renderer.render( scene, camera );
    //} else {
    //    pause = true
    //}
}
