import Babylon, {Vector3, Quaternion, Matrix} from 'babylonjs';

let gpBox1 = null;
let gpBox2 = null;

export function createGamepadBoxes(scene) {
  gpBox1 = new Babylon.Mesh.CreateBox('gpBox1', 0.1, scene);
  gpBox1.position = new Babylon.Vector3(1.5, 1.5, -1.5);
  gpBox1.material = new Babylon.StandardMaterial('gpBox1', scene);
  gpBox1.material.backFaceCulling = false;
  gpBox1.material.diffuseColor = new Babylon.Color3.Green();

  gpBox2 = new Babylon.Mesh.CreateBox('gpBox2', 0.1, scene);
  gpBox2.position = new Babylon.Vector3(0, 2.5, 0);
  gpBox2.material = new Babylon.StandardMaterial('gpBox2', scene);
  gpBox2.material.backFaceCulling = false;
  gpBox2.material.diffuseColor = new Babylon.Color3.Blue();
}

export function updateGamepadBox(gamepad, box, standMatrix) {
  let o = gamepad.pose.orientation || [];
  let p = gamepad.pose.position || [];

  var result = Matrix.Compose(
    new Vector3(1, 1, 1),
    new Quaternion(o[0], o[1], o[2], o[3]),
    new Vector3(p[0], p[1], p[2])
  );

  result = result.multiply(standMatrix);

  box.position = result.getTranslation();
  box.rotationQuaternion = Quaternion.FromRotationMatrix(result);
}

export function checkGamepad(standMatrix) {
  const vrGamepads = getVRGamepads();

  if (vrGamepads[0]) {
    updateGamepadBox(vrGamepads[0], gpBox1, standMatrix);
  }

  if (vrGamepads[1]) {
    updateGamepadBox(vrGamepads[1], gpBox2, standMatrix);
  }
}

export function getVRGamepads() {
  let gamepads = navigator.getGamepads();
  let vrGamepads = [];

  for (let gamepad of gamepads) {
    if (gamepad && gamepad.pose) {
      vrGamepads.push(gamepad)
    }
  }

  return vrGamepads;
}
