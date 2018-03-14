requirejs.config({
  baseUrl: 'scripts',
  paths: {
    p5: '/scripts/lib/p5',
    hex_grid: '/scripts/lib/hex_grid'
  }
})

requirejs(['p5/p5.min', 'hex_grid/hex_grid'], function(p5, hex_grid) {
  const HEX_SIZE = 25

  var sketch = new p5(function(sketch) {
    sketch.setup = function() {
      var wrapper_elt = document.getElementById('p5_wrapper'),
          wrapper = window.getComputedStyle(wrapper_elt, null)
      var w = parseFloat(wrapper.getPropertyValue('width')),
          h = window.innerHeight,
          p = parseFloat(wrapper.getPropertyValue('padding'))
      sketch.createCanvas(w, h-2*p, p5.P2D)

      sketch.background(255)
      sketch.noStroke()
      sketch.noFill()
      sketch.noLoop()
    }

    sketch.draw = function() {
      sketch.stroke(0)
      sketch.strokeWeight(3)
      // var r = 50
      // sketch.ellipse(sketch.width/2, sketch.height/2, r, r)
      hex_grid.parameters.set_hex_cell_size(HEX_SIZE)
      hex_grid.parameters.set_hex_grid_origin([sketch.width/2, sketch.height/2])
      hex_grid.grid_p5_draw.draw_hex_grid_hexagon(sketch, 3, -6, 3)
    }
  }, 'p5_wrapper')
})
