console.log("✅ custom js/main.js loaded (traffic debug)");


const SOUTH = 2;
const LEAP = 240;
var camera,
  scene,
  controls,
  renderer,
  stats,
  loader,
  pmremGenerator,
  mouse = new THREE.Vector2(),
  raycaster = new THREE.Raycaster(),
  carList = [],
  
  manager = new THREE.LoadingManager(),
  loader = new THREE.GLTFLoader(manager),
  isPlaying = true;

var clusterNames = [
  'factory',
  'house2',
  'shoparea',
  'house',
  'apartments',
  'shops',
  'fastfood',
  'house3',
  'stadium',
  'gas',
  'supermarket',
  'coffeeshop',
  'residence',
  'bus',
  'park',
  'supermarket',
];

const cluster = [
  { x: 1, z: 0, cluster: 'road' },

  { x: 2, z: 2, cluster: clusterNames[0], direction: SOUTH },
  { x: 2, z: 1, cluster: clusterNames[1], direction: SOUTH },
  { x: 2, z: 0, cluster: clusterNames[2], direction: SOUTH },
  { x: 2, z: -1, cluster: clusterNames[3], direction: SOUTH },
  { x: 2, z: -2, cluster: clusterNames[0], direction: SOUTH },
  { x: 2, z: -3, cluster: clusterNames[1], direction: SOUTH },
  { x: 2, z: -4, cluster: clusterNames[2], direction: SOUTH },
  { x: 2, z: -5, cluster: clusterNames[3], direction: SOUTH },

  { x: 1, z: 2, cluster: clusterNames[4], direction: SOUTH },
  { x: 1, z: 1, cluster: clusterNames[7], direction: SOUTH },
  { x: 1, z: 0, cluster: clusterNames[8], direction: SOUTH },
  { x: 1, z: -1, cluster: clusterNames[9], direction: SOUTH },
  { x: 1, z: -2, cluster: clusterNames[4], direction: SOUTH },
  { x: 1, z: -3, cluster: clusterNames[7], direction: SOUTH },
  { x: 1, z: -4, cluster: clusterNames[8], direction: SOUTH },
  { x: 1, z: -5, cluster: clusterNames[9], direction: SOUTH },

  { x: 0, z: 2, cluster: clusterNames[5], direction: SOUTH },
  { x: 0, z: 1, cluster: clusterNames[10], direction: SOUTH },
  { x: 0, z: 0, cluster: clusterNames[12], direction: SOUTH },
  { x: 0, z: -1, cluster: clusterNames[13], direction: SOUTH },
  { x: 0, z: -2, cluster: clusterNames[5], direction: SOUTH },
  { x: 0, z: -3, cluster: clusterNames[10], direction: SOUTH },
  { x: 0, z: -4, cluster: clusterNames[12], direction: SOUTH },
  { x: 0, z: -5, cluster: clusterNames[13], direction: SOUTH },

  { x: -1, z: 2, cluster: clusterNames[6], direction: SOUTH },
  { x: -1, z: 1, cluster: clusterNames[11], direction: SOUTH },
  { x: -1, z: 0, cluster: clusterNames[14], direction: SOUTH },
  { x: -1, z: -1, cluster: clusterNames[15], direction: SOUTH },
  { x: -1, z: -2, cluster: clusterNames[6], direction: SOUTH },
  { x: -1, z: -3, cluster: clusterNames[11], direction: SOUTH },
  { x: -1, z: -4, cluster: clusterNames[14], direction: SOUTH },
  { x: -1, z: -5, cluster: clusterNames[15], direction: SOUTH },

  { x: -2, z: 2, cluster: clusterNames[0], direction: SOUTH },
  { x: -2, z: 1, cluster: clusterNames[1], direction: SOUTH },
  { x: -2, z: 0, cluster: clusterNames[2], direction: SOUTH },
  { x: -2, z: -1, cluster: clusterNames[3], direction: SOUTH },
  { x: -2, z: -2, cluster: clusterNames[0], direction: SOUTH },
  { x: -2, z: -3, cluster: clusterNames[1], direction: SOUTH },
  { x: -2, z: -4, cluster: clusterNames[2], direction: SOUTH },
  { x: -2, z: -5, cluster: clusterNames[3], direction: SOUTH },

  { x: -3, z: 2, cluster: clusterNames[4], direction: SOUTH },
  { x: -3, z: 1, cluster: clusterNames[7], direction: SOUTH },
  { x: -3, z: 0, cluster: clusterNames[8], direction: SOUTH },
  { x: -3, z: -1, cluster: clusterNames[9], direction: SOUTH },
  { x: -3, z: -2, cluster: clusterNames[4], direction: SOUTH },
  { x: -3, z: -3, cluster: clusterNames[7], direction: SOUTH },
  { x: -3, z: -4, cluster: clusterNames[8], direction: SOUTH },
  { x: -3, z: -5, cluster: clusterNames[9], direction: SOUTH },

  { x: -4, z: 2, cluster: clusterNames[5], direction: SOUTH },
  { x: -4, z: 1, cluster: clusterNames[10], direction: SOUTH },
  { x: -4, z: 0, cluster: clusterNames[12], direction: SOUTH },
  { x: -4, z: -1, cluster: clusterNames[13], direction: SOUTH },
  { x: -4, z: -2, cluster: clusterNames[5], direction: SOUTH },
  { x: -4, z: -3, cluster: clusterNames[10], direction: SOUTH },
  { x: -4, z: -4, cluster: clusterNames[12], direction: SOUTH },
  { x: -4, z: -5, cluster: clusterNames[13], direction: SOUTH },

  { x: -5, z: 2, cluster: clusterNames[6], direction: SOUTH },
  { x: -5, z: 1, cluster: clusterNames[11], direction: SOUTH },
  { x: -5, z: 0, cluster: clusterNames[14], direction: SOUTH },
  { x: -5, z: -1, cluster: clusterNames[15], direction: SOUTH },
  { x: -5, z: -2, cluster: clusterNames[6], direction: SOUTH },
  { x: -5, z: -3, cluster: clusterNames[11], direction: SOUTH },
  { x: -5, z: -4, cluster: clusterNames[14], direction: SOUTH },
  { x: -5, z: -5, cluster: clusterNames[8], direction: SOUTH },
];

