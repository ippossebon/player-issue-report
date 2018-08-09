// import './assets/styles.css'
import help from './assets/help.png'

class PlayerIssueReport extends WP3.MediaControlPlugin {

  get name() { return 'player_issue_report' }
  get tagName() { return 'img' }
  get panel() { return 'lower' }
  get position() { return 'right' }
  get attributes() {
    return {
      'class': 'player-issue-report'
    }
  }

  constructor(core) {
    super(core)
    this.core = core
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_SHOW, this.onMediaControlShow)
    this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_HIDE, this.onMediaControlHide)
  }

  onMediaControlShow() {
    // your code here - some action when Media Control is visible
  }

  onMediaControlHide() {
    // your code here - some action when Media Control is hidden
  }

  render() {
    this.el.setAttribute('src', help)
  }
}

export default PlayerIssueReport