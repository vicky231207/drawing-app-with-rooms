const socket = io();
window.onload = () => {
    socket.emit('join', ROOM_ID);
}
const c = document.querySelector('canvas');
const ctx = c.getContext('2d');
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, c.width, c.height);
addEventListener('mousemove', e => {
    let pmouseX = mouseX;
    let pmouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(mouseDown){
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(pmouseX, pmouseY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        socket.emit('draw', {pos: {mouseX, mouseY}, pPos: {pmouseX, pmouseY}, ROOM_ID});
    }
});
addEventListener('mousedown', () => mouseDown = true);
addEventListener('mouseup', () => mouseDown = false);

socket.on('draw', ({pos, pPos}) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(pPos.pmouseX, pPos.pmouseY);
    ctx.lineTo(pos.mouseX, pos.mouseY);
    ctx.stroke();
    console.log(pPos);
    console.log(pos)
});