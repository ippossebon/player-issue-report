Clappr = {
  UICorePlugin: function() {},
  Events: {
    CORE_OPTIONS_CHANGE: 'core_options_change',
    MEDIACONTROL_CONTAINERCHANGED: 'mediacontrol_containerchanged',
    CONTAINER_PLAY: 'container_play',
    CONTAINER_ENDED: 'container_ended'
  },
  template: function() {}
}

window = { WP3: { Styler: {} } }

var VideoModelUtils = require('./helpers/video-model-utils')
var ClapprVideosOfferEndScreen = require('../dist/clappr-videos-offer-end-screen')

describe('ClapprVideosOfferEndScreen', function() {
  var pluginInstance
  var findSpy

  var createPlugin = function(options) {
    var container = jasmine.createSpy('container')
    var plugin = new ClapprVideosOfferEndScreen()
    plugin.core = {
      options: options || {},
      mediaControl: jasmine.createSpy(),
      container: container,
      getCurrentContainer: container,
      $el: {
        append: jasmine.createSpy()
      }
    }

    plugin.options = options
    plugin.listenTo = jasmine.createSpy()
    plugin.stopListening = jasmine.createSpy()

    findSpy = {
      on: jasmine.createSpy('on'),
      off: jasmine.createSpy('off')
    }
    findSpy.on.and.returnValue(findSpy)
    findSpy.off.and.returnValue(findSpy)

    plugin.container = {}
    plugin.$el = { find: () => findSpy }

    return plugin
  }

  describe('#bindEvents', function() {
    beforeEach(function() {
      pluginInstance = createPlugin()
      spyOn(pluginInstance, 'bindContainerEvents')
      spyOn(pluginInstance, 'onCoreOptionsChange')
      spyOn(pluginInstance, 'onContainerCreated')
      pluginInstance.bindEvents()
    })

    it('expect to bind container events', function() {
      expect(pluginInstance.bindContainerEvents).toHaveBeenCalled()
    })

    it('expect to listen core created', function() {
      expect(pluginInstance.listenTo).toHaveBeenCalledWith(
        pluginInstance.core, Clappr.Events.CORE_CONTAINERS_CREATED, pluginInstance.onContainerCreated)
    })

    it('expect to listen core option change', function() {
      expect(pluginInstance.listenTo).toHaveBeenCalledWith(
        pluginInstance.core, Clappr.Events.CORE_OPTIONS_CHANGE, pluginInstance.onCoreOptionsChange)
    })

    it('expect to listen media control change', function() {
      expect(pluginInstance.listenTo).toHaveBeenCalledWith(
        pluginInstance.mediaControl, Clappr.Events.MEDIACONTROL_CONTAINERCHANGED, pluginInstance.bindContainerEvents)
    })
  })

  describe('#onContainerCreated', function() {
    beforeEach(function() {
      pluginInstance = createPlugin({
        endOffer: {
          videos: VideoModelUtils.createVideoModelArray(5)
        }
      })

      spyOn(pluginInstance, 'hideVideosOffer')
      pluginInstance.videoEnded = true

      pluginInstance.onContainerCreated()
    })

    it('expect to hide videos offer', function() {
      expect(pluginInstance.hideVideosOffer).toHaveBeenCalled()
    })

    it('expect to reset video ended to false', function() {
      expect(pluginInstance.videoEnded).toEqual(false)
    })
  })

  describe('#bindContainerEvents', function() {
    describe('when end offer is received', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(5)
          }
        })

        spyOn(pluginInstance, 'onContainerPlay')
        spyOn(pluginInstance, 'onContainerEnded')
        pluginInstance.bindContainerEvents()
      })

      it('exepect to listen container play', function() {
        expect(pluginInstance.listenTo).toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_PLAY, pluginInstance.onContainerPlay)
      })

      it('exepect to stop listening container play', function() {
        expect(pluginInstance.stopListening).toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_PLAY)
      })

      it('exepect to listen container ended', function() {
        expect(pluginInstance.listenTo).toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_ENDED, pluginInstance.onContainerEnded)
      })

      it('exepect to stop listening container ended', function() {
        expect(pluginInstance.stopListening).toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_ENDED)
      })
    })

    describe('when end offer is not received', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(0)
          }
        })

        spyOn(pluginInstance, 'onContainerPlay')
        spyOn(pluginInstance, 'onContainerEnded')
        pluginInstance.bindContainerEvents()
      })

      it('exepect to listen container play', function() {
        expect(pluginInstance.listenTo).not.toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_PLAY, pluginInstance.onContainerPlay)
      })

      it('exepect to listen container ended', function() {
        expect(pluginInstance.listenTo).not.toHaveBeenCalledWith(
          pluginInstance.container, Clappr.Events.CONTAINER_ENDED, pluginInstance.onContainerEnded)
      })
    })
  })

  describe('#bindMarkupEvents', function() {
    beforeEach(function() {
      pluginInstance = createPlugin()
      spyOn(pluginInstance, 'onReplayClick')
      spyOn(pluginInstance, 'onItemClick')

      pluginInstance.bindMarkupEvents()
    })

    it('expect to rebind replay and item click', function() {
      expect(findSpy.off.calls.count()).toEqual(2)
      expect(findSpy.on).toHaveBeenCalledWith('click', jasmine.any(Function))
      expect(findSpy.on.calls.count()).toEqual(2)
    })
  })

  describe('#withHumanizedDuration', function() {
    var videosArray

    beforeEach(function() {
      videosArray = VideoModelUtils.createVideoModelArray(5)
      pluginInstance = createPlugin()
    })

    it('expect to return first videos with modified duration', function() {
      pluginInstance.withHumanizedDuration(videosArray).map(function(video) {
        expect(video.duration).toEqual('2 min')
      })
    })
  })

  describe('#render', function() {
    describe('when end offer is received', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(5)
          }
        })

        spyOn(pluginInstance, 'createMarkup')
        spyOn(pluginInstance, 'appendMarkup')
        spyOn(pluginInstance, 'bindMarkupEvents')

        pluginInstance.render()
      })

      it('expect to create markup', function() {
        expect(pluginInstance.createMarkup).toHaveBeenCalled()
      })

      it('expect to append markup', function() {
        expect(pluginInstance.appendMarkup).toHaveBeenCalled()
      })

      it('expect to bind markup events', function() {
        expect(pluginInstance.bindMarkupEvents).toHaveBeenCalled()
      })
    })

    describe('when end offer is not received', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(0)
          }
        })

        spyOn(pluginInstance, 'createMarkup')
        spyOn(pluginInstance, 'appendMarkup')
        spyOn(pluginInstance, 'bindMarkupEvents')

        pluginInstance.render()
      })

      it('expect to create markup', function() {
        expect(pluginInstance.createMarkup).not.toHaveBeenCalled()
      })

      it('expect to append markup', function() {
        expect(pluginInstance.appendMarkup).not.toHaveBeenCalled()
      })

      it('expect to bind markup events', function() {
        expect(pluginInstance.bindMarkupEvents).not.toHaveBeenCalled()
      })
    })
  })

  describe('#appendMarkup', function() {
    it('expect to append markup on core container', function() {
      pluginInstance = createPlugin()
      pluginInstance.appendMarkup()

      expect(pluginInstance.core.$el.append).toHaveBeenCalledWith(pluginInstance.el)
    })
  })

  describe('#hasEndOffer', function() {
    describe('when video offer is received', function() {
      describe('and videos array is greater then 0', function() {
        it('expect to return true', function() {
          pluginInstance = createPlugin({
            endOffer: {
              videos: VideoModelUtils.createVideoModelArray(2)
            }
          })

          expect(pluginInstance.hasEndOffer()).toEqual(true)
        })
      })

      describe('but videos array is equal 0', function() {
        it('expect to return false', function() {
          pluginInstance = createPlugin({
            endOffer: {
              videos: VideoModelUtils.createVideoModelArray(0)
            }
          })

          expect(pluginInstance.hasEndOffer()).toEqual(false)
        })
      })
    })

    describe('when video offer is not received', function() {
      it('expect to return false', function() {
        pluginInstance = createPlugin()
        expect(pluginInstance.hasEndOffer()).toEqual(false)
      })
    })
  })

  describe('#onCoreOptionsChange', function() {
    beforeEach(function() {
      pluginInstance = createPlugin({
        endOffer: {
          videos: VideoModelUtils.createVideoModelArray(0),
          visible: true
        }
      })

      spyOn(pluginInstance, 'hidePosterIcon')
      spyOn(pluginInstance, 'addBackgroundBlur')
      spyOn(pluginInstance, 'showVideosOffer')
      spyOn(pluginInstance, 'bindContainerEvents')
      spyOn(pluginInstance, 'render')

      pluginInstance.onContainerEnded()
    })

    it('expect plugin rerender', function() {
      pluginInstance.onCoreOptionsChange()
      expect(pluginInstance.render).toHaveBeenCalled()
    })

    it('expect plugin to rebind container events', function() {
      pluginInstance.onCoreOptionsChange()
      expect(pluginInstance.bindContainerEvents).toHaveBeenCalled()
    })

    describe('when plugin can be visible', function() {
      describe('and videoEnd was called previously', function() {
        beforeEach(function() {
          pluginInstance = createPlugin({
            endOffer: {
              videos: VideoModelUtils.createVideoModelArray(0),
              visible: true
            }
          })

          spyOn(pluginInstance, 'hidePosterIcon')
          spyOn(pluginInstance, 'addBackgroundBlur')
          spyOn(pluginInstance, 'showVideosOffer')
          spyOn(pluginInstance, 'bindContainerEvents')

          pluginInstance.onContainerEnded()
        })

        it('expect to call recall container end event', function() {
          spyOn(pluginInstance, 'onContainerEnded')
          pluginInstance.onCoreOptionsChange()
          expect(pluginInstance.onContainerEnded).toHaveBeenCalled()
          expect(pluginInstance.onContainerEnded.calls.count()).toEqual(1)
        })
      })

      describe('and videoEnd was not called previously', function() {
        beforeEach(function() {
          pluginInstance = createPlugin({
            endOffer: {
              videos: VideoModelUtils.createVideoModelArray(0),
              visible: true
            }
          })

          spyOn(pluginInstance, 'hidePosterIcon')
          spyOn(pluginInstance, 'addBackgroundBlur')
          spyOn(pluginInstance, 'showVideosOffer')
        })

        it('expect to not call container end event', function() {
          spyOn(pluginInstance, 'onContainerEnded')
          pluginInstance.onCoreOptionsChange()
          expect(pluginInstance.onContainerEnded).not.toHaveBeenCalled()
          expect(pluginInstance.onContainerEnded.calls.count()).toEqual(0)
        })
      })
    })
  })

  describe('#onContainerPlay', function() {
    beforeEach(function() {
      pluginInstance = createPlugin()

      spyOn(pluginInstance, 'showPosterIcon')
      spyOn(pluginInstance, 'removeBackgroundBlur')
      spyOn(pluginInstance, 'hideVideosOffer')

      pluginInstance.videoEnded = false
    })

    it('expect to show poster icon', function() {
      pluginInstance.onContainerPlay()
      expect(pluginInstance.showPosterIcon).toHaveBeenCalled()
    })

    it('expect to remove background blur', function() {
      pluginInstance.onContainerPlay()
      expect(pluginInstance.removeBackgroundBlur).toHaveBeenCalled()
    })

    it('expect to hide videos offer', function() {
      pluginInstance.onContainerPlay()
      expect(pluginInstance.hideVideosOffer).toHaveBeenCalled()
    })

    it('expect to set videoEnded as true', function() {
      expect(pluginInstance.videoEnded).toEqual(false)
      pluginInstance.videoEnded = true
      pluginInstance.onContainerPlay()
      expect(pluginInstance.videoEnded).toEqual(false)
    })
  })

  describe('#onContainerEnded', function() {
    describe('when plugin can be visible', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(0),
            visible: true
          }
        })

        spyOn(pluginInstance, 'hidePosterIcon')
        spyOn(pluginInstance, 'addBackgroundBlur')
        spyOn(pluginInstance, 'showVideosOffer')
      })

      it('expect to set videoEnded as true', function() {
        expect(pluginInstance.videoEnded).toEqual(false)
        pluginInstance.onContainerEnded()
        expect(pluginInstance.videoEnded).toEqual(true)
      })

      it('expect to hide poster icon', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.hidePosterIcon).toHaveBeenCalled()
      })

      it('expect to add background blur', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.addBackgroundBlur).toHaveBeenCalled()
      })

      it('expect to show videos offer', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.showVideosOffer).toHaveBeenCalled()
      })
    })

    describe('when plugin can be visible', function() {
      beforeEach(function() {
        pluginInstance = createPlugin({
          endOffer: {
            videos: VideoModelUtils.createVideoModelArray(0),
            visible: false
          }
        })

        spyOn(pluginInstance, 'hidePosterIcon')
        spyOn(pluginInstance, 'addBackgroundBlur')
        spyOn(pluginInstance, 'showVideosOffer')
      })

      it('expect to set videoEnded as true', function() {
        expect(pluginInstance.videoEnded).toEqual(false)
        pluginInstance.onContainerEnded()
        expect(pluginInstance.videoEnded).toEqual(true)
      })

      it('expect to hide poster icon', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.hidePosterIcon).not.toHaveBeenCalled()
      })

      it('expect to add background blur', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.addBackgroundBlur).not.toHaveBeenCalled()
      })

      it('expect to show videos offer', function() {
        pluginInstance.onContainerEnded()
        expect(pluginInstance.showVideosOffer).not.toHaveBeenCalled()
      })
    })
  })

  describe('#onReplayClick', function() {
    var playSpy = jasmine.createSpy('play')

    beforeEach(function() {
      pluginInstance = createPlugin()
      pluginInstance.core.getCurrentContainer = function() {
        return {
          play: playSpy
        }
      }

      spyOn(pluginInstance, 'hideVideosOffer')
      pluginInstance.onReplayClick()
    })

    it('expect to play video', function() {
      expect(playSpy).toHaveBeenCalled()
    })

    it('expect to hide video offer', function() {
      expect(pluginInstance.hideVideosOffer).toHaveBeenCalled()
    })
  })

  describe('#onItemClick', function() {
    var onVideoClick = jasmine.createSpy('onVideoClick')
    var clickedItemIndex = 2
    var videos = VideoModelUtils.createVideoModelArray(4)

    beforeEach(function() {
      pluginInstance = createPlugin({
        endOffer: {
          videos: videos,
          onVideoClick: onVideoClick,
        }
      })

      spyOn(pluginInstance, 'clickedItemindex').and.returnValue(clickedItemIndex)
      spyOn(pluginInstance, 'hideVideosOffer')

      pluginInstance.videoEnded = true

      pluginInstance.onItemClick({
        target: clickedItemIndex,
        preventDefault: jasmine.createSpy()
      })
    })

    it('expect to call onVideoClick callback with event and clicked video object', function() {
      expect(onVideoClick).
        toHaveBeenCalledWith(jasmine.any(Object), videos[clickedItemIndex])
    })

    it('expect to hide videos offer', function() {
      expect(pluginInstance.hideVideosOffer).toHaveBeenCalled()
    })

    it('expect to set videoEnded as false', function() {
      expect(pluginInstance.videoEnded).toEqual(false)
    })
  })
})
