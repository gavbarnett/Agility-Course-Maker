var container;
var camera, scene, renderer
var equipment = [];
function drawEquipment3D() {
    container = document.getElementById( 'MainCanvas2' );
    container.id = "MainCanvas2";
    container.width = Math.min(window.innerWidth*0.95,window.innerHeight*0.75) 
    container.height =  container.width
    container.style.border = "1px solid";
    container.tabIndex = 1
    container.focus()

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set( 8, 10, 8 );
    camera.lookAt( 0, 3, 0 );
    scene = new THREE.Scene();
    // loading manager
    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( equipment );
    } );
    // collada
    //Load Grass
   // for (var x = 0; x < 6; x++) {
     //   for (var z = 0; z < 6; z++) {
            load( './assets/3Dassets/Collada Objects/grass-5m.dae', 0,0,0)
     //   }
    //}
    //load( './assets/3Dassets/Collada Objects/Over-1.dae', 0,0,0)
   // load( './assets/3Dassets/Collada Objects/Over-1.dae', 2,0,0)
   // load( './assets/3Dassets/Collada Objects/Over-1.dae', 4,0,0)
   // load( './assets/3Dassets/Collada Objects/Over-1.dae', 0,0,1)
   // load( './assets/3Dassets/Collada Objects/Over-1.dae', 0,0,2)
    //var loader = new THREE.ColladaLoader( loadingManager );
    //loader.load( './assets/3Dassets/Collada Objects/Over-1.dae', function ( collada ) {
    //    equipment = collada.scene;
    //} );
    //
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    scene.add( directionalLight );
    //
    renderer = new THREE.WebGLRenderer( { canvas: MainCanvas2 } );
				//renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( document.getElementById( 'MainCanvas2' ).width, document.getElementById( 'MainCanvas2' ).height );
                renderer.setClearColor( 0x7EC0EE, 1 );
                //container.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
    animate();

}
var loader = new THREE.ColladaLoader(manager);
var manager = new THREE.LoadingManager();

function load(daeLocation, x, y, z){
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    loader.load(daeLocation, function(collada) {
            dae = collada.scene;
            for (var x = 0; x < 6; x++) {
                for (var z = 0; z < 6; z++) {
                    instance = dae.clone()
                    instance.position.set(x, y, z); 
                    scene.add(instance);
                    render();
                }
            }
        }, function(progress) {
            // show some progress
    });
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    if ( equipment !== undefined ) {
    } else {
    }
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer.render( scene, camera );
}
