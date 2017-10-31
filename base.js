var renderer, scene, camera, container;
var arSource, arContext, arMarker;

function init(){

    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    scene = new THREE.Scene();
    camera = new THREE.Camera();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    scene.add(camera);
    scene.visible = false;

    arSource = new THREEx.ArToolkitSource({ sourceType : 'webcam' });
    arContext = new THREEx.ArToolkitContext({ cameraParametersUrl: '../assets/data/camera_para.dat', detectionMode: 'mono', });
    arMarker = new THREEx.ArMarkerControls(arContext, camera, { type : 'pattern', patternUrl : '../assets/data/u4bi.patt', changeMatrixMode: 'cameraTransformMatrix' });
    
    arSource.init(function(){
        arSource.onResize();
        arSource.copySizeTo(renderer.domElement);
        if(arContext.arController !== null) arSource.copySizeTo(arContext.arController.canvas);
    });

    arContext.init(function onCompleted(){
        camera.projectionMatrix.copy(arContext.getProjectionMatrix());
    });

}