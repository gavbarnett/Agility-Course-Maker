
function drawEquipment3D(item, scaler, offset, canvas){
    console.log("Going 3D")
    var canvasDiv = document.getElementById('CanvasDiv')

    var renderer = new THREE.WebGLRenderer()
    canvasDiv.appendChild(renderer.domElement)
    renderer.setClearColor(0x00ff00)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth*0.5, window.innerHeight*0.5)

    var camera  = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight, 0.1, 3000)

    var scene = new THREE.Scene()

    var light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)

    var light1 = new THREE.PointLight(0xffffff, 0.5)
    scene.add(light1)

    var geometry = new THREE.CubeGeometry(100,100,100)
    var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2})
    var mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(0,0,-1000)

    scene.add(mesh)

    var render = function() {
        mesh.rotation.x +=0.01
        mesh.rotation.y += 0.1
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)


}