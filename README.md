# WaveSurfer Channel Selecter Plugin

[WaveSurfer.js](https://wavesurfer-js.org/) Channel Selecter Plugin

**NOTE**
This plugin works for **WebAudio** backend only for now.

### Usage

```js
import ChannelSelecterPlugin from "wavesurfer-channel-selecter-plugin";
const wavesurfer = WaveSurfer.create({
  container: document.getElementById("wavesurfer"),
  backend: "WebAudio", // Just WebAudio for now..
  ...
  plugins: [
      ...
      ChannelSelecterPlugin.create(),
      ...
  ],
});

document.getElementById('some-button').onclick = () => {
    wavesurfer.setActiveChannel(1);
    // wavesurfer.setActiveChannel(1, 2);
    // wavesurfer.setActiveChannel([1, 2, 3]);
}

// Reset wavesurfer and show all channels.
document.getElementById('reset-button').onclick = () => {
    wavesurfer.showAllChannels();
}

wavesurfer.on("channel-selected", (selectedChannels) => {
    console.log(selectedChannels) // [1]
});
```

### Installation

```sh
$ npm i wavesurfer-channel-selecter-plugin
```

### Methods

- `setActiveChannel` - Draw selected channels.
- `showAllChannels` - Reset to waveform.

### Events

- `channel-selected` - Trigger when selected channels are updated. Selected channels will pass as first argument.

### Screens

- Initial View
![WaveSurfer Channel Selecter Plugin Works Initial Screen](https://raw.githubusercontent.com/whthT/wavesurfer-channel-selecter-plugin/master/docs/screens/initial.png)

- 3th, 4th and 5th channels selected view
![WaveSurfer Channel Selecter Plugin 3th, 4th and 5th channels selected view Screen](https://raw.githubusercontent.com/whthT/wavesurfer-channel-selecter-plugin/master/docs/screens/3-4-5-channels-selected.png)


### Todos

- Support for MediaElement backend.
- Tests

## License

MIT

**Free Software, Hell Yeah!**

[git-repo-url]: https://github.com/whthT/wavesurfer-channel-selecter-plugin
[wavesurfer.js]: https://wavesurfer-js.org
[whtht]: https://github.com/whthT
[node.js]: http://nodejs.org
