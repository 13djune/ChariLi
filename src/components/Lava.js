// src/components/Lava.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMemo } from 'react'; 
// eslint-disable-next-line react-hooks/exhaustive-deps

  const vertexShaderSource = `precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
vUv = .5 * (a_position + 1.);
gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  const fragmentShaderSource = `precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform float u_resolution_scale;
uniform sampler2D u_click_data_texture;

#define TWO_PI 6.28318530718

float rand(float n){ return fract(sin(n) * 43758.5453123); }

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
    m = m*m;
    m = m*m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
}

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p)*18.5453);
}

vec2 rotateUV(vec2 uv, float angle) {
    float s = sin(angle), c = cos(angle);
    return mat2(c, -s, s, c) * uv;
}

float get_cell_sectors(float angle, vec2 rand, float t) {
    float s = .5 * (1. + sin((2. + floor(rand.y * 2.)) * angle));
    s *= (.7 + .5 * sin(angle - 2. * t + rand.x));
    s *= (.5 + .5 * cos(angle + t));
    return s;
}

float get_yellow(float dist, float rand) {
    return (.8 + .6 * rand) * dist;
}

float get_yellow_hit_area(float old, float dist, float scale) {
    float a = max(old, dist);
    a -= .12 * scale * dist;
    return a;
}

float get_yellow_light(float dist, float angle, float radius, float rand) {
    float l = dist;
    l *= (.5 * (1. + sin(angle - .6)));
    l *= (1. - smoothstep(.999, 1., radius));
    return rand * l;
}

float get_blick(float old, float dist, float angle, float radius) {
    float b = dist;
    b *= (.5 * (1. + sin(angle + 3.)));
    b *= (1. - smoothstep(.9994, 1., radius));
    return max(old, b);
}

void main() {
    vec2 uv = vUv;
    uv *= u_resolution_scale;
    uv.y = 1. - uv.y;

    uv.x *= u_ratio * 0.9;

    float t = u_time;

    float white = 0.;
    float white_shadow = 0.;
    float yellow = 0.;
    float yellow_hit_area = 0.;
    float yellow_light = 0.;
    float yellow_blick = 0.;

    for (int i = 0; i < 2; i++) {
        vec2 rand_layer = hash(vec2(10. * float(i), 200. * float(i)));
        vec2 offset = hash(vec2(-100. * float(i), 2. * float(i))) - .5;
        float scale = 1.1 - .1 * rand_layer.x;

        vec2 layer_uv = rotateUV(uv, rand_layer.y * TWO_PI);
        layer_uv += offset;
layer_uv *= scale * 1.5; // aumenta el factor => reduce tamaño del blob

        vec2 i_uv = floor(layer_uv);
        vec2 f_uv = fract(layer_uv);

        vec2 cell_rand = vec2(0.);
        float radius = 1.;
        float angle_local = 0.;

        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 offset = vec2(float(x), float(y));
                vec2 o = hash(i_uv + offset);
                offset += (.5 + .3 * sin(.4 * t + TWO_PI * o)) - f_uv;

                float dist = dot(offset, offset);
                if (dist < radius) {
                    radius = dist;
                    angle_local = atan(offset.x, offset.y);
                    cell_rand = o;
                }
            }
        }

        radius = 1. - radius;
        float sectors = get_cell_sectors(angle_local, cell_rand, t);
        float angle_global = angle_local - rand_layer.y * TWO_PI;
        float wavy = radius + .015 * sectors;
        wavy = pow(wavy, 50. + 100. * cell_rand.x);
        float round = pow(radius, 1200. - 200. * scale);

        white_shadow += smoothstep(.0, 1.5, wavy + round);
        white += wavy;
        yellow_hit_area = get_yellow_hit_area(yellow_hit_area, round, scale);
        yellow += get_yellow(round, cell_rand.y);
        yellow_light += get_yellow_light(round, angle_global, radius, cell_rand.x);
        yellow_blick = get_blick(yellow_blick, round, angle_global, radius);
    }

    for (int i = 0; i < 15; i++) {
        float row = floor(float(i) / 10.) / 2.;
        float col = mod(float(i), 10.) / 10.;
        vec4 data = texture2D(u_click_data_texture, vec2(col, row));
        vec2 center = vec2(data.x, data.y);
        float pos_offset = data.z;
        float scale = data.w;

        vec2 layer_uv = vUv - center;
        layer_uv *= (.9 + .4 * rand(center.x));
        layer_uv.x *= u_ratio * 0.9;

        vec2 offset = hash(data.rg * 100.) - .5;
        layer_uv += .25 * pos_offset * sin(.2 * t + 10. * offset);

        float angle = atan(layer_uv.x, layer_uv.y) - .4 * TWO_PI;

        vec2 rand_cell = hash(data.rg);
float radius = 1. - clamp(0., 1., dot(layer_uv, layer_uv) * 1.8); // más pequeño

        float sectors = get_cell_sectors(angle, rand_cell, t);
        float wavy = radius + .015 * sectors * scale;
        wavy = pow(wavy, 50. + 100. * rand_cell.x);
        wavy *= pow(scale, .4);
        float round = pow(radius, 900.);
        round *= pow(min(1., 2. * scale), .8);

        white_shadow += smoothstep(.0, 1.5, wavy + round);
        white += wavy;
        yellow_hit_area = get_yellow_hit_area(yellow_hit_area, round, 1.);
        yellow += get_yellow(round, rand_cell.y);
        yellow_light += get_yellow_light(round, angle, radius, rand_cell.x);
        yellow_blick = get_blick(yellow_blick, round, angle, radius);
    }

    white = pow(white, 1.1);
   float base_shape = smoothstep(0.25, 0.35, white);
