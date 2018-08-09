const { UICorePlugin, Events, template } = Clappr

import VideosOfferEndScreenHtml from './public/clappr-videos-offer-end-screen.html'
import VideosOfferEndScreenStyle from './public/clappr-videos-offer-end-screen.scss'
import moment from './lib/moment.js'

class ClapprVideosOfferEndScreen extends UICorePlugin {
  static pluginName = 'videos-offer-end-screen'

  get name() { return ClapprVideosOfferEndScreen.pluginName }
  get template() { return template(VideosOfferEndScreenHtml) }
  get attributes() {
    return {
      class: 'videos-offer-end-screen',
      'data-videos-offer': ''
    }
  }

  get mediaControl() { return this.core.mediaControl }
  get posterPlugin() { return this.container.getPlugin('poster') }
  get container() { return this.core.getCurrentContainer() }

  get options() {
    return this.core.options.endOffer || {}
  }

  constructor(core) {
    super(core)
    this.videoEnded = false
  }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_CONTAINERS_CREATED, this.onContainerCreated)
    this.listenTo(this.core, Events.CORE_OPTIONS_CHANGE, this.onCoreOptionsChange)
    this.listenTo(this.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.bindContainerEvents)

    this.bindContainerEvents()
  }

  onContainerCreated() {
    this.videoEnded = false
    this.hideVideosOffer()
  }

  bindContainerEvents() {
    if (this.hasEndOffer()) {
      this.stopListening(this.container, Events.CONTAINER_PLAY)
      this.listenTo(this.container, Events.CONTAINER_PLAY, this.onContainerPlay)

      this.stopListening(this.container, Events.CONTAINER_ENDED)
      this.listenTo(this.container, Events.CONTAINER_ENDED, this.onContainerEnded)
    }
  }

  bindMarkupEvents() {
    const replay = this.$el.find('.videos-offer-end-screen__replay')
    const items = this.$el.find('.videos-offer-end-screen__item')

    replay.off('click')
    replay.on('click', ::this.onReplayClick)

    items.off('click')
    items.on('click', ::this.onItemClick)
  }

  render() {
    if (this.hasEndOffer()) {
      this.createMarkup()
      this.appendMarkup()
      this.bindMarkupEvents()
    }

    return this
  }

  appendMarkup() {
    this.core.$el.append(this.el)
  }

  createMarkup() {
    const videos = this.options.videos.slice(0, 4)
    this.$el.html(this.template({
      videos: this.withHumanizedDuration(videos)
    }))
    this.createStyle()
  }

  withHumanizedDuration(videos) {
    return videos.map((video, index) => {
      const newVideo = Object.assign({}, video)
      newVideo.duration = moment.duration(video.duration).humanize()
      return newVideo
    })
  }

  createStyle() {
    let style

    if (window.WP3) {
      const Styler = window.WP3.Styler
      const { playerId } = this.core.options
      style = Styler.getStyleFrom(VideosOfferEndScreenStyle, {
        playerId: playerId
      })[0]
    } else {
      const Styler = window.Clappr.Styler
      style = Styler.getStyleFor(VideosOfferEndScreenStyle)
    }

    this.$el.append(style)
  }

  hasEndOffer() {
    return !!(this.options.videos && this.options.videos.length > 0)
  }

  showPosterIcon() {
    this.posterPlugin.showPlayButton()
  }

  hidePosterIcon() {
    this.posterPlugin.hidePlayButton()
  }

  showVideosOffer() {
    this.$el.addClass('videos-offer-end-screen--visible')
  }

  hideVideosOffer() {
    this.$el.removeClass('videos-offer-end-screen--visible')
  }

  addBackgroundBlur() {
    this.posterPlugin.$el.find('.poster-background').css({
      '-webkit-filter': 'blur(5px)',
      '-moz-filter': 'blur(5px)',
      '-o-filter': 'blur(5px)',
    })
  }

  removeBackgroundBlur() {
    this.posterPlugin.$el.find('.poster-background').css({
      '-webkit-filter': 'blur(0px)',
      '-moz-filter': 'blur(0px)',
      '-o-filter': 'blur(0px)',
    })
  }

  onCoreOptionsChange() {
    this.render()
    this.bindContainerEvents()

    if (this.options.visible && this.videoEnded) {
      this.onContainerEnded()
    }
  }

  onContainerPlay() {
    this.showPosterIcon()
    this.removeBackgroundBlur()
    this.hideVideosOffer()

    this.videoEnded = false
  }

  onContainerEnded() {
    this.videoEnded = true

    if (this.options.visible) {
      this.hidePosterIcon()
      this.addBackgroundBlur()
      this.showVideosOffer()
    }
  }

  onReplayClick() {
    this.container.play()
    this.hideVideosOffer()
  }

  clickedItemindex(item) {
    return $(item).closest('.videos-offer-end-screen__item').index()
  }

  onItemClick(e) {
    const { videos, onVideoClick } = this.options
    const itemIndex = this.clickedItemindex(e.target)
    const video = videos[itemIndex]

    this.videoEnded = false

    if (onVideoClick) {
      this.hideVideosOffer()
      onVideoClick(e, video)
    }
  }
}

export default ClapprVideosOfferEndScreen
