export function parseToArray(str: any) {
    try {
        if (str.startsWith('[') && str.endsWith(']')) {
            return JSON.parse(str).map(Number);
        }
        return str.split(',').map(Number);
    } catch (e) {
        console.error('Error parsing string to array:', e);
        return [];
    }
}