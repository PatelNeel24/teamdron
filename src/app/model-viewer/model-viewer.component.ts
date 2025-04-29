import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Group;
  private loader = new GLTFLoader();

  constructor(private spinner: NgxSpinnerService) {}

  ngAfterViewInit(): void {
    this.initThree();
    this.loadModel();
  }

  private initThree(): void {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    // Create camera with top-down view
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 0); // Position camera above the model
    this.camera.lookAt(0, 0, 0); // Make camera look at the center

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Add controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    
    // Set controls to rotate around the Y axis (top-down view)
    this.controls.minPolarAngle = 0; // 0 degrees is top-down
    this.controls.maxPolarAngle = Math.PI / 2; // 90 degrees is side view

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Removed grid helper (the squares at the bottom)
    // const gridHelper = new THREE.GridHelper(10, 10);
    // this.scene.add(gridHelper);

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
}

private loadModel(): void {
    this.spinner.show();
    
    // Load model from assets
    this.loader.load(
      'assets/models/testingmodel.glb',
      (gltf) => {
        this.model = gltf.scene;
        
        // Center the model
        this.model.position.set(0, 0, 0);
        
        // Optional: Adjust model scale if needed
        // this.model.scale.set(1, 1, 1);
        
        // Optional: Rotate model if it's not oriented correctly for top view
        // this.model.rotation.set(0, 0, 0);
        
        this.scene.add(this.model);
        
        // Focus camera on the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.camera.lookAt(center);
        
        this.spinner.hide();
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        this.spinner.hide();
        
        // Fallback: Create a cube if model fails to load
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        this.model = new THREE.Group();
        this.model.add(cube);
        this.scene.add(this.model);
      }
    );
}

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}