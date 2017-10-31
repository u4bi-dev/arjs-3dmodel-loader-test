init();
render();
/* --------------------------------------------- */

var gear,
    loader,
    clock,
    mixer;

loader();

function loader(){

    loader = new THREE.ObjectLoader();
    clock = new THREE.Clock;

    var light = new THREE.HemisphereLight(0xFFFFFF, 0x003300, 1);
    scene.add(light);

    loader.load('../assets/model/gear/gear.json', function (mesh){
        
        gear = mesh;
        
        gear.rotateZ(Math.PI/2);
        gear.scale.set(0.05,0.05,0.05);
        scene.add(gear);

        mixer = new THREE.AnimationMixer(gear);
        mixer.clipAction(gear.animations[0]).play();

    });

}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
    if(arSource.ready === false) return;
    arContext.update(arSource.domElement);
    scene.visible = camera.visible;
    /* --------------------------------------------- */


    if(mixer) mixer.update(clock.getDelta());
    
}          