float white_shape = smoothstep(0.55, 0.65, white);

float hit_area = yellow - yellow_hit_area;
yellow -= 1.2 * hit_area;

vec3 color = vec3(0.05, 0.02, 0.5); // fondo base oscuro (puedes hacerlo más neutro para modo día)
color = mix(color, vec3(0.08, 0.03, 0.9), smoothstep(0.2, 0.4, white));  // tono medio
color = mix(color, vec3(0.2, 0.1, 1.0), smoothstep(0.45, 0.6, white));   // tono brillante

float opacity = smoothstep(.25, .34, white);
opacity *= 0.9; // reduce el halo


gl_FragColor = vec4(color, opacity);
}
 `
    ;

export default function Lava() {
  const canvasRef = useRef(null);
  const devicePixelRatio = useMemo(() => Math.min(window.devicePixelRatio || 1, 2), []);
const textureSize = useMemo(() => [10, 2], []);

    const clicksNumber = 15;
  const scaledData = useRef(new Uint8Array(textureSize[0] * textureSize[1] * 4).fill(0));
  const clicks = useRef(
    Array.from({ length: clicksNumber }, () => ({
      coordinate: { x: 0, y: 0 },
      radius: 0,
      clickDistance: 0,
    }))
  );
  const activeClickIdx = useRef(0);
  const glRef = useRef(null);
  const uniformsRef = useRef({});
  const textureRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return alert('WebGL is not supported by your browser.');
    glRef.current = gl;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const getUniforms = () => {
      const uniforms = {};
      const count = gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(shaderProgram, i).name;
        uniforms[name] = gl.getUniformLocation(shaderProgram, name);
      }
      return uniforms;
    };
    uniformsRef.current = getUniforms();

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    textureRef.current = tex;

    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uniformsRef.current.u_click_data_texture, 0);

    const updateClickTexture = () => {
      clicks.current.forEach((click, i) => {
        scaledData.current[i * 4 + 0] = click.coordinate.x * 255;
        scaledData.current[i * 4 + 1] = click.coordinate.y * 255;
        scaledData.current[i * 4 + 2] = click.clickDistance * 255;
        scaledData.current[i * 4 + 3] = click.radius * 255;
      });
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, textureSize[0], textureSize[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, scaledData.current);
    };

    const render = () => {
      gl.uniform1f(uniformsRef.current.u_time, 10 + gsap.globalTimeline.time());
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      updateClickTexture();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniformsRef.current.u_ratio, canvas.width / canvas.height);
      gl.uniform1f(uniformsRef.current.u_resolution_scale, canvas.width > canvas.height ? 1 : canvas.height / canvas.width);
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;

      const idx = activeClickIdx.current;
      clicks.current[idx].coordinate.x = x;
      clicks.current[idx].coordinate.y = y;

      gsap.timeline()
        .fromTo(clicks.current[idx], { clickDistance: 0 }, { duration: 2, clickDistance: 1 }, 0)
        .to(clicks.current[idx], { duration: 0.7, radius: 1, ease: 'none' }, 0);

      const next = (idx + 1) % clicksNumber;
      gsap.to(clicks.current[next], { duration: 1, radius: 0 });

      activeClickIdx.current = next;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    resizeCanvas();
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
      gsap.ticker.remove(render);
    };
 }, [devicePixelRatio, textureSize]);;

  return <canvas
  ref={canvasRef}
  className="absolute top-0 left-0 w-full h-full cursor-pointer"
  style={{
    WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
    maskImage: 'linear-gradient(to top, black 70%, transparent )',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }}
/>



}


// <script id="lava-vert" type="x-shader/x-vertex">
// {`precision mediump float;

