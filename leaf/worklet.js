const randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class LeafPainter {
  static get inputProperties() { return ['--leaf-size', '--leaf-color']; }

  get leafSize() {
    return this._leafSize;
  }

  set leafSize(size) {
    this._leafSize = size;
  }

  get leafColor() {
    return this._leafColor;
  }

  set leafColor(color) {
    this._leafColor = color;
  }

  /**
   * The starting point of the vine in the canvas
   * @return {number}
   */
  get x () {
    return this.leafSize * 2;
  }

  /**
   * The distance between the border the vine grow along and the other side of the vine.
   * @return {number}
   */
  get width () {
    return this.x + this.leafSize * 2;
  }

  /**
   * vine directions
   * v>>>>>>^
   * v      ^
   * v      ^
   * v<<<<<<^
   */
  paint(ctx, geom, properties) {
    this.leafSize = parseInt(properties.get('--leaf-size')) || 16;

    // left
    this.paintVine(ctx, properties, geom.height, 0, [0, 0]);
    // top
    this.paintVine(ctx, properties, geom.width, -90, [-this.width, 0]);
    // right
    this.paintVine(ctx, properties, geom.height, -180, [-geom.width, -geom.height]);
    // bottom
    this.paintVine(ctx, properties, geom.width, -270, [geom.height - this.width, -geom.width]);
  }


  leaf(ctx, x, y, size, dir) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(dir, -0.7);
    ctx.bezierCurveTo(dir, -0.7, 0.4 * dir, -1, 0, 0);
    ctx.bezierCurveTo(0, 0, dir, 0.4, dir, -0.7);
    ctx.fill();
    ctx.restore();
  }

  vine(ctx, x, numLeaves, leafSize, length) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, length);
    ctx.stroke();
    const gap = length / numLeaves;
    let direction = 1;
    for (let i = 0; i < numLeaves; i++) {
      const r = randomInt(gap);
      this.leaf(ctx, x, gap * i + r, leafSize, direction);
      direction = -direction;
    }
  }


  paintVine(ctx, properties, length, angle, origin) {
    const numLeaves = Math.floor(length / this.leafSize) * 1.5;

    ctx.strokeStyle = properties.get('--leaf-color').toString().trim() || '#73ce8f';
    ctx.fillStyle = properties.get('--leaf-color').toString().trim() || '#73ce8f';

    ctx.save();
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(...origin);
    this.vine(ctx, this.x, numLeaves, this.leafSize, length);
    ctx.restore();
  }

}

registerPaint('leaf', LeafPainter);
