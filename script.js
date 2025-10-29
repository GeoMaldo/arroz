const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const processBtn = document.getElementById("processBtn");

let selectedImage = null;

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    selectedImage = file;
    preview.src = URL.createObjectURL(file);
});

processBtn.addEventListener("click", () => {
    if (!selectedImage) {
        alert("Selecciona una imagen primero");
        return;
    }

    result.textContent = "Procesando... ⏳";

    Tesseract.recognize(selectedImage, "spa", {
        logger: (m) => {
            result.textContent = "Procesando OCR: " + Math.round(m.progress * 100) + "%";
        }
    }).then(({ data: { text } }) => {
        result.textContent = text;
    });
});
