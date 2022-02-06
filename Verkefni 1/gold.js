class Gold {
    constructor(x,y) {
        this.pos = {x: x, y: y};
        this.lifeSpan = randRange(200,4200);
        this.bBox = {ax: -0.05+x,  by: -0.05+y, cy: 0.05+y, dx: 0.05+x};
        this.vertices = new Float32Array([-0.05,0.05,-0.05,-0.05,
                                          0.05,0.05,0.05,-0.05]);
        this.color = vec4(1.0, 1.0, 0.0, 1.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, goldBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.DYNAMIC_DRAW);
    }

    update() {
        this.lifeSpan -= 1;
    }
    render() {
        gl.bindBuffer(gl.ARRAY_BUFFER, goldBuffer);
        gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2fv(position, flatten([this.pos.x,this.pos.y]));
        gl.uniform4fv(cLocation, flatten(this.color));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    }
}
