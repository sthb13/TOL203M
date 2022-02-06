class Level {
    constructor(x, y) {
        this.pos = {x: x, y: y};
        this.vertices = new Float32Array([-1.0, 0.05, -1.0, -0.10,
                                          1.0, 0.05, 1.0, -0.10]);
        this.color = vec4(1.0, 0.8, 0.7, 1.0);
        gl.bindBuffer(gl.ARRAY_BUFFER, levelBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.DYNAMIC_DRAW);
    }

    update(){
    }

    render() {
        gl.bindBuffer(gl.ARRAY_BUFFER, levelBuffer);
        gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2fv(position, flatten([this.pos.x, this.pos.y]));
        gl.uniform4fv(cLocation, flatten(this.color));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    }
}
