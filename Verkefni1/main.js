"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

let canvas;
let gl;

let keys = [];
let program;

let position;
let cLocation;
let pLocation;

let levelBuffer;
let marioBuffer;
let goldBuffer;
let monsterBuffer;

let gameManager;

const VELX = 0.012;
const VELY = 0.07;
const GRAVITY = 0.003;
const GROUNDPOS = -0.65;
const GROUNDTHICK = 0.10;
const MARIO = {
    RIGHT: [-0.1, 0.2, -0.1, -0.2, 0.1, 0,0],
    LEFT:  [-0.1, 0.0, 0.1, -0.2, 0.1, 0.2]
};
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1
};
const STATE = {
    RUNNING: 0,
    JUMPING: 1
};

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3, 0.8, 0.9, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    position = gl.getUniformLocation(program, "p");
    cLocation = gl.getUniformLocation(program, "vColor");
    pLocation = gl.getAttribLocation(program, "vPosition");

    marioBuffer = gl.createBuffer();
    levelBuffer = gl.createBuffer();
    goldBuffer = gl.createBuffer();
    monsterBuffer = gl.createBuffer();

    gl.enableVertexAttribArray(pLocation);
    gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, false, 0, 0);

    gameManager = new GameManager();
    gameManager.init();

    window.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });

    updateSimulation();
}

function updateSimulation() {

    gameManager.update();
    gameManager.render();

    window.requestAnimFrame(updateSimulation);
}

//helper functions
function randRange(min, max) {
    return (min + Math.random() * (max - min));
}

function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}
