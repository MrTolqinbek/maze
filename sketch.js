const w = 400;
const h = 400;
const cells = 20;
const gap = w / cells;
const grid = [];
class Wall {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
    this.visited = false;
  }
  show() {
    if (this.visited) {
      noStroke();
      fill(200, 202, 20);
      rect(this.i * gap, this.j * gap, gap, gap);
    }
    strokeWeight(1);
    stroke(200, 100, 20);
    if (this.top) {
      line(this.i * gap, this.j * gap, this.i * gap + gap, this.j * gap);
    }
    if (this.bottom) {
      line(
        this.i * gap,
        this.j * gap + gap,
        this.i * gap + gap,
        this.j * gap + gap
      );
    }
    if (this.left) {
      line(this.i * gap, this.j * gap, this.i * gap, this.j * gap + gap);
    }
    if (this.right) {
      line(
        this.i * gap + gap,
        this.j * gap,
        this.i * gap + gap,
        this.j * gap + gap
      );
    }
  }
  getNeighbors(grid) {
    const neighs = [];
    if (
      this.i + 1 >= 0 &&
      this.i + 1 < cells &&
      this.j >= 0 &&
      this.j < cells &&
      !grid[this.i + 1][this.j].visited
    ) {
      neighs.push(grid[this.i + 1][this.j]);
    }
    if (
      this.i >= 0 &&
      this.i < cells &&
      this.j + 1 >= 0 &&
      this.j + 1 < cells &&
      !grid[this.i][this.j + 1].visited
    ) {
      neighs.push(grid[this.i][this.j + 1]);
    }
    if (
      this.i - 1 >= 0 &&
      this.i - 1 < cells &&
      this.j >= 0 &&
      this.j < cells &&
      !grid[this.i - 1][this.j].visited
    ) {
      neighs.push(grid[this.i - 1][this.j]);
    }
    if (
      this.i >= 0 &&
      this.i < cells &&
      this.j - 1 >= 0 &&
      this.j - 1 < cells &&
      !grid[this.i][this.j - 1].visited
    ) {
      neighs.push(grid[this.i][this.j - 1]);
    }
    return neighs;
  }
}
const path = [];
function setup() {
  createCanvas(w, h);
  for (let i = 0; i < cells; i++) {
    const gri = [];
    for (let j = 0; j < cells; j++) {
      gri.push(new Wall(i, j));
    }
    grid.push(gri);
  }
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      grid[i][j].show();
    }
  }
  path.push(grid[0][0]);
}
let finished = false
function draw() {
  if (!finished) {
    background(255);
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        grid[i][j].show();
      }
    }
    if (path.length > 0) {
      const a = path[path.length - 1];
      const neighbors = a.getNeighbors(grid);
      a.visited = true;
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      if (next) {
        let dx = next.i - a.i;
        let dy = next.j - a.j;
        if (dy == 1) {
          a.bottom = false;
          next.top = false;
        }
        if (dy == -1) {
          a.top = false;
          next.bottom = false;
        }
        if (dx == 1) {
          a.right = false;
          next.left = false;
        }
        if (dx == -1) {
          a.left = false;
          next.right = false;
        }
        path.push(next);
      } else {
        if (path.length > 0) {
          path.pop();
        } else {
          console.log("finished");
          finished = true
          noLoop();
        }
      }
      
    }
    else{
      finished =true
      noLoop()
    }
  } else {
    noLoop();
  }
}