let cloudList = [];
let rainLines = null;

function main() {
  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({ canvas });

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(80, 140, 80);
  camera.lookAt(new THREE.Vector3());
  camera.position.y = 200;

  controls = new THREE.MapControls(camera, canvas);
  controls.autoRotate = false;
  controls.autoRotateSpeed = -10;
  controls.screenSpacePanning = true;

  scene = new THREE.Scene();
  // -------------------- WEATHER SYSTEM -------------------- //
// ---- Fog Ground Plane ---- //
const fogPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshLambertMaterial({
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.06
  })
);

fogPlane.rotation.x = -Math.PI / 2;
fogPlane.position.y = 2;
scene.add(fogPlane);

// ---- Puddles (simple reflective planes) ---- //
function createPuddle(x, z, scale = 1) {
  const geo = new THREE.CircleGeometry(10 * scale, 32);

  const mat = new THREE.MeshStandardMaterial({
    color: 0x3355ff,
    metalness: 0.6,
    roughness: 0.4,
    opacity: 0.45,
    transparent: true,
    envMapIntensity: 2.5,
    depthWrite: false,     // ⭐ prevent puddle being overwritten
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const puddle = new THREE.Mesh(geo, mat);
  puddle.rotation.x = -Math.PI / 2;

  puddle.position.set(x, 0.31, z);  // ⭐ always above roads

  scene.add(puddle);
}


// Place puddles around world
createPuddle(0, 0, 1.3);
createPuddle(50, -20, 0.8);
createPuddle(-40, 40, 1);
createPuddle(20, 70, 0.7);

// ---- Optional: lightning flash ---- //
let lightning = new THREE.PointLight(0x88aaff, 0, 500, 2);
lightning.position.set(0, 200, 0);
scene.add(lightning);

let nextLightning = performance.now() + 2000 + Math.random() * 4000;

function updateWeather(delta) {
  // Rain falling for rain lines
  if (rainLines) {
    const positions = rainLines.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 6) {
      positions[i + 1] -= 0.8 + Math.random() * 0.4; 
      positions[i + 4] -= 0.8 + Math.random() * 0.4;
      
      if (positions[i + 1] < -10) {
        const cloudHeight = 60 + Math.random() * 25; 
        const length = 2; 
        positions[i + 1] = cloudHeight;
        positions[i + 4] = cloudHeight - length; 
        
        const x = Math.random() * 800 - 400;
        const z = Math.random() * 800 - 400;
        
        positions[i] = x;    
        positions[i + 2] = z; 
        positions[i + 3] = x; 
        positions[i + 5] = z; 
      }
    }
    rainLines.geometry.attributes.position.needsUpdate = true;
  }

  // Lightning flashes
  let now = performance.now();
  if (now > nextLightning) {
    lightning.intensity = 10;
    setTimeout(() => (lightning.intensity = 0), 80);
    nextLightning = now + 2000 + Math.random() * 4000;
  }
}

  scene.background = new THREE.Color('#14182b');
  //9fe3faff
  renderer.shadowMap.enabled = true;
  renderer.gammaInput = renderer.gammaOutput = true;
  renderer.gammaFactor = 2.0;
  // renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0xcccccc);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  {
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ---- NIGHTTIME lighting block (replace your existing block) ----
    const light = new THREE.DirectionalLight(0x8c5520, 1);
    light.position.set(300, 200, 300);
    light.castShadow = true;
    light.shadow.mapSize.width = light.shadow.mapSize.height = 4096; // smaller, softer shadows at night
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    light.shadow.camera.left = light.shadow.camera.bottom = -200;
    light.shadow.camera.right = light.shadow.camera.top = 200;
    
    scene.add(light);
    scene.add(light.target); // keep if you rely on targets, otherwise not necessary

    // Dim hemisphere / sky bounce for moonlight
    scene.add(new THREE.HemisphereLight(0x111233, 0x000011, 0.5)); // sky color (cool), ground/dark, low intensity

    // Very low-level ambient to lift black shadows slightly
    const nightAmbient = new THREE.AmbientLight(0x222244, 0.08);
    scene.add(nightAmbient);

    // Lower tone mapping exposure if you use tone mapping elsewhere
    if (renderer && typeof renderer.toneMappingExposure !== 'undefined') {
      renderer.toneMappingExposure = 0; // reduce overall exposure for night
    }


    // quick starfield
    const starCount = 4000;
    const starsGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = Math.random() * 600 + 100; // always in sky
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMat = new THREE.PointsMaterial({ size: 2, color: 0xffffff, transparent: true, opacity: 0.9 });
    const starPoints = new THREE.Points(starsGeo, starsMat);
    scene.add(starPoints);

  }

  const gltfLoader = new THREE.GLTFLoader();


  cluster.forEach((cl) => loadClusters(cl));
   // --- AUTO-GENERATE PUDDLES ONLY ON ROADS --- //