// varying vec2 vUv;
// attribute vec2 a_position;

// void main() {
// vUv = .5 * (a_position + 1.);
// gl_Position = vec4(a_position, 0.0, 1.0);
// }
// `}</script>
// <script id="lava-frag" type="x-shader/x-fragment">
// {` precision mediump float;

// varying vec2 vUv;
// uniform float u_time;
// uniform float u_ratio;
// uniform float u_resolution_scale;
// uniform sampler2D u_click_data_texture;

// #define TWO_PI 6.28318530718

// float rand(float n){ return fract(sin(n) * 43758.5453123); }

// vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
// vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
// vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
// float snoise(vec2 v) {
// const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
// vec2 i = floor(v + dot(v, C.yy));
// vec2 x0 = v - i + dot(i, C.xx);
// vec2 i1;
// i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
// vec4 x12 = x0.xyxy + C.xxzz;
// x12.xy -= i1;
// i = mod289(i);
// vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
// vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
// m = m*m;
// m = m*m;
// vec3 x = 2. * fract(p * C.www) - 1.;
// vec3 h = abs(x) - 0.5;
// vec3 ox = floor(x + 0.5);
// vec3 a0 = x - ox;
// m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
// vec3 g;
// g.x = a0.x * x0.x + h.x * x0.y;
// g.yz = a0.yz * x12.xz + h.yz * x12.yw;
// return 130. * dot(m, g);
// }

// vec2 hash(vec2 p) {
// p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
// return fract(sin(p)*18.5453);
// }

// vec2 rotateUV(vec2 uv, float angle) {
// float s = sin(angle), c = cos(angle);
// return mat2(c, -s, s, c) * uv;
// }

// float get_cell_sectors(float angle, vec2 radomizer, float t) {
// float sectors = .5 * (1. + sin((2. + floor(radomizer.y * 2.)) * angle));
// sectors *= (.7 + .5 * sin(angle - 2. * t + radomizer.x));
// sectors *= (.5 + .5 * cos(angle + t));
// return sectors;
// }

// float get_area_around_yellow(float old_area_around_yellow, float dist, float angle, float sectors) {
// float area_around_yellow = max(old_area_around_yellow, .3 * dist * (1. + sin(angle - .6)));
// area_around_yellow += .1 * smoothstep(.0, .3, dist * (1. + 10. * sectors));
// return area_around_yellow;
// }

