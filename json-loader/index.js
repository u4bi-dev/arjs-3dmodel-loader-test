init();
render();
/* --------------------------------------------- */

var skinA = {},
    skinB = {},
    loader,
    clock;

loader();

function loader(){

    loader = new THREE.JSONLoader();
    clock = new THREE.Clock;


    var light = new THREE.HemisphereLight(0xFFFFFF, 0x003300, 1);
    scene.add(light);

    loader.load('../assets/model/knight/knight.js', function (geometry, materials){
        for(var i in materials) materials[i].skinning = true;

        skinA.root = new THREE.SkinnedMesh(geometry, materials);
        scene.add(skinA.root);
        skinA.mixer = new THREE.AnimationMixer(skinA.root);
        skinA.mixer.clipAction(skinA.root.geometry.animations[0]).play();
        
        skinB.root = new THREE.SkinnedMesh(geometry, materials);
        scene.add(skinB.root);
        skinB.mixer = new THREE.AnimationMixer(skinB.root);
        skinB.mixer.clipAction(skinB.root.geometry.animations[0]).play();

        skinA.root.scale.set(0.15, 0.15, 0.15);
        skinB.root.scale.set(0.15, 0.15, 0.15);

        skinA.root.position.set( 1, 0,0);
        skinB.root.position.set(-1, 0,0);

        skinA.root.rotateY(-Math.PI/2);
        skinB.root.rotateY(Math.PI/2);
    });

}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
    if(arSource.ready === false) return;
    arContext.update(arSource.domElement);
    scene.visible = camera.visible;
    /* --------------------------------------------- */


    if(skinA.mixer) skinA.mixer.update(clock.getDelta());
    if(skinB.mixer) skinB.mixer.update(.05);
    
}          
