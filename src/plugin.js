// import './assets/styles.css'
import parrotGif from './assets/parrot.gif'

export default class SamplePlugin extends WP3.MediaControlPlugin {

  get name() { return 'sample_plugin' }
  get tagName() { return 'img' }
  get panel() { return 'upper' }
  get position() { return 'left' }
  get attributes() {
    return {
      'class': 'sample-plugin'
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
    this.el.setAttribute('src', parrotGif)
  }
}