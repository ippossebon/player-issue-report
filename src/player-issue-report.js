import './assets/issue-report-dialog.css'
const { UICorePlugin, Styler, template } = Clappr

import report from './assets/report.png'
import IssueReportModal from './assets/issue-report-dialog.html'
import browserReport from '../public/js/browser-report'

class PlayerIssueReport extends WP3.MediaControlPlugin {

  get name() { return 'player_issue_report' }
  get tagName() { return 'img' }
  get panel() { return 'lower' }
  get position() { return 'right' }
  get template() { return template(IssueReportModal) }
  get container() { return this.core.getCurrentContainer() }
  get attributes() {
    return {
      'class': 'player-issue-report'
    }
  }

  constructor(core) {
    super(core)
    this.core = core
    this.report = new BrowseReport().export()
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_SHOW, this.onMediaControlShow)
    this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_HIDE, this.onMediaControlHide)
  }


  onMediaControlShow() {
    const items = this.$el

    items.off('click')
    items.on('click', () => this.onClick())
  }

  onClick() {
    this.container.playback.pause()
    this.mediaControlPlugin.setKeepVisible()
    this.mediaControl.trigger(WP3.Events.MEDIACONTROL_MODAL_SHOW, this.template, {hidePanels: true})
    console.log(this.report)
  }

  onMediaControlHide() {

  }

  render() {
    this.el.setAttribute('src', report)
  }
}

export default PlayerIssueReport
