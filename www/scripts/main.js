requirejs.config({
  baseUrl: 'scripts',
  paths: {
    p5: '/scripts/lib/p5',
    hex_grid: '/scripts/lib/hex_grid'
  }
})

requirejs(['p5/p5.min', 'hex_grid/hex_grid'], function(p5, hex_grid) {
  const HEX_SIZE = 32,
        HEXAGONAL_GRID_RADIUS = 6

  var sketch = new p5(function(sketch) {
    function draw_hexagonal_hex_grid_overlay(r) {
      sketch.noFill()
      sketch.stroke(0)
      sketch.strokeWeight(4)
      // var r = 50
      // sketch.ellipse(sketch.width/2, sketch.height/2, r, r)
      hex_grid.grid_p5_draw.draw_hex_grid_hexagon(sketch, r, -(r-1), -(r-1))
    }

    sketch.setup = function() {
      var wrapper_elt = document.getElementById('p5_wrapper'),
          wrapper = window.getComputedStyle(wrapper_elt, null)
      var w = parseFloat(wrapper.getPropertyValue('width')),
          h = window.innerHeight,
          p = parseFloat(wrapper.getPropertyValue('padding'))
      sketch.createCanvas(w, h-2*p, p5.P2D)

      hex_grid.parameters.set_hex_cell_size(HEX_SIZE)
      hex_grid.parameters.set_hex_grid_origin([sketch.width/2, sketch.height/2])

      sketch.background(255)
      sketch.noFill()
      sketch.noStroke()
      sketch.noLoop()
    }

    sketch.draw = function() {
      sketch.fill(200,100,100)
      sketch.stroke(0)
      sketch.strokeWeight(1)
      var line = hex_grid.utils.axial_line({q:0,r:0},{q:5,r:0})
      for (hex of line) {
        hex_grid.hex_p5_draw.draw_hex(sketch, hex)
      }

      draw_hexagonal_hex_grid_overlay(HEXAGONAL_GRID_RADIUS)
    }
  }, 'p5_wrapper')
})
