import WaveSurfer from "wavesurfer.js";
import ChannelSelecterPlugin from "./lib/WaveSurferChannelSelecter";
window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const wavesurfer = WaveSurfer.create({
    container: document.getElementById("wavesurfer"),
    backend: "MediaElementWebAudio",
    splitChannels: true,
    plugins: [ChannelSelecterPlugin.create()],
  });
  wavesurfer.load("/4_channel_test.wav");
  const channelsEl = document.querySelector(".channels");
  wavesurfer.on("ready", () => {
    setTimeout(() => {
      var html = "";
      for (var i = 1; i <= wavesurfer.backend.buffer.numberOfChannels; i++) {
        html += `<button class="select-channel" data-channel="${i}">${i}</button>`;
      }
      channelsEl.innerHTML = html;

      Array.from(document.querySelectorAll(".select-channel")).forEach(
        (el, _k, self) => {
          el.onclick = (e) => {
            e.preventDefault();
            for (const _el of self) {
              _el.classList.remove("active");
            }
            el.classList.add("active");
            wavesurfer.channelSelecterPlugin.setActiveChannel(
              parseInt(el.getAttribute("data-channel"))
            );
          };
        }
      );
    }, 500);
  });

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