function spawnRoadPuddles() {
  cluster.forEach(tile => {
    if (tile.cluster === 'road') {
      // world position for tile
      const worldX = tile.x * 60;
      const worldZ = tile.z * 60;

      // multiple puddles per road tile with randomness
      const count = 2 + Math.floor(Math.random() * 3);

      for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetZ = (Math.random() - 0.5) * 40;
        const scale = 0.5 + Math.random() * 1.2;

        createPuddle(worldX + offsetX, worldZ + offsetZ, scale);
      }
    }
  });
}

// call after clusters load
spawnRoadPuddles();

  loadCars({ x: 1, z: 0, cluster: 'cars' });

  raindrops();









  //// initialize traffic lights
  //initTrafficLights();














  function render() {
    if (!isPlaying) {
      return;
    }
    controls.update();

    // Update clouds movement
    cloudList.forEach(c => {
      c.position.x += 0.03;
      if (c.position.x > 350) c.position.x = -350;
    });

    updateWeather();

    if (camera.position.x > 130) {
      controls.target.x -= LEAP;
      camera.position.x -= LEAP;
      carList.forEach((car) => (car.position.x -= LEAP));
    } else if (camera.position.x < -120) {
      controls.target.x += LEAP;
      camera.position.x += LEAP;
      carList.forEach((car) => (car.position.x += LEAP));
    }
    if (camera.position.z > 130) {
      controls.target.z -= LEAP;
      camera.position.z -= LEAP;
      carList.forEach((car) => (car.position.z -= LEAP));
    } else if (camera.position.z < -120) {
      controls.target.z += LEAP;
      camera.position.z += LEAP;
      carList.forEach((car) => (car.position.z += LEAP));
    }

    raycaster.setFromCamera(mouse, camera);

    carList.forEach((car) => {
      car.r.set(
        new THREE.Vector3(car.position.x + 58, 1, car.position.z),
        new THREE.Vector3(car.userData.x, 0, car.userData.z)
      );
      let _NT = car.r.intersectObjects(carList, true);
      if (_NT.length > 0) {
        car.speed = 0;
        return;
      } else {
        car.speed = car.speed < car.maxSpeed ? car.speed + 0.002 : car.speed;

        if (car.position.x < -380) car.position.x += LEAP * 2;
        else if (car.position.x > 100) car.position.x -= LEAP * 2;
        if (car.position.z < -320) car.position.x += LEAP * 2;
        else if (car.position.z > 160) car.position.x -= LEAP * 2;

        car.position.x += car.userData.x * car.speed;
        car.position.z += car.userData.z * car.speed;
      }
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function loadClusters({ x, z, cluster, direction }) {
    gltfLoader.load(`gltf/${cluster}.gltf`, (gltf) => {
      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(gltf.scene);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      // frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 5;
      camera.position.copy(boxCenter);
      camera.position.x += boxSize / 8.0;
      camera.position.y += boxSize / 10.0;
      camera.position.z += boxSize / 5.0;
      camera.lookAt(boxCenter);
      camera.near = boxSize / 100;
      camera.far = boxSize * 200;
      camera.updateProjectionMatrix();
      scene.add(camera);

      controls.target.copy(boxCenter);
      controls.update();

      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
          child.material.depthWrite = !child.material.transparent;
        }
      });

      gltf.scene.position.set(x * 60, 0, z * 60);
      if (direction) gltf.scene.rotation.y = Math.PI * direction;

      scene.add(gltf.scene);
      // addLights();
    });
  }
  requestAnimationFrame(render);

  {
    document
      .getElementById('about-button')
      .addEventListener('click', function (e) {
        isPlaying = !isPlaying;
        if (isPlaying) {
          requestAnimationFrame(render);
        }
        document.getElementById('about').classList.toggle('visible');
        document.getElementById('c').classList.toggle('blur');
      });
  }
}

