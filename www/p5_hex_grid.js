// canvas pixel coordinates are pairs (2 element arrays)
// with x = pair[0] and y = pair[1]
// axial coordinates are objects with properties q and r

const HEX_SIZE     = 100,
      HEX_HEIGHT   = HEX_SIZE * 2,
      HEX_WIDTH    = HEX_HEIGHT * Math.sqrt(3)/2,
      // Axial coordinate system origin in Cartesian coordinates
      AXIAL_ORIGIN = [0, 0],
      // Axial coordinate basis vectors in Cartesian coordinates,
      // where q = +x and r = +z in cube coordinates
      AXIAL_BASIS  = {
        q: [HEX_WIDTH,   0],
        r: [HEX_WIDTH/2, HEX_HEIGHT * 3/4]
      }

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
  ellipse(...AXIAL_ORIGIN, 25)

  function draw_hex(hex_axial_coordinates) {
    var center = hex_axial_to_pixel(hex_axial_coordinates)
    beginShape()
    for(let i=0; i<6; i++) {
      vertex(...hex_corner(center, HEX_SIZE, i))
    }
    endShape(CLOSE)
  }
  // draw_hex({q:0,r:0})
  // draw_hex({q:0,r:1})

  // function draw_hex_grid(cols, rows) {
    var N = 3
    for(let row = 0; row < N; row++) {
      for(let col = 0; col < N; col++) {
        if(row + col < N) draw_hex({q: col, r: row})
      }
    }
  // }
  // draw_hex_grid()
}
