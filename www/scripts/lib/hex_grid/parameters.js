define(function() {
  var HEX_SIZE, HEX_HEIGHT, HEX_WIDTH, AXIAL_ORIGIN, AXIAL_BASIS
  // parameter setters / intializers
  function set_hex_cell_size(hex_cell_size) {
    HEX_SIZE    = hex_cell_size
    HEX_HEIGHT  = HEX_SIZE * 2
    HEX_WIDTH   = HEX_HEIGHT * Math.sqrt(3)/2
    // Axial coordinate basis vectors in pixel coordinates,
    // where q = +x and r = +z in cube coordinates
    AXIAL_BASIS = {
      q: [HEX_WIDTH,   0],
      r: [HEX_WIDTH/2, HEX_HEIGHT * 3/4]
    }
  }
  function set_hex_grid_origin(pixel_coordinates) {
    // Axial coordinate system origin in pixel coordinates
    AXIAL_ORIGIN = pixel_coordinates
  }

  return {
    get_hex_size: () => HEX_SIZE,
    get_hex_height: () => HEX_HEIGHT,
    get_hex_width: () => HEX_WIDTH,
    get_axial_origin: () => AXIAL_ORIGIN,
    get_axial_basis: () => AXIAL_BASIS,
    set_hex_cell_size,
    set_hex_grid_origin
  }
});
