define(function() {
  return {
    // neighbor directions, starting at +x and ordered counter-clockwise
    // <dq, dr> unit vectors for each neighbor in Axial coordinates
    AXIAL_DIRECTIONS : [
      {q: 1,  r: 0},
      {q: 1,  r: -1},
      {q: 0,  r: -1},
      {q: -1, r: 0},
      {q: -1, r: 1},
      {q: 0,  r: 1}
    ],
    // <dx, dy, dz> triples for +/- unit basis vectors in Cube coordinates
    // i.e. vectors for each neighbor
    CUBE_DIRECTIONS : [
      {x: 1, y: -1, z: 0},
      {x: 1, y: 0, z: -1},
      {x: 0, y: 1, z: -1},
      {x: -1, y: 1, z: 0},
      {x: -1, y: 0, z: 1},
      {x: 0, y: -1, z: 1}
    ],
    // <drow, dcol> vectors for each neighbor in odd-r Offset coordinates
    ODDR_OFFSET_DIRECTIONS : [
      [ {row: 0,  col: 1},
        {row: -1,  col: 0},
        {row: -1, col: -1},
        {row: 0, col: -1},
        {row: 1, col: -1},
        {row: 1,  col: 0} ],
      [ {row: 0,  col: 1},
        {row: -1,  col: 1},
        {row: -1,  col: 0},
        {row: 0, col: -1},
        {row: 1,  col: 0},
        {row: 1,  col: 1} ]
    ]
  }
});
