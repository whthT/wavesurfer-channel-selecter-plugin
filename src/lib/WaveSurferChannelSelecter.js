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
    const singleChannelBuffer = audioCtx.createBuffer(
      1,
      this.baseAudioBuffer.length,
      audioCtx.sampleRate
    );

    const bufferData = this.baseAudioBuffer.getChannelData(selectedChannel - 1);
    let nowBuffering = singleChannelBuffer.getChannelData(0);
    for (var k in bufferData) {
      nowBuffering[k] = bufferData[k];
    }

    this.wavesurfer.backend.buffer = singleChannelBuffer;
    this.wavesurfer.drawer.fireEvent("redraw");
  }

  _onReady() {
    this.baseAudioBuffer = null;
  }

  init() {
    if (this.wavesurfer.isReady) {
      this._onReady();
    } else {
      this.wavesurfer.on("ready", this._onReady.bind(this));
    }
  }

  destroy() {
    this.wavesurfer.un("ready", this._onReady.bind(this));
  }
}
