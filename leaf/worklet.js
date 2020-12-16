const randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class LeafPainter {
  static get inputProperties() {
    return [
      '--leaf-size',
      '--leaf-color',
      '--leaf-variance'
    ];
  }

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

  get leafVariance() {
    return this._leafVariance;
  }

  set leafVariance(variance) {
    this._leafVariance = variance;
  }

  /**
   * The starting point of the vine in the canvas
   * @return {number}
   */
  get x() {
    return this.leafSize * 2;
  }

  /**
   * The distance between the border the vine grow along and the other side of the vine.
   * @return {number}
   */
  get width() {
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
    this.leafColor = (properties.get('--leaf-color') || '#73ce8f').toString().trim();
    this.leafVariance = (properties.get('--leaf-variance') || 'left').toString().trim();

    // left
    this.paintVine(ctx, properties, geom.height, 0, [0, 0]);

    if (this.leafVariance === 'around') {
      // top
      this.paintVine(ctx, properties, geom.width, -90, [-this.width, 0]);
      // // right
      this.paintVine(ctx, properties, geom.height, -180, [-geom.width, -geom.height]);
      // // bottom
      this.paintVine(ctx, properties, geom.width, -270, [geom.height - this.width, -geom.width]);
    }
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

  vine(ctx, x, numLeaves, leafSize, length, angle) {
    const isAround = this.leafVariance === 'around';

    ctx.beginPath();
    ctx.moveTo(x, isAround ? x + leafSize : 0);
    if (isAround && (Math.abs(angle) === 90 || Math.abs(angle) === 270)) { // top or bottom
      ctx.quadraticCurveTo(x, x, x - leafSize, x);
      ctx.moveTo(x, x + leafSize);
    }
    ctx.lineTo(x, isAround ? length - x - leafSize : length);
    if (isAround && (angle === 0 || Math.abs(angle) === 180)) { // left or right
      ctx.quadraticCurveTo(x, length - x, x + leafSize, length - x);
    }
    ctx.stroke();
    const gap = length / numLeaves;
    let direction = 1;
    for (let i = 0; i < numLeaves; i++) {
      const r = randomInt(gap);
      const y = gap * i + r;
      if (!isAround || (isAround && y > x && y < length - x)) {
        this.leaf(ctx, x, y, leafSize, direction);
        direction = -direction;
      }
    }
  }


  paintVine(ctx, properties, length, angle, origin) {
    const numLeaves = Math.floor(length / this.leafSize) * 1.5;

    ctx.strokeStyle = ctx.fillStyle = this.leafColor;

    ctx.save();
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(...origin);
    this.vine(ctx, this.x, numLeaves, this.leafSize, length, angle);
    ctx.restore();
  }

}

registerPaint('leaf', LeafPainter);
