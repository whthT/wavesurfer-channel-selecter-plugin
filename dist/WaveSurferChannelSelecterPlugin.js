!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.WaveSurferChannelSelecterPlugin=t():e.WaveSurferChannelSelecterPlugin=t()}(self,(function(){return(()=>{"use strict";var e={418:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});class n{static create(e){return{name:"channelSelecterPlugin",deferInit:!(!e||!e.deferInit)&&e.deferInit,params:e,staticProps:{},instance:n}}constructor(e,t){this.params=e,this.wavesurfer=t,this.baseAudioBuffer=null}setActiveChannel(e){this.baseAudioBuffer||(this.baseAudioBuffer=this.wavesurfer.backend.buffer);var t=this.wavesurfer.backend.ac,r=this.wavesurfer.backend.buffer;let n=t.createBuffer(1,r.length,t.sampleRate);const a=r.getChannelData(e-1);for(let e=0;e<1;e++){let t=n.getChannelData(e);for(var o in a)t[o]=a[o]}let i=t.createBufferSource();i.buffer=n,i.connect(t.destination),i.onended=()=>{console.log("White noise finished")}}_onReady(){this.baseAudioBuffer=null}init(){this.wavesurfer.isReady?this._onReady():this.wavesurfer.once("ready",this._onReady.bind(this))}destroy(){this.wavesurfer.un("ready",this._onReady.bind(this))}}}},t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(418)})()}));