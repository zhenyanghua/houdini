const random = (max) => Math.random() * Math.floor(max);
const randomRange = (min, max) => random(max - min) + min;

class Snowflake {
  canvasWidth;
  canvasHeight;

  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.posX = 0;
    this.posY = randomRange(-50, 0);
    this.initialAngle = random(2 * Math.PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = Math.sqrt(random(Math.pow(this.canvasWidth / 2, 2)));
  }

  display(ctx) {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialAngle;
    this.posX = this.canvasWidth / 2 + this.radius * Math.sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += Math.pow(this.size, 0.5);

    // if snowflake past end of screen, return it so the caller can deal with it.
    if (this.posY > this.canvasHeight) {
      return this;
    }
    return null;
  }
}

class SnowflakePainter {
  static get inputProperties() {
    return [
      '--animation-tick'
    ];
  }

  snowFlakes = [];
  oldFlakes = [];

  paint(ctx, geom, properties) {
    ctx.fillStyle = 'rgb(240, 240, 240)';
    const tick = parseFloat(properties.get('--animation-tick').toString()) / 1000;
    // create a random number of snowflakes each frame
    // for (let i = 0; i < random(2); i++) {
    //   this.snowFlakes.push(new Snowflake(geom.width, geom.height));
    // }
    this.snowFlakes.push(new Snowflake(geom.width, geom.height));

    for (let flake of this.snowFlakes) {
      const dropped = flake.update(tick);
      // delete snow flake after it is dropped.
      if (dropped) {
        const index = this.snowFlakes.indexOf(dropped);
        this.snowFlakes.splice(index, 1);
      }
      flake.display(ctx);
    }
    this.oldFlakes = this.snowFlakes;
  }
}

registerPaint('snowflake', SnowflakePainter);
