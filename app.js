const canvas = document.querySelector("canvas");
const inputWith = document.getElementById("input-width");
const fontRange = document.getElementById("font-range");
const color = document.getElementById("color");
const ctx = canvas.getContext("2d");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const CANVAS_WIDTH = 800;
const CANVAS_HIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HIGHT;
ctx.lineWidth = inputWith.value;
ctx.font = `${fontRange.value}px sans-serif`;
ctx.lineCap = "round";
const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
];
let isFilling = false;
let isPainting = false;
function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
}

function onDestroyClick() {
  const previousColor = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
  ctx.fillStyle = previousColor;
}

function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.fillText(text, e.offsetX, e.offsetY);
  }
}

function onSaveImage() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}
function onFontSizeChange() {
  ctx.font = `${fontRange.value}px sans-serif`;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
inputWith.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("mousedown", onCanvasClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveImage);
fontRange.addEventListener("change", onFontSizeChange);
