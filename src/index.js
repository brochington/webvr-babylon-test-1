import Babylon from 'babylonjs';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('render-canvas');
    console.log('got a canvas!', canvas);

    let engine = new Babylon.Engine(canvas, true);

    let scene = new Babylon.Scene(engine);

    let camera = new Babylon.FreeCamera('camera1', new Babylon.Vector3(0, 5,-10), scene);

    camera.setTarget(Babylon.Vector3.Zero());

    camera.attachControl(canvas, false);

    let light = new Babylon.HemisphericLight('light1', new Babylon.Vector3(0,1,0), scene);

    let sphere = Babylon.Mesh.CreateSphere('sphere1', 16, 2, scene);

    sphere.position.y = 1;

    let ground = Babylon.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    engine.runRenderLoop(() => {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
        engine.resize();
    });
})
