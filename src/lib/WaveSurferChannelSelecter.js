export default class ChannelSelecterPlugin {
  static create(params) {
    return {
      name: "channelSelecterPlugin",
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      staticProps: {},
      instance: ChannelSelecterPlugin,
    };
  }

  constructor(params, ws) {
    this.params = params;
    this.wavesurfer = ws;
    this.baseAudioBuffer = null;
  }

  setActiveChannel(selectedChannel) {
    if (!this.baseAudioBuffer) {
      this.baseAudioBuffer = this.wavesurfer.backend.buffer;
    }

    var audioCtx = this.wavesurfer.backend.ac;
    var buffer = this.wavesurfer.backend.buffer;
    var channels = 1;
    let singleChannelBuffer = audioCtx.createBuffer(
      channels,
      buffer.length,
      audioCtx.sampleRate
    );

    const bufferData = buffer.getChannelData(selectedChannel - 1);
    for (let channel = 0; channel < channels; channel++) {
      let nowBuffering = singleChannelBuffer.getChannelData(channel);
      for (var k in bufferData) {
        nowBuffering[k] = bufferData[k];
      }
    }

    let source = audioCtx.createBufferSource();
    source.buffer = singleChannelBuffer;
    source.connect(audioCtx.destination);

    source.onended = () => {
      console.log("White noise finished");
    };
  }

  _onReady() {
    this.baseAudioBuffer = null;
  }

  init() {
    if (this.wavesurfer.isReady) {
      this._onReady();
    } else {
      this.wavesurfer.once("ready", this._onReady.bind(this));
    }
  }

  destroy() {
    this.wavesurfer.un("ready", this._onReady.bind(this));
  }
}
