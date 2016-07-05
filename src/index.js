import Babylon, {Vector3, Quaternion, Matrix} from 'babylonjs';
import {createGamepadBoxes, updateGamepadBox, checkGamepad, getVRGamepads} from './gamepads';

let counter = 0;
let standMatrix = null;

function createBoxes(scene) {
  /* Boxes */
  let box1 = new Babylon.Mesh.CreateBox('box1', 0.5, scene);
  box1.position = new Babylon.Vector3(0, 0, -3);
  box1.material = new Babylon.StandardMaterial('texture1', scene);
  box1.material.backFaceCulling = false;
  box1.material.diffuseColor = new Babylon.Color3.Red();

  let box2 = new Babylon.Mesh.CreateBox('box2', 0.5, scene);
  box2.position = new Babylon.Vector3(3, 1, 0);
  box2.material = new Babylon.StandardMaterial('texture2', scene);
  box2.material.backFaceCulling = false;
  box2.material.diffuseColor = new Babylon.Color3.Green();

  let box3 = new Babylon.Mesh.CreateBox('box3', 0.5, scene);
  box3.position = new Babylon.Vector3(0, 1, 3);
  box3.material = new Babylon.StandardMaterial('texture3', scene);
  box3.material.backFaceCulling = false;
  box3.material.diffuseColor = new Babylon.Color3.Blue();

  let box4 = new Babylon.Mesh.CreateBox('box4', 0.5, scene);
  box4.position = new Babylon.Vector3(-3, 1, 0);
  box4.material = new Babylon.StandardMaterial('texture4', scene);
  box4.material.backFaceCulling = false;
  box4.material.diffuseColor = new Babylon.Color3.Purple();

  let box5 = new Babylon.Mesh.CreateBox('box5', 0.5, scene);
  box5.position = new Babylon.Vector3(0, 1, 0);
  box5.material = new Babylon.StandardMaterial('texture6', scene);
  box5.material.backFaceCulling = false;
  box5.material.diffuseColor = new Babylon.Color3.White();
}

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('render-canvas');

    let engine = new Babylon.Engine(canvas, true);

    let scene = new Babylon.Scene(engine);

    navigator.getVRDisplays().then((displays) => {
        let display = displays[0];

        let camera = new Babylon.VRRoomScaleCamera('camera2', new Babylon.Vector3(0, 0, 0), display, scene);
        camera.setTarget(Babylon.Vector3.Zero());
        camera.attachControl(canvas, false, 'something here.');

        let light = new Babylon.HemisphericLight('light1', new Babylon.Vector3(0,1,0), scene);

        const {sizeX, sizeZ, sittingToStandingTransform} = display.stageParameters;
        standMatrix = Matrix.FromArray(sittingToStandingTransform);

        let ground = Babylon.Mesh.CreateGround('ground1', sizeX, sizeZ, 2, scene);
        ground.material = new Babylon.StandardMaterial('groundTexture1', scene);
        ground.material.backFaceCulling = false;

        createBoxes(scene);
        createGamepadBoxes(scene);

        function onAnimationFrame(){
          display.requestAnimationFrame(onAnimationFrame);
          scene.render();
          counter += 1;

          checkGamepad(standMatrix);
          if (counter % 90 === 0) {
              const vrGamepads = getVRGamepads();
              console.log(vrGamepads);
          }
        }

        display.requestAnimationFrame(onAnimationFrame);
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
        engine.resize();
    });
})
