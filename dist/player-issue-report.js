var PlayerIssueReport =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return __webpack_require__(1);
};

module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _help = __webpack_require__(2);

var _help2 = _interopRequireDefault(_help);

var _issueReportDialog = __webpack_require__(3);

var _issueReportDialog2 = _interopRequireDefault(_issueReportDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './assets/styles.css'
var _Clappr = Clappr,
    UICorePlugin = _Clappr.UICorePlugin,
    Styler = _Clappr.Styler,
    template = _Clappr.template;

var PlayerIssueReport = function (_WP3$MediaControlPlug) {
  _inherits(PlayerIssueReport, _WP3$MediaControlPlug);

  _createClass(PlayerIssueReport, [{
    key: 'name',
    get: function get() {
      return 'player_issue_report';
    }
  }, {
    key: 'tagName',
    get: function get() {
      return 'img';
    }
  }, {
    key: 'panel',
    get: function get() {
      return 'lower';
    }
  }, {
    key: 'position',
    get: function get() {
      return 'right';
    }
  }, {
    key: 'template',
    get: function get() {
      return template(_issueReportDialog2.default);
    }
  }, {
    key: 'container',
    get: function get() {
      return this.core.getCurrentContainer();
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': 'player-issue-report'
      };
    }
  }]);

  function PlayerIssueReport(core) {
    _classCallCheck(this, PlayerIssueReport);

    var _this = _possibleConstructorReturn(this, (PlayerIssueReport.__proto__ || Object.getPrototypeOf(PlayerIssueReport)).call(this, core));

    _this.core = core;
    return _this;
  }

  _createClass(PlayerIssueReport, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_SHOW, this.onMediaControlShow);
      this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_HIDE, this.onMediaControlHide);
    }
  }, {
    key: 'onMediaControlShow',
    value: function onMediaControlShow() {
      var _this2 = this;

      var items = this.$el;

      items.off('click');
      items.on('click', function () {
        return _this2.onClick();
      });
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this.container.playback.pause();
      this.mediaControlPlugin.setKeepVisible();
      this.mediaControl.trigger(WP3.Events.MEDIACONTROL_MODAL_SHOW, this.template, { hidePanels: true });
    }
  }, {
    key: 'onMediaControlHide',
    value: function onMediaControlHide() {}
  }, {
    key: 'render',
    value: function render() {
      this.el.setAttribute('src', _help2.default);
    }
  }]);

  return PlayerIssueReport;
}(WP3.MediaControlPlugin);

exports.default = PlayerIssueReport;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "527624ed2765c6111503146ffec9c435.png";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div id=\"issue-report-dialog\" class=\"icon\">\n  <div class='issue-report__container'>\n      <h1 class='issue-report__title'>Quais tipos de problema deseja reportar?</h2>\n\n      <form action=\"/action_page.php\" method=\"get\" class=\"issue-report__form\">\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"video\">\n          <label>Vídeo e imagem</label>\n          <p>imagem com qualidade ruim ou cortada</p>\n        </div>\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"audio\">\n          <label>Áudio</label>\n          <p>dessincronizado, não toca, ou não tem o idioma que desejo</p>\n        </div>\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"subtitle\">\n          <label>Legenda</label>\n          <p>tamanho, dessincronizadas, erradas ou não exibidas</p>\n        </div>\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"description\">\n          <label> Título ou descrição </label>\n          <p>Título ou sinopse incorretos, episódios fora de ordem</p>\n        </div>\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"connection\">\n          <label>Carregamento</label>\n          <p>vídeo não inicia ou para no meio e fica carregando</p>\n        </div>\n        <div class='issue-report__item'>\n          <input type=\"checkbox\" name=\"connection\">\n          <label>Controles</label>\n          <p>algum controle não aparece ou nao consigo executar alguma ação</p>\n        </div>\n      </form>\n      <input type=\"submit\" class=\"issue-report__button\" value=\"Continuar\">\n  </div>\n</div>\n";

/***/ })
/******/ ]);