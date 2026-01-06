// ========================================
// IMAGE PROCESSOR
// Berisi semua fungsi untuk manipulasi gambar
// ========================================

/**
 * Load image dari file input ke canvas
 * @param {HTMLInputElement} fileInput - Input element untuk file
 * @param {string} canvasId - ID dari canvas element
 */
function loadImage(fileInput, canvasId) {
    const file = fileInput.files[0];
    if (!file) return;

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Simpan gambar original untuk reset
        window.originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        window.originalWidth = canvas.width;
        window.originalHeight = canvas.height;
    };

    img.src = URL.createObjectURL(file);
}

/**
 * Rotasi gambar 90 derajat searah jarum jam
 * @param {string} canvasId - ID dari canvas element
 */
function rotate(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    // Canvas baru untuk menyimpan hasil rotasi
    const newCanvas = document.createElement("canvas");
    newCanvas.width = height;
    newCanvas.height = width;
    const newCtx = newCanvas.getContext("2d");
    const newImgData = newCtx.createImageData(height, width);

    // Loop untuk setiap pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Index pixel source (gambar original)
            const srcIndex = (y * width + x) * 4;

            // Koordinat baru setelah rotasi 90°
            const nx = height - 1 - y;
            const ny = x;
            const dstIndex = (ny * height + nx) * 4;

            // Copy RGBA values
            newImgData.data[dstIndex] = imgData.data[srcIndex];         // R
            newImgData.data[dstIndex + 1] = imgData.data[srcIndex + 1]; // G
            newImgData.data[dstIndex + 2] = imgData.data[srcIndex + 2]; // B
            newImgData.data[dstIndex + 3] = imgData.data[srcIndex + 3]; // A
        }
    }

    // Update canvas dengan hasil rotasi
    canvas.width = newCanvas.width;
    canvas.height = newCanvas.height;
    ctx.putImageData(newImgData, 0, 0);
}

/**
 * Rotasi gambar 180 derajat
 * @param {string} canvasId - ID dari canvas element
 */
function rotate180(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const newImgData = ctx.createImageData(width, height);

    // Loop untuk setiap pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + x) * 4;

            // Koordinat baru setelah rotasi 180°
            const nx = width - 1 - x;
            const ny = height - 1 - y;
            const dstIndex = (ny * width + nx) * 4;

            // Copy RGBA values
            newImgData.data[dstIndex] = imgData.data[srcIndex];
            newImgData.data[dstIndex + 1] = imgData.data[srcIndex + 1];
            newImgData.data[dstIndex + 2] = imgData.data[srcIndex + 2];
            newImgData.data[dstIndex + 3] = imgData.data[srcIndex + 3];
        }
    }

    ctx.putImageData(newImgData, 0, 0);
}

/**
 * Rotasi gambar 270 derajat searah jarum jam (atau 90° berlawanan)
 * @param {string} canvasId - ID dari canvas element
 */
function rotate270(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;

    // Canvas baru untuk menyimpan hasil rotasi
    const newCanvas = document.createElement("canvas");
    newCanvas.width = height;
    newCanvas.height = width;
    const newCtx = newCanvas.getContext("2d");
    const newImgData = newCtx.createImageData(height, width);

    // Loop untuk setiap pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + x) * 4;

            // Koordinat baru setelah rotasi 270°
            const nx = y;
            const ny = width - 1 - x;
            const dstIndex = (ny * height + nx) * 4;

            // Copy RGBA values
            newImgData.data[dstIndex] = imgData.data[srcIndex];
            newImgData.data[dstIndex + 1] = imgData.data[srcIndex + 1];
            newImgData.data[dstIndex + 2] = imgData.data[srcIndex + 2];
            newImgData.data[dstIndex + 3] = imgData.data[srcIndex + 3];
        }
    }

    // Update canvas dengan hasil rotasi
    canvas.width = newCanvas.width;
    canvas.height = newCanvas.height;
    ctx.putImageData(newImgData, 0, 0);
}

/**
 * Flip gambar secara vertikal (atas-bawah)
 * @param {string} canvasId - ID dari canvas element
 */
