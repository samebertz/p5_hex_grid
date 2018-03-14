define(['hex_grid/constants', 'hex_grid/utils_math'],
function(constants, math) {
  // hex neighbor getters
  function cube_neighbor(cube, direction) {
    return {
      x: cube.x + constants.CUBE_DIRECTIONS[direction].x,
      y: cube.y + constants.CUBE_DIRECTIONS[direction].y,
      z: cube.z + constants.CUBE_DIRECTIONS[direction].z
    }
  }
  function axial_neighbor(axial, direction) {
    return {
      q: axial.q + constants.AXIAL_DIRECTIONS[direction].q,
      r: axial.r + constants.AXIAL_DIRECTIONS[direction].r,
    }
  }
  function oddr_offset_neighbor(offset, direction) {
    return {
      row: offset.row + constants.ODDR_OFFSET_DIRECTIONS[offset.row&1][direction].row,
      col: offset.col + constants.ODDR_OFFSET_DIRECTIONS[offset.row&1][direction].col,
    }
  }
  // hex "line" drawing
  function cube_line(a, b) {
    var line = []
    var distance = math.cube_distance(a, b),
        step = 1.0/distance
    for(let i = 0; i++; i <= distance) {
      line.push(math.cube_round(math.cube_lerp(a, b, i * step)))
    }
    return line
  }

  return {
    cube_neighbor,
    axial_neighbor,
    oddr_offset_neighbor,
    cube_line
  }
});
