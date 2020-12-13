const randomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class LeafPainter {
  static get inputProperties() { return ['--leaf-size', '--leaf-color']; }

  paint(ctx, geom, properties) {
    const leafSize = parseInt(properties.get('--leaf-size')) || 16;
    const numLeaves = Math.floor(geom.height / leafSize) * 1.5;
    const x = leafSize * 2 + 1;

    ctx.strokeStyle = properties.get('--leaf-color') || black;
    ctx.fillStyle = properties.get('--leaf-color') || black;
    this.vine(ctx, geom, x, numLeaves, leafSize);
  }

  leaf(ctx, x, y, size, dir) {
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(dir, -0.7);
    ctx.bezierCurveTo(dir, -0.7, 0.4 * dir, -1, 0, 0);
    ctx.bezierCurveTo(0, 0, dir, 0.4, dir, -0.7);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fill();
  }

  vine(ctx, geom, x, numLeaves, leafSize) {
    const width = geom.width;
    const height = geom.height;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
    const gap = height / numLeaves;
    let direction = 1;
    for (let i = 0; i < numLeaves; i++) {
      const r = randomInt(gap);
      this.leaf(ctx, x, gap * i + r, leafSize, direction);
      direction = -direction;
    }
  }
}

registerPaint('leaf', LeafPainter);
