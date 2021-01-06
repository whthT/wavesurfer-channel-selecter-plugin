import { arrayFlatten } from "./helpers";

export default class ChannelSelecterPlugin {
  static create(params) {
    return {
      name: "channelSelecterPlugin",
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      staticProps: {
        showAllChannels() {
          if (!this.initialisedPluginList.channelSelecterPlugin) {
            this.initPlugin("channelSelecterPlugin");
          }
          return this.channelSelecterPlugin.resetChannels();
        },
        setActiveChannel() {
          return this.channelSelecterPlugin.setActiveChannel.call(
            this.channelSelecterPlugin,
            ...arguments
          );
        },
      },
      instance: ChannelSelecterPlugin,
    };
  }

  constructor(params, ws) {
    this.params = params;
    this.wavesurfer = ws;
    this.baseAudioBuffer = null;
    this.selectedChannels = []
  }

  setActiveChannel(..._selectedChannel) {
    this.selectedChannels = arrayFlatten(_selectedChannel).sort();
    if (!this.selectedChannels.length) {
      this.resetChannels()
      return true
    }

    var audioCtx = this.wavesurfer.backend.ac;
    const newAudioBuffer = audioCtx.createBuffer(
      this.selectedChannels.length,
      this.baseAudioBuffer.length,
      audioCtx.sampleRate
    );

    for (const channelIndex in this.selectedChannels) {
      const channel = this.selectedChannels[channelIndex];
      const bufferData = this.baseAudioBuffer.getChannelData(channel);
      let nowBuffering = newAudioBuffer.getChannelData(parseInt(channelIndex));
      for (var k in bufferData) {
        nowBuffering[k] = bufferData[k];
      }
    }

    this.wavesurfer.empty();
    this._loadWithoutReadyEvent(newAudioBuffer);
    this.wavesurfer.fireEvent("channel-selected", this.selectedChannels);
  }

  _loadWithoutReadyEvent(buffer) {
    this.wavesurfer.backend.load(buffer);
    this.wavesurfer.drawBuffer();
  }

  resetChannels() {
    this.wavesurfer.empty();
    this._loadWithoutReadyEvent(this.baseAudioBuffer)
    this.selectedChannels = [];
  }

  _onReady() {
    setTimeout(() => {
      // some delay
      this.baseAudioBuffer = this.wavesurfer.backend.buffer
    }, 100)
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