main();
//Events
window.addEventListener('resize', onResize, false);
window.addEventListener('mousemove', onMouseMove, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function addLights() {
  //const light1 = new THREE.AmbientLight(0xffffff, 2);
  //light1.name = 'ambient_light';
  //camera.add(light1);
  
  // replace or add
  const nightAmbient = new THREE.AmbientLight(0x666688, 2);
  scene.add(nightAmbient);


  const light2 = new DirectionalLight(0xffffff, 4);
  light2.position.set(0.5, 0, 0.866); // ~60º
  light2.name = 'main_light';
  camera.add(light2);

  renderer.toneMappingExposure = 1;
}

function loadCars({ x, z, cluster, direction }) {
  loader.load(`gltf/${cluster}.gltf`, (gltf) => {
    controls.update();

    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
        child.material.depthWrite = !child.material.transparent;
      }
    });

    gltf.scene.position.set(x * 60, 0, z * 60);
    if (direction) gltf.scene.rotation.y = Math.PI * direction;

    scene.add(gltf.scene);

    gltf.scene.children.forEach((e) => {
      e.distance = 0;
      e.maxSpeed = 0.3;
      e.speed = e.maxSpeed;
      e.r = new THREE.Raycaster(
        new THREE.Vector3(e.position.x, 2, e.position.z),
        new THREE.Vector3(e.userData.x, 0, e.userData.z),
        5,
        15
      );
      carList.push(e);
    });
  });
}

