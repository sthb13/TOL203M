class Monster {
    constructor(dir) {
        this.pos = {x: dir ? -1 : 1, y: -0.8};
        this.dir = dir;
        this.velX = randRange(0.004,0.007);
        this.bBox = {ax: -0.04+this.pos.x,  by: -0.06+this.pos.y, cy: 0.06+this.pos.y, dx: 0.04+this.pos.x};
        this.vertices = new Float32Array([-0.08,0.06,-0.08,-0.06,
                                          0.08,0.06,0.08,-0.06]);
        this.color = vec4(0.9, 0.1, 0.1, 1.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, monsterBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
    }

    update() {
        if(this.dir === DIRECTION.LEFT) this.pos.x -= this.velX;
        if(this.dir === DIRECTION.RIGHT) this.pos.x += this.velX;
        this.bBox = {ax: -0.04+this.pos.x,  by: -0.06+this.pos.y, cy: 0.06+this.pos.y, dx: 0.04+this.pos.x};
    }
    render() {
        gl.bindBuffer(gl.ARRAY_BUFFER, monsterBuffer);
        gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2fv(position, flatten([this.pos.x,this.pos.y]));
        gl.uniform4fv(cLocation, flatten(this.color));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    }
}
