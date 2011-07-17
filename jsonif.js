function cart(d, w) {
	var r = [];
	for(var i = 0; i < d.length; i+=w)
		r.push(d.slice(i,i+w));
	return r;
}

function JSONIF(data, canvas) {
	if(typeof data[0] !== "object")
		throw new Error("Image data must contain header");

	this.header = data[0];
	this.data = data[1];
	var	c = canvas ? canvas : document.createElement("canvas"),
		ctx = c.getContext("2d");
	this.ctx = ctx;

	// c.height = c.style.height = header.height;
	// c.width = c.style.width = header.width;

	var pos = { x: 0, y: 0 },
		map = cart(this.data, this.header.width),
		borderMap = [],
		inBorder = false;

}

JSONIF.prototype = {
	draw: function(ctx) {

		var pos = { x: 0, y: 0 },
			map = cart(this.data, this.header.width),
			borderMap = [],
			inBorder = false;

		for(var y = 0; y < map.length; y++) {
			for(var x = 0; x < map[x].length; x++) {
				var px = map[y][x];

				if(!borderMap[y])
					borderMap[y] = [];

				if(px === 0) {
					if(inBorder) {
						borderMap[y][x - 1] = 1;
						borderMap[y][x] = 0;
					} else {
						borderMap[y][x] = 0;
					}

					if(inBorder)
						inBorder = !inBorder;
				} else if(inBorder && borderMap[y][x] && (borderMap[y-1][x] === 0 || map[y+1][x] === 0)) {
					borderMap[y][x] = 1;
				} else {
					borderMap[y][x] = inBorder ? 2 : 1;
					inBorder = true;
				}

				ctx.fillStyle = typeof this.header[px] == "function" ? this.header[px]() : this.header[px] || 'white';
				ctx.fillRect(x, y, 1,1);

				/* if(borderMap[y][x] == 1) { */
				/* 	ctx.fillStyle = 'green'; */
				/* 	ctx.fillRect(x, y, 1, 1); */
				/* } */

				/* if(borderMap[y][x-1] == 1) { */
				/* 	ctx.fillStyle = 'green'; */
				/* 	ctx.fillRect(x-1, y, 1, 1); */
				/* } */

				/* ct	x.fillStyle = 'red'; */
				/* ctx.fillRect(header.center.x, header.center.y, 1,1); */
			}
		}
		c.borderMap = borderMap;
		return c;
	}
};
