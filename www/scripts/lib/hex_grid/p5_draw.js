define(['hex_grid/hex_p5_draw'],
function(hex_p5_draw) {
  const draw_hex = hex_p5_draw.draw_hex
  // draw an MxN hex grid in specified p5 sketch
  // with offset <M_,N_> in axial coordinates
  // where condition(m,n) is satisfied for a hex at <m,n>
  function draw_hex_grid(sketch, M, N, M_, N_, condition) {
    console.log('drawing hex grid with: '+Array.prototype.slice.call(arguments).join(', '))
    for(let row = 0; row < M; row++) {
      for(let col = 0; col < N; col++) {
        if(condition(row, col, M, N)) draw_hex(sketch, {q: N_+col, r: M_+row})
      }
    }
  }
  // draw rhombus shaped hex grid with height M and width N
  function draw_hex_grid_rhombus(sketch, M, N, M_, N_) {
    // console.log('drawing hex grid in rhombus shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(sketch, M, N, M_, N_, () => true)
  }
  // draw regular hexagon shaped hex grid with side length size
  function draw_hex_grid_hexagon(sketch, size, M_, N_) {
    // console.log('drawing hex grid in hexagon shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(sketch, 2*size-1, 2*size-1, M_, N_,
      (row, col, M, N) => {
        let row_ = row - (M+1)/2 + 1,
            col_ = col - (N+1)/2 + 1
        return Math.abs(row_ + col_) < (M+1)/2
      })
  }
  // draw isosceles triangle shaped hex grid with side length size
  function draw_hex_grid_triangle(sketch, size, M_, N_) {
    // console.log('drawing hex grid in triangle shape with: '+Array.prototype.slice.call(arguments).join(', '))
    draw_hex_grid(sketch, size, size, M_, N_, (row, col, M) => Math.abs(row+col) < M)
  }
  // special case for drawing rectangle, can't figure out how to use condition
  // draw "rectangle" shaped hex grid with height M and width N
  function draw_hex_grid_rectangle(sketch, M, N, M_, N_) {
    // console.log('drawing hex grid in rectangle shape with: '+Array.prototype.slice.call(arguments).join(', '))
    let row_pairs = Math.floor(M/2)
    for(let row = 0; row < M; row++) {
      for(let col = -row_pairs; col < N; col++) {
        let row_pair = Math.floor(row/2),
            position = row + col - row_pair - (row&1)
        if(position >= 0 && position < N) {
          draw_hex(sketch, {q: N_+col, r: M_+row})
        }
      }
    }
  }

  return {
    draw_hex_grid,
    draw_hex_grid_rhombus,
    draw_hex_grid_hexagon,
    draw_hex_grid_triangle,
    draw_hex_grid_rectangle
  }
});
