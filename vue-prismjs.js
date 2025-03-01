'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var Prism = _interopDefault(require('prismjs'));

function noop() {}

function tryRequirePlugin(plugin, warnings) {
  try {
    require('prismjs/plugins/' + plugin + '/prism-' + plugin);
    return true;
  } catch (err) {
    if (warnings) {
      console.warn(err);
    }
  }
  return false;
}

var Prism$2 = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('pre', { ref: "pre", class: _vm.preClass }, [_c('code', { ref: "code", class: _vm.codeClass }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    plugins: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    use: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    code: {
      type: String,
      default: ''
    },
    preRender: {
      type: Function,
      default: function _default(code) {
        return code.replace(/\s+data-v-\S+="[^"]*"/g, '');
      }
    },
    postRender: {
      type: Function,
      default: function _default(code) {
        return code;
      }
    },
    warn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    preClass: function preClass() {
      return {
        'command-line': this.hasPlugin('command-line'),
        'line-numbers': this.hasPlugin('line-numbers')
      };
    },
    codeClass: function codeClass() {
      return _defineProperty({
        'match-braces': this.hasPlugin('match-braces')
      }, 'language-' + this.language, true);
    }
  },
  methods: {
    render: function render() {
      var _this = this;

      if (!Prism.languages[this.language]) {
        require('prismjs/components/prism-' + this.language);
      }

      var pluginCount = 0;
      this.plugins.forEach(function (plugin) {
        if (Prism.plugins && Prism.plugins[plugin]) {
          return true;
        }

        if (tryRequirePlugin(plugin, _this.warn)) {
          pluginCount++;
        }
      });
      if (pluginCount) {
        this.use(Prism, this);
      }

      // always update codetext to the code value
      // otherwise see if the text has already been obtained
      // otherwise obtain it from innerHTML
      this.codeText = this.code || this.codeText || this.$refs.code.innerHTML;
      this.$nextTick(function () {
        _this.$refs.code.textContent = _this.preRender(_this.codeText, _this);
        Prism.highlightElement(_this.$refs.code);
        _this.$refs.code.innerHTML = _this.postRender(this.$refs.code.innerHTML, _this);
      });
    },
    hasPlugin: function hasPlugin(plugin) {
      return this.plugins.indexOf(plugin) !== -1;
    }
  },
  mounted: function mounted() {
    this.render();
  },

  watch: {
    code: function code() {
      this.render();
    },
    language: function language() {
      this.render();
    },
    plugins: function plugins() {
      this.render();
    }
  },
  data: function data() {
    return {
      codeText: ''
    };
  }
};

/**
 * @name vue-prismjs
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Prismjs component for Vue.js
 */

module.exports = Prism$2;
