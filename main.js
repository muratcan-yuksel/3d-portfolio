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
//we'll add a light for here
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
//let's combine the geometry and the material
//this is the actual thing we want to add to the scene
const torus = new THREE.Mesh(geometry, material);
//let's add it do the scene
scene.add(torus);
//adding the light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
//ambient light is like a light that illuminates the room
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
// Helpers
//to see where the light is coming from, usee a light helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

//add random starts
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load("jeff.png");

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//let's write a recursive function that calls the render method over and over again automatically
//because we need to render what we've done
//he says this function resembles a game loop that's used in game development
function animate() {
  requestAnimationFrame(animate);
  //every shape we create has different properties like rotation, position, scale etc.
  //and if we change its properties inside a loop, the shape will animate
  //check this out
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

//call the above recursive function
animate();
