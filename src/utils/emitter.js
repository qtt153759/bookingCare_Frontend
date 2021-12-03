import EventEmitter from "events";
import { emit } from "process";
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); //unlimit listener
export const emitter = _emitter;