function flipVertical(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const newImgData = ctx.createImageData(width, height);

    // Loop untuk setiap pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + x) * 4;

            // Koordinat baru setelah flip vertical
            const nx = x;
            const ny = height - 1 - y;
            const dstIndex = (ny * width + nx) * 4;

            // Copy RGBA values
            newImgData.data[dstIndex] = imgData.data[srcIndex];
            newImgData.data[dstIndex + 1] = imgData.data[srcIndex + 1];
            newImgData.data[dstIndex + 2] = imgData.data[srcIndex + 2];
            newImgData.data[dstIndex + 3] = imgData.data[srcIndex + 3];
        }
    }

    ctx.putImageData(newImgData, 0, 0);
}

/**
 * Flip gambar secara horizontal (kiri-kanan)
 * @param {string} canvasId - ID dari canvas element
 */
function flipHorizontal(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const newImgData = ctx.createImageData(width, height);

    // Loop untuk setiap pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + x) * 4;

            // Koordinat baru setelah flip horizontal
            const nx = width - 1 - x;
            const ny = y;
            const dstIndex = (ny * width + nx) * 4;

            // Copy RGBA values
            newImgData.data[dstIndex] = imgData.data[srcIndex];
            newImgData.data[dstIndex + 1] = imgData.data[srcIndex + 1];
            newImgData.data[dstIndex + 2] = imgData.data[srcIndex + 2];
            newImgData.data[dstIndex + 3] = imgData.data[srcIndex + 3];
        }
    }

    ctx.putImageData(newImgData, 0, 0);
}

/**
 * Rotasi gambar dengan sudut custom menggunakan Canvas transform
 * Lebih efisien daripada manipulasi pixel manual untuk rotasi bebas
 * @param {string} canvasId - ID dari canvas element
 * @param {number} degrees - Sudut rotasi dalam derajat
 */
function rotateFree(canvasId, degrees) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Simpan image data sebelum rotasi
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Buat temporary canvas untuk menyimpan gambar original
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(imgData, 0, 0);

    // Convert degrees ke radians
    const radians = (degrees * Math.PI) / 180;

    // Hitung ukuran canvas baru yang cukup untuk menampung gambar hasil rotasi
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = Math.ceil(canvas.width * cos + canvas.height * sin);
    const newHeight = Math.ceil(canvas.width * sin + canvas.height * cos);

    // Set ukuran canvas baru
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Pindahkan origin ke center canvas
    ctx.translate(newWidth / 2, newHeight / 2);

    // Rotasi
    ctx.rotate(radians);

    // Gambar image dengan center sebagai anchor point
    ctx.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);

    // Reset transformasi
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// ========================================
// COLOR ADJUSTMENT FUNCTIONS
// ========================================

/**
 * Adjust RGB channels
 * @param {string} canvasId - ID dari canvas element
 * @param {number} r - Red adjustment (-255 to 255)
 * @param {number} g - Green adjustment (-255 to 255)
 * @param {number} b - Blue adjustment (-255 to 255)
 */
function adjustRGB(canvasId, r, g, b) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Loop setiap pixel
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, data[i] + r));       // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + g)); // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + b)); // Blue
        // Alpha (i + 3) tidak diubah
    }

    ctx.putImageData(imgData, 0, 0);
}

/**
 * Adjust HSV (Hue, Saturation, Value)
 * @param {string} canvasId - ID dari canvas element
 * @param {number} h - Hue adjustment (-180 to 180 degrees)
 * @param {number} s - Saturation adjustment (-100 to 100 percent)
 * @param {number} v - Value adjustment (-100 to 100 percent)
 */
