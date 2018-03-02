// canvas pixel coordinates are pairs (2 element arrays)
// with x = pair[0] and y = pair[1]
// axial coordinates are objects with properties q and r

const HEX_SIZE     = 25,
      HEX_HEIGHT   = HEX_SIZE * 2,
      HEX_WIDTH    = HEX_HEIGHT * Math.sqrt(3)/2,
      // Axial coordinate system origin in pixel coordinates
      AXIAL_ORIGIN = [0, 0],
      // Axial coordinate basis vectors in pixel coordinates,
      // where q = +x and r = +z in cube coordinates
      AXIAL_BASIS  = {
        q: [HEX_WIDTH,   0],
        r: [HEX_WIDTH/2, HEX_HEIGHT * 3/4]
      }

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
// console.assert(Object.values(axial_to_oddr_offset({q: 0, r: 0})).join() == Object.values({row: 0, col: 0}).join())
// console.log(Object.values(axial_to_oddr_offset({q: 0, r: 0})).join() + ' ' + Object.values({row: 0, col: 0}).join())
// console.assert(Object.values(axial_to_oddr_offset({q: 1, r: 0})).join() == Object.values({row: 0, col: 1}).join())
// console.assert(Object.values(axial_to_oddr_offset({q: 0, r: 1})).join() == Object.values({row: 1, col: 0}).join())
// console.assert(Object.values(axial_to_oddr_offset({q: 3, r: 4})).join() == Object.values({row: 4, col: 5}).join())
function oddr_offset_to_axial(offset) {
  return {q: offset.col - (offset.row - (offset.row&1)) / 2, r: offset.row}
}
// console.assert(Object.values(oddr_offset_to_axial({row: 0, col: 0})).join() == Object.values({q: 0, r: 0}).join())
// console.log(Object.values(oddr_offset_to_axial({row: 0, col: 0})).join() + ' ' + Object.values({q: 0, r: 0}).join())
// console.assert(Object.values(oddr_offset_to_axial({row: 1, col: 0})).join() == Object.values({q: 0, r: 1}).join())
// console.assert(Object.values(oddr_offset_to_axial({row: 0, col: 1})).join() == Object.values({q: 1, r: 0}).join())
// console.assert(Object.values(oddr_offset_to_axial({row: 3, col: 4})).join() == Object.values({q: 3, r: 3}).join())

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20)

  AXIAL_ORIGIN[0] = width/2
  AXIAL_ORIGIN[1] = height/2

  background(255)
  strokeWeight(3)
  // noStroke()
  noFill()
  noLoop()
}

// returns pixel coordinates of center of hex at axial coordinate <q,r>
function hex_axial_to_pixel(hex_axial_coordinates) {
  // var x = HEX_SIZE * sqrt(3)/2 * (hex_axial_coordinates.q + hex_axial_coordinates.r / 2)
  var x = AXIAL_ORIGIN[0] + AXIAL_BASIS.q[0] * hex_axial_coordinates.q + AXIAL_BASIS.r[0] * hex_axial_coordinates.r
  // var y = HEX_SIZE * 3/2 * hex_axial_coordinates.r
  var y = AXIAL_ORIGIN[1] + AXIAL_BASIS.q[1] * hex_axial_coordinates.q + AXIAL_BASIS.r[1] * hex_axial_coordinates.r
  return [x,y]
}

// returns the i_th corner of the hex with center and size
function hex_corner(center, size, i) {
  var angle = (i * 60 + 30) * Math.PI / 180
  return [center[0] + size*Math.cos(angle),
          center[1] + size*Math.sin(angle)]
}

function draw() {
  strokeWeight(2)
  stroke('rgb(0,0,255)')
  ellipse(...AXIAL_ORIGIN, 25)

  function draw_hex(hex_axial_coordinates) {
    var center = hex_axial_to_pixel(hex_axial_coordinates)
    beginShape()
    for(let i=0; i<6; i++) {
      vertex(...hex_corner(center, HEX_SIZE, i))
    }
    endShape(CLOSE)
  }

  // size MxN (or just M), with offset <M_,N_>
  function draw_hex_grid(M, N, M_, N_, condition) {
    // console.log('drawing hex grid with: '+Array.prototype.slice.call(arguments).join(', '))
    for(let row = 0; row < M; row++) {
      for(let col = 0; col < N; col++) {
        if(condition(row, col, M, N)) draw_hex({q: N_+col, r: M_+row})
      }
    }
  }

  // draw rhombus shaped hex grid with height M and width N
  function draw_hex_grid_rhombus(M, N, M_, N_) {
    // console.log('drawing hex grid in rhombus shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(M, N, M_, N_, () => true)
  }

  // draw regular hexagon shaped hex grid with side length size
  function draw_hex_grid_hexagon(size, M_, N_) {
    // console.log('drawing hex grid in hexagon shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(2*size-1, 2*size-1, M_, N_,
      (row, col, M, N) => {
        let row_ = row - (M+1)/2 + 1,
            col_ = col - (N+1)/2 + 1
        return Math.abs(row_ + col_) < (M+1)/2
      })
  }

  // draw isosceles triangle shaped hex grid with side length size
  function draw_hex_grid_triangle(size, M_, N_) {
    // console.log('drawing hex grid in triangle shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(size, size, M_, N_, (row, col, M) => Math.abs(row+col) < M)
  }

  // draw "rectangle" shaped hex grid with height M and width N
  function draw_hex_grid_rectangle(M, N, M_, N_) {
    // console.log('drawing hex grid in rectangle shape with: '+Array.prototype.slice.call(arguments).join(', '))
    let row_pairs = Math.floor(M/2)
    for(let row = 0; row < M; row++) {
      for(let col = -row_pairs; col < N; col++) {
        let row_pair = Math.floor(row/2),
            position = row + col - row_pair - (row&1)
        if(position >= 0 && position < N) {
          draw_hex({q: N_+col, r: M_+row})
        }
      }
    }
  }

  // strokeWeight(3)
  // stroke(0)
  // draw_hex_grid_rectangle(27,23,-13,-5)
  //
  // strokeWeight(4)
  // stroke('rgb(255,0,0)')
  // draw_hex_grid_rhombus(5,5,-6,-6)
  // draw_hex_grid_hexagon(3,-6,3)
  // draw_hex_grid_triangle(5,4,-6)
  // draw_hex_grid_rectangle(5,5,4,3)
}
