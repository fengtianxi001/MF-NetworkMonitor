import { forEach, size } from 'lodash'
import { bbox } from '@turf/turf'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { ref, shallowRef } from 'vue'
import { useThree } from './useThree'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import TWEEN from '@tweenjs/tween.js'
import axios from 'axios'
import * as THREE from 'three'

const configs = {
  multiple: 1,
  textureMap: './texture/texture_map.jpg',
  texturePlaneDot: './texture/texture_plane_dot_2.png',
}

export function useMap() {
  const { container, camera, scene, control, renderMixins, renderer } =
    useThree()

  const params = ref()
  const blockGroup = shallowRef(new THREE.Group())
  const borderGroup = shallowRef(new THREE.Group())

  // 参数调整
  const adjustParameter = (geojson) => {
    const [minX, minY, maxX, maxY] = bbox(geojson)
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const adjustControl = () => {
      // 视角保持在地图中心点
      const distance = Math.max(maxX - minX, maxY - minY)
      control.value?.target.set(centerX, centerY, 0)
      //   control.value.maxDistance = 100
      //   control.value.maxDistance = distance * 1.2
      //   control.value.minDistance = distance * 0.5
      //   control.value.maxPolarAngle = Math.PI / 2
    }
    const adjustCamera = () => {
      // x 保持正北方向
      // y 范围内最低维度 - 范围纬度差的一半
      // z 保持视角 45 度
      const x = centerX
      const y = minY - (maxY - minY) / 2
      const z = (maxY - y) * Math.tan(params.value.pitch * (Math.PI / 180))
      camera.value?.position.set(0, 0, 0)

      new TWEEN.Tween(camera.value.position)
        .to(
          {
            x: 118,
            y: 22.5,
            z: 4,
          },
          1000
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
    }
    adjustControl()
    adjustCamera()
  }

  // 生成地图材质
  const generateMapMaterial = () => {
    const texture = new THREE.TextureLoader()
    const textureMap = texture.load(configs.textureMap)
    textureMap.wrapS = THREE.RepeatWrapping
    textureMap.wrapT = THREE.RepeatWrapping
    textureMap.flipY = false
    textureMap.rotation = THREE.MathUtils.degToRad(45)
    textureMap.repeat.set(1, 1)
    textureMap.encoding = THREE.sRGBEncoding

    return new THREE.MeshPhongMaterial({
      map: textureMap,
      combine: THREE.MultiplyOperation,
      transparent: true,
      opacity: 1,
    })
  }

  // 生成地图形状
  const generateMapGeometry = (geojson) => {
    const mapMaterial = generateMapMaterial()
    const createShapeByPolygon = (polygon) => {
      const shape = new THREE.Shape()
      forEach(polygon, (coordinate, index) => {
        if (size(coordinate) === 2) {
          const method = index === 0 ? 'moveTo' : 'lineTo'
          shape[method](...coordinate)
        }
      })
      const topGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.05 * configs.multiple,
        color: 0xc8743d,
        bevelEnabled: false,
        bevelSegments: 1,
        bevelThickness: 0.1,
      })
      const topMaterial = new THREE.MeshLambertMaterial({
        color: 0x030303,
        transparent: true,
        opacity: 1,
      })
      const bottomGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.2 * configs.multiple,
        bevelEnabled: false,
        bevelSegments: 1,
        bevelThickness: 0.1,
      })
      const bottomMaterial = new THREE.MeshLambertMaterial({
        color: 0xc8743d,
        transparent: true,
        opacity: 0.9,
      })

      const topMesh = new THREE.Mesh(topGeometry, [mapMaterial, topMaterial])
      const bottomMesh = new THREE.Mesh(bottomGeometry, [
        bottomMaterial,
        bottomMaterial,
      ])
      topMesh.position.z = 0.12
      bottomMesh.position.z = -0.1
      blockGroup.value.add(topMesh)
      blockGroup.value.add(bottomMesh)
    }
    forEach(geojson.features, (feature) => {
      const { type, coordinates } = feature.geometry
      if (type === 'Polygon') {
        forEach(coordinates, createShapeByPolygon)
      } else {
        forEach(coordinates, (multiPolygon) =>
          forEach(multiPolygon, createShapeByPolygon)
        )
      }
    })
    scene.value.add(blockGroup.value)
  }

  // 生成地图上边框
  const generateMapTopBorder = (geojson) => {
    const createLineByPolygon = (polygon) => {
      const points = []
      forEach(polygon, (coordinate) => {
        points.push(coordinate[0], coordinate[1], params.value.depth)
      })
      const material = new LineMaterial({
        color: 0x999999,
        linewidth: 0.0008,
      })
      const geometry = new LineGeometry()
      geometry.setPositions(points)
      borderGroup.value.add(new Line2(geometry, material))
    }
    forEach(geojson.features, (feature) => {
      const { type, coordinates } = feature.geometry
      if (type === 'Polygon') {
        forEach(coordinates, createLineByPolygon)
      } else if (type === 'MultiPolygon') {
        forEach(coordinates, (multiPolygon) =>
          forEach(multiPolygon, createLineByPolygon)
        )
      }
    })
    scene.value.add(borderGroup.value)
  }

  // 生成地图下边框
  const generateMapBottonBorder = (geojson) => {
    const createLineByPolygon = (polygon) => {
      const points = []
      forEach(polygon, (coordinate) => {
        points.push(coordinate[0], coordinate[1], -0.1)
      })
      const material = new LineMaterial({
        color: 0xef8432,
        linewidth: 0.002,
      })
      const geometry = new LineGeometry()
      geometry.setPositions(points)
      const line = new Line2(geometry, material)
      borderGroup.value.add(line)
    }
    forEach(geojson.features, (feature) => {
      const { type, coordinates } = feature.geometry
      if (type === 'Polygon') {
        forEach(coordinates, createLineByPolygon)
      } else if (type === 'MultiPolygon') {
        forEach(coordinates, (multiPolygon) =>
          forEach(multiPolygon, createLineByPolygon)
        )
      }
    })
    scene.value.add(borderGroup.value)
  }

  // 生成地图平面背景
  const generatePlanes = (geojson) => {
    const [minX, minY, maxX, maxY] = bbox(geojson)
    const textureLoader = new THREE.TextureLoader()
    const center = [(minX + maxX) / 2, (minY + maxY) / 2]
    const geometry = new THREE.PlaneGeometry(15, 15)
    const material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(configs.texturePlaneDot),
      transparent: true,
      opacity: 1,
      depthTest: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...center, -0.1)
    scene.value.add(mesh)
  }

  const bootstrap = async (options) => {
    params.value = { depth: 0.2, pitch: 30, ...options }
    options.geojsons.forEach(async (geojson) => {
      const { data } = await axios.get(geojson)
      adjustParameter(data)
      generateMapGeometry(data)
      generateMapTopBorder(data)
      generateMapBottonBorder(data)
      generatePlanes(data)
    })
    const list = [
      {
        name: '福州',
        position: [119.3, 26.08],
      },
      {
        name: '闽侯',
        position: [119.14, 26.16],
      },

      {
        name: '厦门',
        position: [118.1, 24.46],
      },
      {
        name: '莆田',
        position: [119, 25.44],
      },
      {
        name: '平潭',
        position: [119.78, 25.51],
      },
      {
        name: '泉州',
        position: [118.58, 24.93],
      },
      {
        name: '漳州',
        position: [117.35, 24.52],
      },
      {
        name: '永泰',
        position: [118.95, 25.88],
      },
    ]
    list.forEach((item) => {
      const plane = createCircle(renderMixins.value)
      plane.position.set(item.position[0], item.position[1], 0.22)
      scene.value.add(plane)
      const fontLoader = new FontLoader()
      fontLoader.load('/fonts/jinshanyun.json', (font) => {
        const textGeometry = new TextGeometry(item.name, {
          font: font,
          size: 0.1, // 将文本大小缩小10倍
          height: 0.02, // 将文本高度缩小10倍
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.0001, // 将斜角厚度缩小10倍
          bevelSize: 0.00001, // 将斜角大小缩小10倍
          bevelOffset: 0,
          bevelSegments: 5,
        })
        const textMaterial = new THREE.MeshBasicMaterial({
          // color: 0xde7d42,
        })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotation.x = Math.PI / 3
        text.position.set(item.position[0], item.position[1], 0.3)
        scene.value.add(text)
      })
    })
  }

  return {
    container,
    bootstrap,
    scene,
  }
}

