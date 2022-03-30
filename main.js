import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
// first argument is view, which is the amount of the world that is visible
//second argumen is aspect ratio, which is based on the user's browser window
//last arguments are view  frustum, to control which objects are visible relative to the camera
//0.1 to 1000 basically means we can see pretty much anything
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//the renderer needs to know which DOM element to use
//which will be the canvas element in our case
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
//make it a full screen canvas
renderer.setSize(window.innerWidth, window.innerHeight);
//at the moment our camera is positioned in the middle of the scene
//we can move it around the Z axis a bit like so
camera.position.setZ(30);
//here render method is like saying "draw"
renderer.render(scene, camera);
//create a 3d ring
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//will use a basic material which requires no light source
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});
//let's combine the geometry and the material
//this is the actual thing we want to add to the scene
const torus = new THREE.Mesh(geometry, material);
//let's add it do the scene
scene.add(torus);
//let's write a recursive function that calls the render method over and over again automatically
//because we need to render what we've done
//he says this function resembles a game loop that's used in game development
function animate() {
  requestAnimationFrame(animate);
  //every shape we create has different properties like rotation, position, scale etc.
  //and if we change its properties inside a loop, the shape will animate
  //check this out
  torus.rotation.x += 0.01;
  renderer.render(scene, camera);
}

//call the above recursive function
animate();
