export const getImageSource = (imageBuffer) => {
    if (!imageBuffer?.data) return null;
    
    const uint8Array = new Uint8Array(imageBuffer.data);
    const base64 = arrayBufferToBase64(uint8Array);
    return `data:image/png;base64,${base64}`;
};

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};