var container;
var camera, scene, renderer, elf;
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
        scene.add( elf );
    } );
    // collada
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( './assets/3Dassets/Collada Objects/Over-1.dae', function ( collada ) {
        elf = collada.scene;
    } );
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
    //container.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
    animate();

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
    if ( elf !== undefined ) {
    } else {
    }
    renderer.render( scene, camera );
}
