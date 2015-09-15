var bindEditor = require('./methodDrawBinding')

module.exports = setup
module.exports.consumes = ['editor']
module.exports.provides = []
function setup(plugin, imports, register) {
  var editor = imports.editor

  editor.registerEditor('Method-Draw', 'svg', 'An easy to use, full-featured SVG editor'
  , function*(el) {
    var iframe = document.createElement('iframe')
    iframe.setAttribute('src', '/static/hive-editor-svg-method-draw/lib/Method-Draw/index.html')

    // Maximize editor
    document.body.style['position'] = 'absolute'
    document.body.style['bottom'] =
    document.body.style['top'] =
    document.body.style['left'] =
    document.body.style['right'] = '0'
    document.body.style['overflow'] = 'hidden'
    document.querySelector('#editor').style['height'] = '100%'
    iframe.style['width'] = '100%'
    iframe.style['height'] = '100%'
    iframe.setAttribute('border', '0')

    // load the editor
    yield function(cb) {
      iframe.onload = function() {
        cb()
      }
      el.appendChild(iframe)
    }

    iframe.contentDocument.querySelector('#menu_bar').style['visibility'] = 'hidden'

    /* bind editor */
    var methodDraw = iframe.contentDocument.defaultView.methodDraw
    return bindEditor(methodDraw, iframe.contentDocument)
  })
  register()
}
