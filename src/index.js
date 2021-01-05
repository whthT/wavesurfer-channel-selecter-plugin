import WaveSurfer from "wavesurfer.js";
import ChannelSelecterPlugin from "./lib/WaveSurferChannelSelecter";
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var selectedChannels = [];
window.addEventListener("DOMContentLoaded", () => {
  const wavesurfer = WaveSurfer.create({
    container: document.getElementById("wavesurfer"),
    backend: "WebAudio",
    splitChannels: true,
    height: 60,
    plugins: [ChannelSelecterPlugin.create()],
  });
  wavesurfer.load("/4_channel_test.wav");
  const channelsEl = document.querySelector(".channels");
  wavesurfer.on('ready', () => {
    selectedChannels = []
    wavesurfer.fireEvent('channel-selected', [])
  })
  var html = "";
  for (var i = 0; i < 6; i++) {
    html += `<button class="select-channel" data-channel="${i}">${
      i + 1
    }</button>`;
  }
  channelsEl.innerHTML = html;

  Array.from(document.querySelectorAll(".select-channel")).forEach((el, _k) => {
    el.onclick = (e) => {
      e.preventDefault();

      var channel = parseInt(el.getAttribute("data-channel"));

      if (!e.ctrlKey) {
        selectedChannels = [];
      }

      if (selectedChannels.indexOf(channel) >= 0) {
        selectedChannels = selectedChannels.filter((v) => v !== channel);
      } else {
        selectedChannels.push(channel);
      }

      wavesurfer.setActiveChannel(selectedChannels);
    };
  });

  wavesurfer.on("channel-selected", (channels) => {
    Array.from(document.querySelectorAll(".select-channel")).forEach((el) => {
      var channel = parseInt(el.getAttribute("data-channel"));
      if (channels.indexOf(channel) >= 0) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });

  document.getElementById("resetButton").onclick = () => {
    wavesurfer.showAllChannels();
  };

  document.getElementById("playPause").onclick = () => {
    wavesurfer.playPause();
  };

  window.wavesurfer = wavesurfer;
  Array.from(document.querySelectorAll(".links > a")).forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      wavesurfer.load(el.getAttribute("href"));
    };
  });
});
