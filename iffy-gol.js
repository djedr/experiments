board2 = board.map((row, y) => {
			let rowUp = board[y - 1];
			let rowDown = board[y + 1];
			
			if (!rowUp) {
				rowUp = row.map((c) => false);
			}
			
			if (!rowDown) {
				rowDown = row.map((c) => false);
			}
			
			return row.map((cell, x) => {
				let prev_x = x - 1;
				let next_x = x + 1;
				
				let prev_cell = row[prev_x];
				let next_cell = row[next_x];
				
				let n;
				
				if (prev_cell) {
					n += prev_cell + rowUp[prev_x] + rowDown[prev_x];
				}
				if (next_cell) {
					n += next_cell + rowUp[next_x] + rowDown[next_x];
				}
				
				n += rowUp[x] + rowDown[x];
				
				
				//console.log(n);
				
				let pixelId = (y * width * 4 + x * 4);
				
				if (cell) {
					data[pixelId] = 0;
					data[pixelId + 1] = 0;
					data[pixelId + 2] = 0;
					data[pixelId + 3] = 255;
					return should_cell_survive(n);
				} else {
					data[pixelId] = 255;
					data[pixelId + 1] = 255;
					data[pixelId + 2] = 255;
					data[pixelId + 3] = 255;
					return should_cell_be_born(n);
				}
				return false;
			});
		});