function adjustHSV(canvasId, h, s, v) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert adjustment dari percent ke decimal
    const satAdjust = s / 100;
    const valAdjust = v / 100;

    for (let i = 0; i < data.length; i += 4) {
        // Convert RGB ke HSV
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let hue, sat, val = max;
        let d = max - min;

        sat = max === 0 ? 0 : d / max;

        if (max === min) {
            hue = 0;
        } else {
            switch (max) {
                case r: hue = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: hue = ((b - r) / d + 2) / 6; break;
                case b: hue = ((r - g) / d + 4) / 6; break;
            }
        }

        // Apply adjustments
        hue = (hue + h / 360) % 1;
        if (hue < 0) hue += 1;
        sat = Math.max(0, Math.min(1, sat + satAdjust));
        val = Math.max(0, Math.min(1, val + valAdjust));

        // Convert HSV kembali ke RGB
        let i_h = Math.floor(hue * 6);
        let f = hue * 6 - i_h;
        let p = val * (1 - sat);
        let q = val * (1 - f * sat);
        let t = val * (1 - (1 - f) * sat);

        switch (i_h % 6) {
            case 0: r = val; g = t; b = p; break;
            case 1: r = q; g = val; b = p; break;
            case 2: r = p; g = val; b = t; break;
            case 3: r = p; g = q; b = val; break;
            case 4: r = t; g = p; b = val; break;
            case 5: r = val; g = p; b = q; break;
        }

        data[i] = Math.round(r * 255);
        data[i + 1] = Math.round(g * 255);
        data[i + 2] = Math.round(b * 255);
    }

    ctx.putImageData(imgData, 0, 0);
}

/**
 * Adjust CMYK channels
 * @param {string} canvasId - ID dari canvas element
 * @param {number} c - Cyan adjustment (-100 to 100)
 * @param {number} m - Magenta adjustment (-100 to 100)
 * @param {number} y - Yellow adjustment (-100 to 100)
 * @param {number} k - Black adjustment (-100 to 100)
 */
function adjustCMYK(canvasId, c, m, y, k) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert percent ke decimal
    const cAdj = c / 100;
    const mAdj = m / 100;
    const yAdj = y / 100;
    const kAdj = k / 100;

    for (let i = 0; i < data.length; i += 4) {
        // Convert RGB ke CMYK
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        let black = 1 - Math.max(r, g, b);
        let cyan = (1 - r - black) / (1 - black) || 0;
        let magenta = (1 - g - black) / (1 - black) || 0;
        let yellow = (1 - b - black) / (1 - black) || 0;

        // Apply adjustments
        cyan = Math.max(0, Math.min(1, cyan + cAdj));
        magenta = Math.max(0, Math.min(1, magenta + mAdj));
        yellow = Math.max(0, Math.min(1, yellow + yAdj));
        black = Math.max(0, Math.min(1, black + kAdj));

        // Convert kembali ke RGB
        r = 255 * (1 - cyan) * (1 - black);
        g = 255 * (1 - magenta) * (1 - black);
        b = 255 * (1 - yellow) * (1 - black);

        data[i] = Math.round(r);
        data[i + 1] = Math.round(g);
        data[i + 2] = Math.round(b);
    }

    ctx.putImageData(imgData, 0, 0);
}

/**
 * Adjust YIQ channels
 * @param {string} canvasId - ID dari canvas element
 * @param {number} yAdj - Y adjustment (-100 to 100)
 * @param {number} iAdj - I adjustment (-100 to 100)
 * @param {number} qAdj - Q adjustment (-100 to 100)
 */
function adjustYIQ(canvasId, yAdj, iAdj, qAdj) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert percent ke decimal
    const yAdjust = yAdj / 100;
    const iAdjust = iAdj / 100;
    const qAdjust = qAdj / 100;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        // Convert RGB ke YIQ
        let y = 0.299 * r + 0.587 * g + 0.114 * b;
        let inPhase = 0.596 * r - 0.275 * g - 0.321 * b;
        let quad = 0.212 * r - 0.523 * g + 0.311 * b;

        // Apply adjustments
        y = Math.max(0, Math.min(1, y + yAdjust));
        inPhase = Math.max(-0.5957, Math.min(0.5957, inPhase + iAdjust));
        quad = Math.max(-0.5226, Math.min(0.5226, quad + qAdjust));

        // Convert kembali ke RGB
        r = y + 0.956 * inPhase + 0.621 * quad;
        g = y - 0.272 * inPhase - 0.647 * quad;
        b = y - 1.106 * inPhase + 1.703 * quad;

        data[i] = Math.round(Math.max(0, Math.min(255, r * 255)));
        data[i + 1] = Math.round(Math.max(0, Math.min(255, g * 255)));
        data[i + 2] = Math.round(Math.max(0, Math.min(255, b * 255)));
    }

    ctx.putImageData(imgData, 0, 0);
}