// float get_yellow(float dist, float radomizer) {
// return (.8 + .6 * radomizer) * dist;
// }

// float get_yellow_hit_area(float old_yellow_hit_area, float dist, float scale) {
// float yellow_hit_area = max(old_yellow_hit_area, dist);
// yellow_hit_area -= .12 * scale * dist;
// return yellow_hit_area;
// }

// float get_yellow_light(float dist, float angle, float radius, float radomizer) {
// float side_arc_light = dist;
// side_arc_light *= (.5 * (1. + sin(angle - .6)));
// side_arc_light *= (1. - smoothstep(.999, 1., radius));
// return radomizer * side_arc_light;
// }

// float get_blick(float old_yellow_blick, float dist, float angle, float radius) {
// float side_arc_blick = dist;
// side_arc_blick *= (.5 * (1. + sin(angle + 3.)));
// side_arc_blick *= (1. - smoothstep(.9994, 1., radius));
// return max(old_yellow_blick, side_arc_blick);
// }

// void main() {

// vec2 uv = vUv;
// uv *= u_resolution_scale;
// uv.y = 1. - uv.y;

// float white = 0.;
// float white_shadow = 0.;
// float area_around_yellow = 0.;
// float yellow = 0.;
// float yellow_hit_area = 0.;
// float yellow_light = 0.;
// float yellow_blick = 0.;

// uv.x *= u_ratio;
// uv.x *= .9;

// float t = u_time;

// for (int i = 0; i < 4; i++) {

//   vec2 layer_randomizer = hash(vec2(10. * float(i), 200. * float(i)));
//   vec2 layer_offset = hash(vec2(-100. * float(i), 2. * float(i))) - .5;
//   float layer_scale = 1.1 - .1 * layer_randomizer.x;

//   vec2 layer_uv = rotateUV(uv, layer_randomizer.y * TWO_PI);
//   layer_uv += layer_offset;
//   layer_uv *= layer_scale;

//   vec2 i_uv = floor(layer_uv);
//   vec2 f_uv = fract(layer_uv);

//   vec2 cell_randomizer = vec2(0.);
//   float cell_radius = 1.;
//   float cell_angle_local = 0.;

//   for (int y = -1; y <= 1; y++) {
//       for (int x = -1; x <= 1; x++) {
//           vec2 tile_offset = vec2(float(x), float(y));
//           vec2 o = hash(i_uv + tile_offset);

//           tile_offset += (.5 + .3 * sin(.4 * t + TWO_PI * o)) - f_uv;

//           float dist = dot(tile_offset, tile_offset);
//           if (dist < cell_radius) {
//               cell_radius = dist;
//               cell_angle_local = atan(tile_offset.x, tile_offset.y);
//               cell_randomizer = o;
//           }
//       }
//   }

//   cell_radius = 1. - cell_radius;
//   float sectors = get_cell_sectors(cell_angle_local, cell_randomizer, t);
//   float cell_angle_global = cell_angle_local - layer_randomizer.y * TWO_PI;
//   float wavy_cell_distance = cell_radius + .015 * sectors;
//   wavy_cell_distance = pow(wavy_cell_distance, 50. + 100. * cell_randomizer.x);
//   float round_cell_distance = cell_radius;
//   round_cell_distance = pow(round_cell_distance, 600. - 200. * layer_scale);
//   white_shadow += (smoothstep(.0, 1.5, wavy_cell_distance + round_cell_distance));
//   white += wavy_cell_distance;
//   yellow_hit_area = get_yellow_hit_area(yellow_hit_area, round_cell_distance, layer_scale);
//   yellow += get_yellow(round_cell_distance, cell_randomizer.y);
//   yellow_light += get_yellow_light(round_cell_distance, cell_angle_global, cell_radius, cell_randomizer.x);
//   yellow_blick = get_blick(yellow_blick, round_cell_distance, cell_angle_global, cell_radius);
//   area_around_yellow = get_area_around_yellow(area_around_yellow, round_cell_distance, cell_angle_global, sectors);
// }


