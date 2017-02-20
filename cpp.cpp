#define hex32(a, b, c, d) (0x ## a ## b ## c ## d)

hex32(f0,00,00,00);
hex32(0f,00,00,00);

#define lit(x) x

#define for_each_cell(cell, board, cb) BoardPool* boards = board->pool; for (int i = 0; i < boards->width * boards->height; ++i) { \
  unit* cell = &(boards->cells[i]); \
  cb }

for_each_cell(xcell, board, {
	uint live_neighbour_count = mark_live_neighbours_at(board, xcell);
})
