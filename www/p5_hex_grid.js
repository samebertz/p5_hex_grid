const SEAMSEALER = 0.0,
      HEX_SIZE = 100

function setup() {
  // put setup code here
  // let container = document.getElementById('p5canvas_wrapper')
  // var cnv = createCanvas()
  // cnv.parent(container)
  // resizeCanvas(container.width - 16, windowHeight - 10)
  var cnv = createCanvas(HEX_SIZE*3/2*6.5 + 10, HEX_SIZE*11 - 35)
  // cnv.style('border: 1px solid #000;')
  background(255)
  // noStroke()
  noFill()
  noLoop()
}

function draw() {
  // put drawing code here
  function hex_center(coord, size) {
    let height = size*2, width = height*Math.sqrt(3)/2
    return {
      x: HEX_SIZE + width*coord[0],
      y: HEX_SIZE + 3/2*height*coord[1] + 10
    }
  }
  function hex_corner(center, size, i) {
    let angle = (i * 60 + 30) * Math.PI / 180
    return [center.x + size*Math.cos(angle),
            center.y + size*Math.sin(angle)]
  }
  function hex(coord, size, hl=false) {
    let center = hex_center(coord, size)
    beginShape()
    for(let i=0; i<6; i++) {
      vertex(...hex_corner(center, size, i))
    }
    endShape(CLOSE)
    // translate(center.x, center.y)
    // if(hl) {fill(hl)} else {fill(200)}
    // translate(-center.x, -center.y)
  }
  function hex_grid(cols, rows) {
    let height = HEX_SIZE * 2,
        width = height * Math.sqrt(3)/2
    for(let col = 0; col < cols; col++) {
      for(let row = 0; row < rows; row++) {
        hex([col, row], HEX_SIZE)
      }
    }
  }
  hex_grid(5, 3)
}