function createCircle(renderMixins) {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // 片元着色器
  const fragmentShader = `
    uniform float radius;
    varying vec2 vUv;
    void main() {
      float distance = length(vUv - vec2(0.5));
      float opacity = 0.0;
      if (distance < 0.3 * radius) {
        opacity = 0.0;
      } else if (distance < 0.8 * radius) {
        opacity = smoothstep(0.3 * radius, 0.8 * radius, distance);
      } else {
        opacity = 1.0;
      }
      gl_FragColor = vec4(1.0, 1.0, 1.0, opacity);
    }
  `

  // 创建渐变材质
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      radius: { value: 0.6 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
  })

  // 创建圆形平面
  const planeGeometry = new THREE.CircleGeometry(0.1, 32)
  const plane = new THREE.Mesh(planeGeometry, gradientMaterial)
  plane.renderOrder = 9999
  const expandSpeed = 0.005
  const shrinkSpeed = 0.005
  let currentRadius = 0.6
  let isExpanding = true

  renderMixins.push(() => {
    // 更新 radius 的值
    if (isExpanding) {
      currentRadius += expandSpeed
      if (currentRadius >= 1.0) {
        isExpanding = false
      }
    } else {
      currentRadius -= shrinkSpeed
      if (currentRadius <= 0.6) {
        isExpanding = true
      }
    }
    gradientMaterial.uniforms.radius.value = currentRadius
    plane.scale.set(
      1.6 - currentRadius,
      1.6 - currentRadius,
      1.6 - currentRadius
    )
  })
  return plane
  // scene.value.add(plane)
  // plane.position.set(119.28, 26.08, 0.2)
}
