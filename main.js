document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var strokes = [];

    //apertar o mouse
    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    });

    //mover o mouse
    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    });

    //soltar o mouse
    canvas.addEventListener('mouseup', function () {
        if (drawing) {
            drawing = false;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    });

    //função limpar
    document.getElementById('clear-button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
    });

    //função para fazer download
    document.getElementById('download-button').addEventListener('click', function () {
        var dataURL = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });
});