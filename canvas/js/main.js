document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    const canvas = document.querySelector("#draw");
    const clear = document.querySelector("#clear");
    const ctx = canvas.getContext("2d");

    // to make it fit all page
    //canvas.width = window.innerWidth;
    //canvas.heght = window.innerHeight;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0; // setting color
    let direction = true; // just a flag to start line width getting bigger or smaller

    // draw field
    const container = document.querySelector(".container");
    // we set dimentions to match container so it will scale correctly
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;

    // similar to photoshop 
    // ctx.globalCompositeOperation = "multiply";

    function draw(e) {
        if (!isDrawing) return; // only do the rest of the code if mouse is down

        console.log("mouse is moving: ", e);

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // setting color acording to HUE
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        //ctx.lineWidth = 10; // we can set it to hue width, so it changes also

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.closePath();

        // to make new line start from the end of the previous line
        // lastX = e.offsetX;
        // lastY = e.offsetY;
        // OR write it as
        [lastX, lastY] = [e.offsetX, e.offsetY];

        hue++; // increment color value, if it gets out of 360 range it will start from beginning 960 % 360
        if (hue >= 360) {
            hue = 0; // reset hue value when it gets to 360
        }

        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
            direction = !direction; // flip direction
        }

        if (direction) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
    }

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        // to start drawing the line from where we pressed the mouse down
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mouseout", () => isDrawing = false);

    clear.addEventListener("click", () => {
        // Store the current transformation matrix
        ctx.save();

        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Restore the transform
        ctx.restore();
        ctx.fillStyle = "white";
    });
});