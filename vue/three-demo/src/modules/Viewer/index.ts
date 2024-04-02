import { 
    Scene,
    PerspectiveCamera,
    // AxesHelper,
    WebGLRenderer,
    Camera,
    // SRGBColorSpace,
    // AmbientLight,
    // Raycaster,
    // Vector2
} from 'three';

export default class Viewer {
    public id: string;
    public viewerDom!: HTMLElement;
    public renderer!: WebGLRenderer;
    public scene!: Scene;
    public camera!: PerspectiveCamera;
    constructor(id: string) {
        this.id = id;
        this.initViewer();
    }
    private initViewer() {
        this.initRenderer();
        this.initScene();
        this.initCamera();

        const animate = () => {
            requestAnimationFrame(animate);
            this.updateDom();
            this.readerDom();
        }
        animate();
    }
    private updateDom() {
        this.camera.aspect = this.viewerDom.clientWidth / this.viewerDom.clientHeight; // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
        this.camera.updateProjectionMatrix(); // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用,来使得这些改变生效
        this.renderer.setSize(this.viewerDom.clientWidth, this.viewerDom.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
    }
    private readerDom() {
        this.renderer?.render(this.scene as Scene, this.camera as Camera);
    }
    private initRenderer() {
        // 获取画布dom
        this.viewerDom = document.getElementById(this.id) as HTMLElement;
        // 初始化渲染器
        this.renderer = new WebGLRenderer({
            logarithmicDepthBuffer: true,
            antialias: true, // true/false表示是否开启反锯齿
            alpha: true, // true/false 表示是否可以设置背景色透明
            precision: 'mediump', // highp/mediump/lowp 表示着色精度选择
            premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
            // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
            // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
        });
        this.renderer.clearDepth();
        this.viewerDom.appendChild(this.renderer.domElement);
    }
    private initScene() {
        this.scene = new Scene();
    }
    private initCamera() {
         // 渲染相机
        this.camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 2000);
        //设置相机位置
        this.camera.position.set(4, 2, -3);
        //设置相机方向
        this.camera.lookAt(0, 0, 0);
    }
}