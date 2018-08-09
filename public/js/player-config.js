function onPlayerAvailable() {
  var player = new WM.Player({
    videosIDs: '5964532',
    plugins: {
      core: [SamplePlugin()]
    },
    width: '100%',
    height: '100%',
    mediaControl: {
      plugins: ['sample_plugin']
    }
  });

  player.attachTo(document.querySelector('#player'));
}

WM.playerAvailable.then(onPlayerAvailable)