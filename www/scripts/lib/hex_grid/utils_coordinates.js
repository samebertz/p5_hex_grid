define(function() {
  // hex coordinate conversions
  function axial_to_cube(axial) {
    return {x: axial.q, y: -axial.q-axial.r, z: axial.r}
  }
  function cube_to_axial(cube) {
    return {q: cube.x, r: cube.z}
  }
  function axial_to_oddr_offset(axial) {
    return {row: axial.r, col: axial.q + (axial.r - (axial.r&1)) / 2}
  }
  function oddr_offset_to_axial(offset) {
    return {q: offset.col - (offset.row - (offset.row&1)) / 2, r: offset.row}
  }
  // TODO: oddr_offset_to_cube(offset) and cube_to_oddr_offset(cube)

  return {
    axial_to_cube,
    cube_to_axial,
    axial_to_oddr_offset,
    oddr_offset_to_axial
  }
});