// for (int i = 0; i < 20; i++) {

//   float row = floor(float(i) / 10.) / 2.;
//   float col = (float(i) - 10. * floor(float(i) / 10.)) / 10.;
//   vec4 data = texture2D(u_click_data_texture, vec2(col, row));

//   float x = data[0];
//   float y = data[1];
//   float pos_offset = data[2];
//   float scale = data[3];

//   vec2 center = vec2(x, y);

//   vec2 layer_uv = vUv - center;
//   layer_uv *= (.9 + .4 * rand(center.x));
//   layer_uv.x *= u_ratio;
//   layer_uv.x *= .9;

//   vec2 layer_offset = hash(data.rg * 100.) - .5;
//   layer_uv += .25 * pos_offset * sin(.2 * t + 10. * layer_offset);

//   float cell_angle = atan(layer_uv.x, layer_uv.y) - .4 * TWO_PI;

//   vec2 cell_randomizer = hash(data.rg);
//   float cell_radius = 1. - clamp(0., 1., dot(layer_uv, layer_uv));

//   float sectors = get_cell_sectors(cell_angle, cell_randomizer, t);
//   float wavy_cell_distance = cell_radius + .015 * sectors * scale;
//   wavy_cell_distance = pow(wavy_cell_distance, 50. + 100. * cell_randomizer.x);
//   wavy_cell_distance *= pow(scale, .4);

//   float round_cell_distance = cell_radius;
//   round_cell_distance = pow(round_cell_distance, 400.);
//   round_cell_distance *= pow(min(1., 2. * scale), .8);

//   white_shadow += (smoothstep(.0, 1.5, wavy_cell_distance + round_cell_distance));
//   white += wavy_cell_distance;
//   yellow_hit_area = get_yellow_hit_area(yellow_hit_area, round_cell_distance, 1.);
//   yellow += get_yellow(round_cell_distance, cell_randomizer.y);
//   yellow_light += get_yellow_light(round_cell_distance, cell_angle, cell_radius, cell_randomizer.x);
//   yellow_blick = get_blick(yellow_blick, round_cell_distance, cell_angle, cell_radius);
//   area_around_yellow = get_area_around_yellow(area_around_yellow, round_cell_distance, cell_angle, sectors);
// }

// white = pow(white, 1.1);

// float base_shape = smoothstep(.28, .3, white);

// white_shadow *= (1. + snoise(3. * uv) + 2. * area_around_yellow);
// float white_color_shape = (1. - smoothstep(.3, 1., white_shadow));
// white_color_shape = 2. * pow(white_color_shape, 6.);
// white_color_shape *= smoothstep(.35, .7, white);

// float hit_area = yellow - yellow_hit_area;

// float white_central_shape = area_around_yellow;
// white_central_shape *= (1. - hit_area);
// white_central_shape *= .6;

// yellow -= 1.2 * hit_area;

// float yellow_shape = smoothstep(.49, .5, yellow);

// yellow_blick *= 1.05;
// yellow_blick -= .3 * hit_area;
// yellow_blick = step(.7, yellow_blick);

// vec3 color = vec3(.0);
// color = mix(color, .98 * vec3(1., .98, .99), base_shape);
// color = mix(color, vec3(1.), white_color_shape);
// color = mix(color, vec3(0., 0., .3), white_central_shape);
// color = mix(color, vec3(1., .6, 0.), yellow_shape);
// color += .2 * yellow_light;
// color = mix(color, vec3(1.), yellow_blick);

// float opacity = smoothstep(.25, .34, white);
// opacity += .05 * smoothstep(.15, .2, white);
// opacity -= 1.5 * white_central_shape;
// opacity += yellow_shape;

// gl_FragColor = vec4(color, opacity);
// }
// `}
// </script>