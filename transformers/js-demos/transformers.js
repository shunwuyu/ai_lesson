import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0';

env.allowLocalModels = false;

const fileUpload = document.getElementById('file-upload');
const imageContainer = document.getElementById('image-container');
const status = document.getElementById("status");

status.textContent="加载模型..."
const detector = await pipeline("object-detection", "Xenova/detr-resnet-50")
status.textContent = "准备"
fileUpload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e2) {
        imageContainer.innerHTML = "";
        const image = document.createElement("img");
        image.src=e2.target.result;
        imageContainer.appendChild(image)
        detect(image)
    }
    reader.readAsDataURL(file);
})

async function detect(img) {
    status.textContent = "分析中..."
    const output = await detector(img.src, {
        threshold: 0.1,
        percentage: true
    })
    status.textContent=""
    console.log("输出", output)
    output.forEach(renderBox)
}

function renderBox({ box, label }) {
    const { xmax, xmin, ymax, ymin } = box;
    const color = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, 0)
    console.log(color)
    const boxElement = document.createElement("div")
    boxElement.className="bounding-box"
    Object.assign(boxElement.style, {
        borderColor: color,
        borderWith: '1px',
        borderStyle: 'solid',
        left: 100*xmin +"%",
        top: 100* ymin + "%",
        width: 100*(xmax-xmin) + "%",
        height: 100 * (ymax-ymin) + "%"
    })

    const labelElement = document.createElement("span")
    labelElement.textContent=label;
    labelElement.className="boundng-box-label";
    labelElement.style.backgroundColor=color

    boxElement.appendChild(labelElement)
    imageContainer.appendChild(boxElement)
}