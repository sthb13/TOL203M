var canvas;
var gl;


var maxNumPoints = 200;       // Hámarksfjöldi punkta sem forritið ræður við!
var index = 0;                // Númer núverandi punkts

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    // Tökum frá minnispláss í grafíkminni fyrir maxNumPoints tvívíð hnit (float er 4 bæti)
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumPoints, gl.DYNAMIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Meðhöndlun á músarsmellum
    canvas.addEventListener("mousedown", function(e){

        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

        // Reikna heimshnit músarinnar út frá skjáhnitum
        var t = vec2(2*e.offsetX/canvas.width-1, 2*(canvas.height-e.offsetY)/canvas.height-1);
        const r = 0.05;

        const ps = 3; // points in shape (3 for triangle);
        const triangle = shapePoints(t,r,ps);

        // Færa þessi hnit yfir í grafíkminni, á réttan stað
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, triangle);

        index += ps;
    } );

    canvas.addEventListener("contextmenu", function(e){
        e.preventDefault();
        // index -= 2; // delete last
        index = 0; // delete all
    })

    render();
}

function shapePoints(t,r,ps){

    const d = 2*Math.PI/ps;
    const tmp = [];
    for(let i = 1; i<=ps;i++){
        const x = r*Math.sin(d*i)+t[0];
        const y = r*Math.cos(d*i)+t[1];
        tmp.push(x,y);
    }
    const tr = new Float32Array(tmp);
    return tr;
}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, index );

    window.requestAnimFrame(render);
}
