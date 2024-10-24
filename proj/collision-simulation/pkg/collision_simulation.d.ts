/* tslint:disable */
/* eslint-disable */
/**
* @param {Ball} ball1
* @param {Ball} ball2
* @returns {Float64Array}
*/
export function collide(ball1: Ball, ball2: Ball): Float64Array;
/**
* @param {Float64Array} masses
* @param {Float64Array} velocities
* @param {number} count
* @returns {Float64Array}
*/
export function batch_collide(masses: Float64Array, velocities: Float64Array, count: number): Float64Array;
/**
*/
export class Ball {
  free(): void;
/**
* @param {number} mass
* @param {number} velocity
* @returns {Ball}
*/
  static new(mass: number, velocity: number): Ball;
/**
* @returns {number}
*/
  velocity(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ball_free: (a: number, b: number) => void;
  readonly ball_new: (a: number, b: number) => number;
  readonly ball_velocity: (a: number) => number;
  readonly collide: (a: number, b: number, c: number) => void;
  readonly batch_collide: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
