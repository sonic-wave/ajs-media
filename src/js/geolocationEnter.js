export default function geolocationEnter(str) {
    str = str.replace(/^\[|\]$/g, '');
    const newStr = str.split(',');
    const geolocationCoords = {
        latitude: newStr[0].trim(),
        longitude: newStr[1].trim(),
    }
    return geolocationCoords;
}