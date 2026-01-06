// ========================================
// MAIN APPLICATION LOGIC
// Koordinasi antara UI dan Image Processor
// ========================================

// Event listener ketika DOM sudah loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

/**
 * Inisialisasi aplikasi
 */
function initializeApp() {
    const imageInput = document.getElementById('imageInput');

    // Event listener untuk upload gambar
    imageInput.addEventListener('change', function () {
        loadImage(imageInput, 'mainCanvas');
        showWorkspace();
    });
}

/**
 * Tampilkan workspace (canvas + sidebar) setelah gambar di-upload
 */
function showWorkspace() {
    const workspace = document.getElementById('workspaceSection');
    workspace.style.display = 'flex';

    // Smooth scroll ke workspace
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Rotasi dengan sudut custom dari slider
 */
function rotateCustom() {
    const angleInput = document.getElementById('customAngle');
    const angle = parseFloat(angleInput.value);

    // Validasi input
    if (isNaN(angle)) {
        alert('⚠️ Masukkan angka yang valid untuk sudut rotasi!');
        return;
    }

    if (angle === 0) {
        alert('ℹ️ Sudut 0 derajat tidak mengubah gambar.');
        return;
    }

    // Terapkan rotasi
    rotateFree('mainCanvas', angle);

    // Reset slider ke 0
    angleInput.value = 0;
    updateAngleDisplay(0);
}

/**
 * Update display value dari slider
 * @param {number} value - Nilai dari slider
 */
function updateAngleDisplay(value) {
    const angleDisplay = document.getElementById('angleValue');
    angleDisplay.textContent = value + '°';
}

/**
 * Update display value untuk color sliders
 * @param {string} sliderId - ID dari slider
 * @param {string} displayId - ID dari display element
 */
function updateColorValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    display.textContent = slider.value;
}

/**
 * Apply RGB adjustment
 */
function applyRGB() {
    const r = parseInt(document.getElementById('rgbR').value);
    const g = parseInt(document.getElementById('rgbG').value);
    const b = parseInt(document.getElementById('rgbB').value);

    adjustRGB('mainCanvas', r, g, b);
}

/**
 * Apply HSV adjustment
 */
function applyHSV() {
    const h = parseInt(document.getElementById('hsvH').value);
    const s = parseInt(document.getElementById('hsvS').value);
    const v = parseInt(document.getElementById('hsvV').value);

    adjustHSV('mainCanvas', h, s, v);
}

/**
 * Apply CMYK adjustment
 */
function applyCMYK() {
    const c = parseInt(document.getElementById('cmykC').value);
    const m = parseInt(document.getElementById('cmykM').value);
    const y = parseInt(document.getElementById('cmykY').value);
    const k = parseInt(document.getElementById('cmykK').value);

    adjustCMYK('mainCanvas', c, m, y, k);
}

/**
 * Apply YIQ adjustment
 */
function applyYIQ() {
    const y = parseInt(document.getElementById('yiqY').value);
    const i = parseInt(document.getElementById('yiqI').value);
    const q = parseInt(document.getElementById('yiqQ').value);

    adjustYIQ('mainCanvas', y, i, q);
}

/**
 * Reset semua color sliders ke 0
 */
function resetColorSliders() {
    // RGB
    document.getElementById('rgbR').value = 0;
    document.getElementById('rgbG').value = 0;
    document.getElementById('rgbB').value = 0;
    document.getElementById('rgbRValue').textContent = '0';
    document.getElementById('rgbGValue').textContent = '0';
    document.getElementById('rgbBValue').textContent = '0';

    // HSV
    document.getElementById('hsvH').value = 0;
    document.getElementById('hsvS').value = 0;
    document.getElementById('hsvV').value = 0;
    document.getElementById('hsvHValue').textContent = '0';
    document.getElementById('hsvSValue').textContent = '0';
    document.getElementById('hsvVValue').textContent = '0';

    // CMYK
    document.getElementById('cmykC').value = 0;
    document.getElementById('cmykM').value = 0;
    document.getElementById('cmykY').value = 0;
    document.getElementById('cmykK').value = 0;
    document.getElementById('cmykCValue').textContent = '0';
    document.getElementById('cmykMValue').textContent = '0';
    document.getElementById('cmykYValue').textContent = '0';
    document.getElementById('cmykKValue').textContent = '0';

    // YIQ
    document.getElementById('yiqY').value = 0;
    document.getElementById('yiqI').value = 0;
    document.getElementById('yiqQ').value = 0;
    document.getElementById('yiqYValue').textContent = '0';
    document.getElementById('yiqIValue').textContent = '0';
    document.getElementById('yiqQValue').textContent = '0';
}

