function cart(d, w) {
	var r = [];
	for(var i = 0; i < d.length; i+=w)
		r.push(d.slice(i,i+w));
	return r;
}

function JSONIF(data, canvas, config) {
	if(typeof data[0] !== "object")
		throw new Error("Image data must contain header");

	config = config || {};

	var header = data[0],
		data = data[1],

		c = canvas ? canvas : document.createElement("canvas"),
		ctx = this.ctx = c.getContext("2d"),
		
		scaler = this.scaler = config.scaler || 1;

	c.height = c.style.height = header.height * scaler;
	c.width = c.style.width = header.width * scaler;

	var pos = { x: 0, y: 0 },
		map = cart(data, header.width),
		inBorder = false;

	ctx.save();

	for(var y = 0; y < map.length; y++) {
		for(var x = 0; x < map[x].length; x++) {
			var px = map[y][x];

			ctx.fillStyle = typeof header[px] == "function" ? header[px](x, y, this) : header[px] || 'white';
			ctx.fillRect(x*scaler, y*scaler, scaler, scaler);
		}
	}
	ctx.restore();
	return c;
}

