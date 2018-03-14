define(['hex_grid/parameters'],
function(parameters) {
  // returns the i_th corner of the hex with center and size
  function hex_corner(center, size, i) {
    var angle = (i * 60 + 30) * Math.PI / 180
    return [center[0] + size*Math.cos(angle),
            center[1] + size*Math.sin(angle)]
  }
  // returns pixel coordinates of center of hex at axial coordinate <q,r>
  function hex_axial_to_pixel(hex_axial_coordinates) {
    const origin = parameters.get_axial_origin(),
          basis = parameters.get_axial_basis()
    var x = basis.q[0] * hex_axial_coordinates.q +
            basis.r[0] * hex_axial_coordinates.r
    var y = basis.q[1] * hex_axial_coordinates.q +
            basis.r[1] * hex_axial_coordinates.r
    return [
      origin[0] + x,
      origin[1] + y
    ]
  }
  // draws a hex in specified p5 sketch
  function draw_hex(sketch, hex_axial_coordinates) {
    var size = parameters.get_hex_size(),
        center = hex_axial_to_pixel(hex_axial_coordinates)
    sketch.beginShape()
    for(let i=0; i<6; i++) {
      sketch.vertex(...hex_corner(center, size, i))
    }
    sketch.endShape(sketch.CLOSE)
  }

  return {
    hex_corner,
    hex_axial_to_pixel,
    draw_hex
  }
});
