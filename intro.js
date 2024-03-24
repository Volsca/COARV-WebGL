import * as THREE from 'three';

const canvas = document.querySelector("#main-canvas");
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;  // the canvas default
const near = 0.1;
const far = 5;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();

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



////// Premier code tutoriel threejs
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;


// function animate() {
// 	requestAnimationFrame( animate );
	
// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;
// 	cube.rotation.z += 0.01; 

// 	renderer.render( scene, camera );	
// }
// animate();


