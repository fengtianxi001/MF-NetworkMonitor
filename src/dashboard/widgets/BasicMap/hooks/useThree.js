import {
  createVNode,
  defineComponent,
  h,
  onMounted,
  ref,
  render,
  shallowRef,
} from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import TWEEN from "@tweenjs/tween.js";

export function useThree() {
  const container = ref();
  const camera = shallowRef();
  const scene = shallowRef();
  const control = shallowRef();
  const renderer = shallowRef();
  const labelRenderer = shallowRef();
  const renderMixins = shallowRef([]);
  const composerMixins = shallowRef([]);

  const animate = () => {
    TWEEN.update();
    control.value?.update();
    renderMixins.value.forEach((mixin) => mixin());
    composerMixins.value.forEach((mixin) => mixin());
    renderer.value.render(scene.value, camera.value);
    labelRenderer.value.render(scene.value, camera.value);
    requestAnimationFrame(animate);
  };

  const generateLights = () => {
    const directionalLight1 = new THREE.DirectionalLight(0x555555, 1);
    directionalLight1.position.set(106.59893798828125, 26.918846130371094, 30);
    const directionalLight2 = new THREE.DirectionalLight(0x555555, 1);
    directionalLight2.position.set(106.59893798828125, 26.918846130371094, 30);

    scene.value.add(directionalLight1);
    scene.value.add(directionalLight2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.value.add(ambientLight);
  };

  const createCSSObject = (options) => {
    const newComponent = defineComponent({
      render() {
        return h(options.component, options.props);
      },
    });
    const instance = createVNode(newComponent);
    render(instance, document.createElement("div"));
    const object = new CSS2DObject(instance.el);
    object.position.set(...options.position);
    return object;
  };

  const boostrap = () => {
    const { clientWidth, clientHeight } = container.value;
    camera.value = new THREE.PerspectiveCamera(
      65,
      clientWidth / clientHeight,
      0.001,
      90000000
    );
    camera.value.up.set(0, 0, 1);
    camera.value.position.set(0, 0, 0);
    scene.value = new THREE.Scene();
    scene.value.background = new THREE.Color(0x3a3d3d);
    renderer.value = new THREE.WebGLRenderer();
    renderer.value.setPixelRatio(window.devicePixelRatio);
    renderer.value.setSize(clientWidth, clientHeight);
    //   renderer.value.physicallyCorrectLights = true
    renderer.value.outputEncoding = THREE.sRGBEncoding;
    // renderer.value.gammaOutput = true;
    // renderer.value.shadowMap.enabled = true;
    // renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.value.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.value.toneMappingExposure = 1.0;
    // renderer.value.outputEncoding = THREE.sRGBEncoding;
    labelRenderer.value = new CSS2DRenderer();
    labelRenderer.value.setSize(clientWidth, clientHeight);
    labelRenderer.value.domElement.style.position = "absolute";
    labelRenderer.value.domElement.style.top = "0px";
    container.value.appendChild(labelRenderer.value.domElement);
    container.value.appendChild(renderer.value.domElement);
    control.value = new OrbitControls(
      camera.value,
      labelRenderer.value.domElement
    );
    control.value.enableDamping = true;
    control.value.dampingFactor = 0.05;
    animate();
    generateLights();
  };

  onMounted(() => {
    boostrap();
  });

  return {
    container,
    camera,
    scene,
    renderer,
    labelRenderer,
    control,
    renderMixins,
    boostrap,
    createCSSObject,
  };
}