/**
 * Toggle dropdown menu
 * @param {string} dropdownId - ID dari dropdown element
 */
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    const allButtons = document.querySelectorAll('.btn-dropdown');

    // Tutup semua dropdown lain
    allDropdowns.forEach(dd => {
        if (dd.id !== dropdownId) {
            dd.classList.remove('show');
        }
    });

    // Remove active class dari semua button
    allButtons.forEach(btn => {
        if (btn.getAttribute('onclick') !== `toggleDropdown('${dropdownId}')`) {
            btn.classList.remove('active');
        }
    });

    // Toggle dropdown yang diklik
    dropdown.classList.toggle('show');

    // Toggle active class pada button
    const button = document.querySelector(`[onclick="toggleDropdown('${dropdownId}')"]`);
    button.classList.toggle('active');
}

/**
 * Reset gambar ke kondisi original
 */
function resetImage() {
    // Cek apakah ada gambar original yang tersimpan
    if (!window.originalImageData) {
        alert('⚠️ Tidak ada gambar untuk di-reset!');
        return;
    }

    // Konfirmasi reset
    const confirmed = confirm('🔄 Reset gambar ke kondisi awal?');
    if (!confirmed) return;

    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');

    // Restore ukuran dan data original
    canvas.width = window.originalWidth;
    canvas.height = window.originalHeight;
    ctx.putImageData(window.originalImageData, 0, 0);

    // Reset slider ke 0
    const angleSlider = document.getElementById('customAngle');
    angleSlider.value = 0;
    updateAngleDisplay(0);

    // Reset color sliders
    resetColorSliders();

    // CATATAN: Dropdown TIDAK ditutup agar user bisa langsung lanjut edit
}

/**
 * Simpan gambar hasil edit
 */
function saveImage() {
    const canvas = document.getElementById('mainCanvas');

    // Cek apakah ada gambar di canvas
    if (!canvas.width || !canvas.height) {
        alert('⚠️ Tidak ada gambar untuk disimpan!');
        return;
    }

    try {
        // Convert canvas ke blob
        canvas.toBlob(function (blob) {
            // Buat URL download
            const url = URL.createObjectURL(blob);

            // Buat element anchor untuk download
            const link = document.createElement('a');

            // Generate nama file dengan timestamp
            const timestamp = new Date().getTime();
            link.download = `edited-image-${timestamp}.png`;

            link.href = url;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup URL
            setTimeout(() => URL.revokeObjectURL(url), 100);

            // Notifikasi sukses
            showNotification('✅ Gambar berhasil disimpan!', 'success');

        }, 'image/png');

    } catch (error) {
        console.error('Error saving image:', error);
        alert('❌ Gagal menyimpan gambar. Silakan coba lagi.');
    }
}

/**
 * Tampilkan notifikasi (opsional, bisa dikembangkan)
 * @param {string} message - Pesan notifikasi
 * @param {string} type - Tipe notifikasi (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Simple alert untuk sekarang
    // Bisa dikembangkan jadi toast notification di masa depan
    alert(message);
}

// ========================================
// KEYBOARD SHORTCUTS (Future Enhancement)
// ========================================

/**
 * Event listener untuk keyboard shortcuts
 * Bisa diaktifkan jika dibutuhkan
 */
function enableKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + S untuk save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveImage();
        }

        // Ctrl/Cmd + R untuk reset
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            resetImage();
        }
    });
}

// Uncomment baris di bawah untuk mengaktifkan keyboard shortcuts
// enableKeyboardShortcuts();