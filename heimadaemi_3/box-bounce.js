/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Ferningur skoppar um gluggann.  Notandi getur breytt
//     hraðanum með upp/niður örvum.
//
//    Hjálmtýr Hafsteinsson, janúar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// Núverandi staðsetning miðju ferningsins
var box = vec2( 0.0, 0.0 );

// Stefna (og hraði) fernings
var dX;
var dY;

// Svæðið er frá -maxX til maxX og -maxY til maxY
var maxX = 1.0;
var maxY = 1.0;

// Hálf breidd/hæð ferningsins
var boxRad = 0.05;

// Ferningurinn er upphaflega í miðjunni
var vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);

// Kvörðunarstærð 
var scale = 1;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    // Gefa ferningnum slembistefnu í upphafi
    dX = Math.random()*0.1-0.05;
    dY = Math.random()*0.1-0.05;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    locBox = gl.getUniformLocation( program, "boxPos" );
    locScale =gl.getUniformLocation( program, "boxScale" );


    // Meðhöndlun örvalykla
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 37: // vinstri ör
                if(dX<-0.07) return;
                dX -= 0.005;
                break;
            case 39: // hægri ör
                if(dX>0.07) return;
                dX += 0.005;
                break;
            case 38:	// upp ör
                if(scale>10) return;
                scale *= 1.06;
                break;
            case 40:	// niður ör
                if(scale<0.2) return;
                scale /=1.06;
                break;
        }
    } );

    render();
}


function render() {
    // Lát ferninginn skoppa af veggjunum
    if (Math.abs(box[0] + dX) > maxX - boxRad * scale) dX = -dX;
    if (Math.abs(box[1] + dY) > maxY - boxRad * scale) dY = -dY;

    // Uppfæra staðsetningu
    box[0] += dX;
    box[1] += dY;

    // Uppfæra stærð
    vertices = new Float32Array([-0.05*scale, -0.05*scale, 0.05*scale, -0.05*scale, 0.05*scale, 0.05*scale, -0.05*scale, 0.05*scale]);

    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform2fv( locBox, flatten(box) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

    window.requestAnimFrame(render);
}
