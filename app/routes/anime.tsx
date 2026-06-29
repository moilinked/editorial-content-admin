import { createTimeline, createTimer, utils } from "animejs";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "animejs/adapters/three";

// 示例中用到的 --hex-* / color 在项目里没有定义，这里通过容器内联样式提供，
// anime 的 utils.get 会读取这些计算样式。
const containerStyle = {
  color: "#3b3f5c",
  "--hex-current-1": "#5b5f7c",
  "--hex-current-3": "#2a2d44",
  "--hex-orange-1": "#ff9a3c",
  "--hex-citrus-1": "#ffd23f",
  "--hex-green-1": "#3ddc97",
} as React.CSSProperties;

function Anime() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $container = containerRef.current;
    if (!$container) return;

    const color = utils.get($container, "color") as THREE.ColorRepresentation;
    const { width, height } = $container.getBoundingClientRect();

    // Three.js setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    $container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 1.5, 0);
    camera.lookAt(0, 0.5, 0);
    scene.add(camera);

    const container = new THREE.Group();
    scene.add(container);

    const groundGeometry = new THREE.PlaneGeometry(12, 12);
    const groundMaterial = new THREE.MeshLambertMaterial({ color });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    container.add(ground);

    const gridColorA = utils.get($container, "--hex-current-1") as THREE.ColorRepresentation;
    const gridColorB = utils.get($container, "--hex-current-3") as THREE.ColorRepresentation;
    const grid = new THREE.GridHelper(12, 24, gridColorA, gridColorB);
    grid.position.y = 0.001;
    container.add(grid);

    // --hex-* 变量只定义在容器元素上，需先在容器上解析成十六进制色值；
    // 否则把 'var(--hex-*)' 直接交给 Three.js 对象动画时无法解析，材质色会变成黑色。
    const cubeColors = [utils.get($container, "--hex-orange-1") as string, utils.get($container, "--hex-citrus-1") as string, utils.get($container, "--hex-green-1") as string];

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 0.5;
    cube.castShadow = true;
    container.add(cube);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    // 聚光灯固定在摄像机视角处，不再移动；distance 设为 0 不限制衰减截止距离。
    const spot = new THREE.SpotLight(0xffffff, 100, 0, Math.PI / 5, 0.4);
    spot.position.copy(camera.position);
    spot.castShadow = true;
    spot.target = cube;
    container.add(ambient);
    container.add(spot);

    const spotHelper = new THREE.SpotLightHelper(spot, color);
    container.add(spotHelper);

    // Animation with Three.js adapter
    const timeline = createTimeline({ defaults: { duration: 5000, ease: "linear", loop: true } }).add(
      cube,
      {
        color: cubeColors, // map to cube.material.color
        x: [-4, 0, 4], // map to cube.position.x
        y: {
          to: [0, 4 * Math.PI], // map to cube.position.y (via modifier)
          modifier: (value) => 0.5 * (Math.abs(Math.sin(value)) + Math.abs(Math.cos(value))),
        },
        rotateZ: [360, 0, -360], // map to cube.rotation.z (degrees)
        alternate: true,
        onUpdate: () => spotHelper.update(),
      },
      0,
    );

    const timer = createTimer({ onUpdate: () => renderer.render(scene, camera) });

    const handleResize = () => {
      const { width: w, height: h } = $container.getBoundingClientRect();
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline.revert();
      timer.pause();

      groundGeometry.dispose();
      groundMaterial.dispose();
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      grid.dispose();
      spotHelper.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === $container) {
        $container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 rounded-3xl border bg-card p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Anime.js</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Three.js 适配器动画</h1>
        <p className="max-w-2xl text-muted-foreground">
          使用 <code className="rounded bg-muted px-1.5 py-0.5">animejs</code> 的 Three.js 适配器驱动 3D 场景动画。
        </p>
      </div>

      <div ref={containerRef} className="full-container h-[480px] w-full overflow-hidden rounded-2xl border bg-background" style={containerStyle} />
    </div>
  );
}

export default Anime;
