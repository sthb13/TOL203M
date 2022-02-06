class Mario {
    constructor(x,y) {
      this.KEY_LEFT = keyCode('A');
      this.KEY_RIGHT = keyCode('D');
      this.KEY_JUMP = keyCode('W');

      this.state = STATE.RUNNING;
      this.direction = DIRECTION.RIGHT;

      this.pos = {x: x, y: y};
      this.vel = {x:VELX, y:VELY};
      this.vertices = new Float32Array(MARIO.RIGHT);
      this.color = vec4(0.1, 0.1, 0.9, 1.0);

      gl.bindBuffer(gl.ARRAY_BUFFER, marioBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
  }

    move(dir){
        switch(dir){
        case DIRECTION.RIGHT:
            this.vertices = MARIO.RIGHT;
            this.direction = DIRECTION.RIGHT;
            if(this.pos.x > 1) return;
            this.pos.x += this.vel.x;
            break;
        case DIRECTION.LEFT:
            this.vertices = MARIO.LEFT;
            this.direction = DIRECTION.LEFT;
            if(this.pos.x < -1) return;
            this.pos.x -= this.vel.x;
            break;
        }
    }

    jump(dir){
        if(this.pos.y < GROUNDPOS){
            this.pos.y = GROUNDPOS;
            this.state = STATE.RUNNING;
            this.vel.y = VELY;
            return;
        }
        this.state = STATE.JUMPING;
        this.vel.y -= GRAVITY;
        this.pos.y += this.vel.y;
        this.move(dir);
    }

    update(){
       if(this.state === STATE.RUNNING){
          if(keys[this.KEY_LEFT]) this.move(DIRECTION.LEFT);
          if(keys[this.KEY_RIGHT]) this.move(DIRECTION.RIGHT);
           if(keys[this.KEY_JUMP]) this.jump(this.direction);
       } else {
           this.jump(this.direction);
       }

  }

  render(){
      gl.bindBuffer(gl.ARRAY_BUFFER, marioBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
      gl.uniform2fv(position, flatten([this.pos.x,this.pos.y]));
      gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(cLocation, flatten(this.color));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
