define(['hex_grid/utils_coordinates'],
function(coordinates) {
  // manhattan distance calculation
  function cube_distance(a, b) {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
  }
  function axial_distance(a, b) {
    return cube_distance(coordinates.axial_to_cube(a), coordinates.axial_to_cube(b))
  }
  function oddr_offset_distance(a, b) {
    return axial_distance(coordinates.oddr_offset_to_axial(a), coordinates.oddr_offset_to_axial(b))
  }
  // math helpers
  function lerp(a, b, t) {
    return a + t*(b-a)
  }
  // cube grid math helpers
  function cube_lerp(a, b, t) {
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      z: lerp(a.z, b.z, t)
    }
  }
  function cube_round(cube) {
    var rx = Math.round(cube.x),
        ry = Math.round(cube.y),
        rz = Math.round(cube.z)
    var dx = Math.abs(rx - cube.x),
        dy = Math.abs(ry - cube.y),
        dz = Math.abs(rz - cube.z)
    var max_d = Math.max(dx, dy, dz)
    switch (max_d) {
      case dx:
        rx = -ry-rz
        break;
      case dy:
        ry = -rx-rz
        break;
      case dz:
        rz = -rx-ry
        break;
    }
    return {
      x: rx,
      y: ry,
      z: rz
    }
  }

  return {
    cube_distance,
    axial_distance,
    oddr_offset_distance,
    lerp,
    cube_lerp,
    cube_round
  }
});
