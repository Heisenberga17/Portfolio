import React, { useMemo } from 'react';
import { Canvas, useThree, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
  gooeyStrength: number;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  color?: string;
  className?: string;
  gooeyStrength?: number;
}

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff'),
    gooeyStrength: 0.5
  },
  /* vertex */ `
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* fragment */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;
    uniform float gooeyStrength;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      float cellSize = 1.0 / gridSize;
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      vec2 cellUv = fract(uv * gridSize);

      // 5x5 Gaussian-weighted blur for organic gooey merging (GPU-side)
      float blur = 0.0;
      float total = 0.0;
      for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
          vec2 offset = vec2(float(x), float(y)) * cellSize;
          float d = length(vec2(float(x), float(y)));
          float weight = exp(-d * d * 0.4);
          blur += texture2D(mouseTrail, gridUvCenter + offset).r * weight;
          total += weight;
        }
      }
      blur /= total;

      // Smooth threshold — creates organic blob merging
      float goo = smoothstep(0.04, 0.18 + gooeyStrength * 0.12, blur);

      // Soft rounded pixel edges
      float e = 0.08;
      float pixelMask = smoothstep(0.0, e, cellUv.x) * smoothstep(0.0, e, 1.0 - cellUv.x)
                       * smoothstep(0.0, e, cellUv.y) * smoothstep(0.0, e, 1.0 - cellUv.y);

      gl_FragColor = vec4(pixelColor, goo * pixelMask);
    }
  `
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor, gooeyStrength }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);
  dotMaterial.uniforms.gooeyStrength.value = gooeyStrength;

  const [trail, onMove] = useTrailTexture({
    size: 1024,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => 1 - Math.pow(1 - x, 3),
  color = '#ffffff',
  className = '',
  gooeyStrength = 0.5
}: PixelTrailProps) {
  return (
    <Canvas
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true
      }}
      dpr={[1, 1.5]}
      className={`absolute z-1 ${className}`}
    >
      <Scene
        gridSize={gridSize}
        trailSize={trailSize}
        maxAge={maxAge}
        interpolate={interpolate}
        easingFunction={easingFunction}
        pixelColor={color}
        gooeyStrength={gooeyStrength}
      />
    </Canvas>
  );
}
