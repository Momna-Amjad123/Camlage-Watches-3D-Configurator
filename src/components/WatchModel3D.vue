<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  caseColor: { type: String, default: '#c9c9c9' },
  strapColor: { type: String, default: '#1a1a1a' }
})

const container = ref(null)
let renderer, scene, camera, animationId, watchGroup
let caseMesh, strapMeshes = []
let isDragging = false, lastX = 0, rotY = 0.4, rotX = -0.15

function metal(color, opts = {}) {
  return new THREE.MeshPhysicalMaterial({ color, metalness: 0.9, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.2, ...opts })
}

function buildWatch() {
  const group = new THREE.Group()

  // Case
  const caseGeo = new THREE.CylinderGeometry(1, 1, 0.34, 64)
  caseGeo.rotateX(Math.PI / 2)
  caseMesh = new THREE.Mesh(caseGeo, metal(props.caseColor))
  group.add(caseMesh)

  // Bezel with tick marks
  const bezel = new THREE.Mesh(new THREE.TorusGeometry(1, 0.075, 20, 64), metal('#c4c4c4'))
  bezel.position.z = 0.16
  group.add(bezel)
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2
    const long = i % 5 === 0
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(long ? 0.035 : 0.018, long ? 0.11 : 0.05, 0.02),
      new THREE.MeshStandardMaterial({ color: '#e9e2d2', metalness: 0.3, roughness: 0.5 })
    )
    tick.position.set(Math.sin(a) * 0.98, Math.cos(a) * 0.98, 0.2)
    tick.rotation.z = -a
    group.add(tick)
  }

  // Dial
  const dial = new THREE.Mesh(new THREE.CircleGeometry(0.86, 64), new THREE.MeshStandardMaterial({ color: '#0d0d0d', metalness: 0.3, roughness: 0.55 }))
  dial.position.z = 0.18
  group.add(dial)

  // Hour markers
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.14, 0.015),
      new THREE.MeshStandardMaterial({ color: '#c9a24b', metalness: 0.6, roughness: 0.3 })
    )
    marker.position.set(Math.sin(a) * 0.68, Math.cos(a) * 0.68, 0.19)
    marker.rotation.z = -a
    group.add(marker)
  }

  // Date window
  const dateWin = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.1), new THREE.MeshStandardMaterial({ color: '#f4f1ea' }))
  dateWin.position.set(0.72, 0, 0.19)
  group.add(dateWin)

  // Crystal (domed glass)
  const crystal = new THREE.Mesh(
    new THREE.SphereGeometry(0.86, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.32),
    new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.95, roughness: 0.05, thickness: 0.2, transparent: true, opacity: 0.35, clearcoat: 1 })
  )
  crystal.rotation.x = Math.PI
  crystal.position.z = 0.2
  group.add(crystal)

  // Hands
  const handMat = new THREE.MeshStandardMaterial({ color: '#e9e2d2', metalness: 0.5, roughness: 0.3 })
  const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.4, 0.02), handMat)
  hourHand.position.set(0, 0.13, 0.22); hourHand.rotation.z = -0.6
  group.add(hourHand)
  const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.62, 0.02), handMat)
  minuteHand.position.set(0, 0.2, 0.22); minuteHand.rotation.z = 1.9
  group.add(minuteHand)
  const secondHand = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.68, 0.02), new THREE.MeshStandardMaterial({ color: '#c9a24b' }))
  secondHand.position.set(0, 0.22, 0.23); secondHand.rotation.z = 1.1
  group.add(secondHand)
  const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 16), handMat)
  pivot.rotation.x = Math.PI / 2; pivot.position.z = 0.23
  group.add(pivot)

  // Crown
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 12), metal('#c4c4c4'))
  crown.rotation.z = Math.PI / 2
  crown.position.set(1.08, 0, 0)
  group.add(crown)

  // Lugs (connect case to strap)
  ;[1, -1].forEach((sign) => {
    ;[0.42, -0.42].forEach((xOff) => {
      const lug = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.28), metal(props.caseColor))
      lug.position.set(xOff, sign * 1.05, 0)
      group.add(lug)
    })
  })

  // Strap (segmented, tapered)
  strapMeshes = []
  ;[1, -1].forEach((sign) => {
    for (let i = 0; i < 5; i++) {
      const t = i / 4
      const w = 0.62 - t * 0.18
      const seg = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.36, 0.15),
        new THREE.MeshStandardMaterial({ color: props.strapColor, roughness: 0.85 })
      )
      seg.position.set(0, sign * (1.2 + i * 0.4), 0)
      group.add(seg)
      strapMeshes.push(seg)
    }
  })
  // Buckle
  const buckle = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 24), metal('#c4c4c4'))
  buckle.position.set(0, -3, 0)
  group.add(buckle)

  return group
}

function onDown(e) { isDragging = true; lastX = e.touches ? e.touches[0].clientX : e.clientX }
function onMove(e) {
  if (!isDragging) return
  const x = e.touches ? e.touches[0].clientX : e.clientX
  rotY += (x - lastX) * 0.01
  lastX = x
}
function onUp() { isDragging = false }

function handleResize() {
  if (!container.value || !renderer || !camera) return
  const w = container.value.clientWidth, h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(() => {
  const el = container.value
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(32, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 5.2)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(el.clientWidth, el.clientHeight)
  el.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight('#ffffff', 0.55))
  const key = new THREE.DirectionalLight('#ffffff', 1.3); key.position.set(3, 4, 5); scene.add(key)
  const fill = new THREE.DirectionalLight('#c9a24b', 0.35); fill.position.set(-3, -1, 2); scene.add(fill)
  const rim = new THREE.DirectionalLight('#ffffff', 0.5); rim.position.set(-2, 3, -4); scene.add(rim)

  watchGroup = buildWatch()
  watchGroup.rotation.set(rotX, rotY, 0)
  scene.add(watchGroup)

  el.addEventListener('pointerdown', onDown)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('resize', handleResize)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    if (!isDragging) rotY += 0.0025
    watchGroup.rotation.set(rotX, rotY, 0)
    renderer.render(scene, camera)
  }
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('resize', handleResize)
  renderer?.dispose()
})

watch(() => props.caseColor, (hex) => { caseMesh?.material.color.set(hex) })
watch(() => props.strapColor, (hex) => { strapMeshes.forEach(m => m.material.color.set(hex)) })
</script>

<template>
  <div ref="container" class="w-full h-full cursor-grab active:cursor-grabbing touch-none"></div>
</template>
