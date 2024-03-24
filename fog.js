import * as THREE from 'three';
import GUI from 'lil-gui'

// GUI pour régler le fog
class FogGUIHelper {
    constructor(fog, backgroundColor) {
      this.fog = fog;
      this.backgroundColor = backgroundColor;
    }
    get near() {
      return this.fog.near;
    }
    set near(v) {
      this.fog.near = v;
      this.fog.far = Math.max(this.fog.far, v);
    }
    get far() {
      return this.fog.far;
    }
    set far(v) {
      this.fog.far = v;
      this.fog.near = Math.min(this.fog.near, v);
    }
    get color() {
        return `#${this.fog.color.getHexString()}`;
    }
    set color(hexString) {
        this.fog.color.set(hexString);
        this.backgroundColor.set(hexString);
    }
}

const canvas = document.querySelector("#main-canvas");
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;  // the canvas default
const near = 0.1;
const far = 5;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
{   // Ajout du fog

    // FogExp2
    // const color = 0x505050;
    // const density = 0.4;
    // scene.fog = new THREE.FogExp2(color, density);
    
    const color = 0x606060;  // white
    const near = 0.1;
    const far = 4;
    scene.fog = new THREE.Fog(color, near, far);

    scene.background = new THREE.Color(color);

    // Implémentation GUI
    // const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
    // gui.add(fogGUIHelper, 'near', near, far).listen();
    // gui.add(fogGUIHelper, 'far', near, far).listen();
    // gui.addColor(fogGUIHelper, 'color');
}
 

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
// const cube = new THREE.Mesh(geometry, material);


const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//scene.add(cube);
camera.position.z = 2;

const cubes = [
	makeInstance(geometry, 0x44aa88,  0),
	makeInstance(geometry, 0x8844aa, -2),
	makeInstance(geometry, 0xaa8844,  2),
  ];

// Fonction pour créer un cube
function makeInstance(geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({color});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	cube.position.x = x;
	return cube;
  }

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;	
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
  		renderer.setSize(width, height, false);
	}
	return needResize;
}

function animate(time) {
	requestAnimationFrame( animate );	
	
	
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	  }

	cubes.forEach((cube, ndx) => {
		const speed = 0.001 + ndx * .001;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
});



	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	
	renderer.render( scene, camera );	
}
animate();
