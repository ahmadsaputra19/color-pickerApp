function updateColor() {
    const hexInput = document.getElementById('hex').value;
    const rgbaInput = document.getElementById('rgba').value;
    const colorPreview = document.getElementById('colorPreview');

    if (isValidHex(hexInput)) {
        colorPreview.style.backgroundColor = hexInput;
        document.getElementById('colorPicker').value = hexInput;
    } else if (isValidRgba(rgbaInput)) {
        const rgbaString = rgbaInput.replace(/\s+/g, '');
        colorPreview.style.backgroundColor = rgbaString;
        document.getElementById('colorPicker').value = rgbaToHex(rgbaString);
    } else {
        colorPreview.style.backgroundColor = '#ffffff';
    }
}

function pickColor() {
    const colorPicker = document.getElementById('colorPicker').value;
    document.getElementById('hex').value = colorPicker;
    document.getElementById('rgba').value = hexToRgba(colorPicker);
    document.getElementById('colorPreview').style.backgroundColor = colorPicker;
}

function isValidHex(hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

function isValidRgba(rgba) {
    const rgbaPattern = /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(0|1|0?\.\d+)\)$/i;
    const match = rgba.match(rgbaPattern);
    if (match) {
        const [, r, g, b, a] = match.map(Number);
        return r <= 255 && g <= 255 && b <= 255 && a <= 1;
    }
    return false;
}

function rgbaToHex(rgba) {
    const parts = rgba.match(/rgba?\((\d+),\s?(\d+),\s?(\d+),?\s?(\d?.?\d+)?\)/i);
    if (!parts) return '#000000';
    const r = parseInt(parts[1]).toString(16).padStart(2, '0');
    const g = parseInt(parts[2]).toString(16).padStart(2, '0');
    const b = parseInt(parts[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function hexToRgba(hex) {
    let r = 0, g = 0, b = 0, a = 1;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