function raindrops() {
  let loader = new THREE.TextureLoader();

  
  createRainLines();

  loader.load("../assets/smoke.png", function(texture) {
    const cloudGeo = new THREE.PlaneGeometry(500, 500);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });

    for (let p = 0; p < 25; p++) {
      
      const cloudCluster = new THREE.Group();
      
     
      const baseCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      baseCloud.scale.set(1, 1, 1);
      baseCloud.rotation.x = -Math.PI / 2;
      baseCloud.rotation.z = Math.random() * Math.PI * 2;
      cloudCluster.add(baseCloud);
      
      
      const middleCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      middleCloud.scale.set(0.7, 0.7, 0.7);
      middleCloud.position.y = 5;
      middleCloud.position.x = Math.random() * 50 - 25;
      middleCloud.position.z = Math.random() * 50 - 25;
      middleCloud.rotation.x = -Math.PI / 2;
      middleCloud.rotation.z = Math.random() * Math.PI * 2;
      cloudCluster.add(middleCloud);
      
      
      const topCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      topCloud.scale.set(0.5, 0.5, 0.5);
      topCloud.position.y = 10;
      topCloud.position.x = Math.random() * 30 - 15;
      topCloud.position.z = Math.random() * 30 - 15;
      topCloud.rotation.x = -Math.PI / 2;
      topCloud.rotation.z = Math.random() * Math.PI * 2;
      cloudCluster.add(topCloud);
      
      
      for (let i = 0; i < 3; i++) {
        const smallCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        smallCloud.scale.set(0.3 + Math.random() * 0.2, 0.3 + Math.random() * 0.2, 0.3 + Math.random() * 0.2);
        smallCloud.position.y = Math.random() * 8;
        smallCloud.position.x = Math.random() * 80 - 40;
        smallCloud.position.z = Math.random() * 80 - 40;
        smallCloud.rotation.x = -Math.PI / 2;
        smallCloud.rotation.z = Math.random() * Math.PI * 2;
        cloudCluster.add(smallCloud);
      }

     
      cloudCluster.position.set(
        Math.random() * 600 - 300,
        60 + Math.random() * 25,
        Math.random() * 600 - 300
      );

      scene.add(cloudCluster);
      cloudList.push(cloudCluster);
    }
    console.log("3D Layered Clouds added to scene");
  });
}

function createRainLines() {
  const rainCount = 1000; 
  
  const rainGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(rainCount * 6); 
  const colors = new Float32Array(rainCount * 6); 
  
  for (let i = 0; i < rainCount; i++) {
    const i6 = i * 6;
    const cloudHeight = 60 + Math.random() * 25; 
    const length = 2; 
    const x = Math.random() * 800 - 400;
    const z = Math.random() * 800 - 400;
    
    positions[i6] = x;         
    positions[i6 + 1] = cloudHeight; 
    positions[i6 + 2] = z;       
 
    positions[i6 + 3] = x;         
    positions[i6 + 4] = cloudHeight - length; 
    positions[i6 + 5] = z;           
    
   
    // Darker rain color - changed from light blue/grey to darker grey/blue
    const r = 0.2 + Math.random() * 0.1;  // Darker red component
    const g = 0.3 + Math.random() * 0.1;  // Darker green component  
    const b = 0.4 + Math.random() * 0.1;  // Darker blue component
   
    colors[i6] = r;
    colors[i6 + 1] = g;
    colors[i6 + 2] = b;
    
  
    colors[i6 + 3] = r;
    colors[i6 + 4] = g;
    colors[i6 + 5] = b;
  }
  
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  rainGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const rainMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    linewidth: 1 
  });
  
 
  rainLines = new THREE.LineSegments(rainGeometry, rainMaterial);
  scene.add(rainLines);
  
  console.log(`Created ${rainCount} dark grey raindrops (2 units long) starting from cloud layer`);
}