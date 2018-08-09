function onPlayerAvailable() {
  var player = new WM.Player({
    videosIDs: '5964532',
    plugins: {
      core: [PlayerIssueReport()]
    },
    width: '100%',
    height: '100%',
    mediaControl: {
      plugins: ['player_issue_report']
    }
  });

  player.attachTo(document.querySelector('#player'));
}

WM.playerAvailable.then(onPlayerAvailable)