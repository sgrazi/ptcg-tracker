export function parseJSON(jsonString) {
    try {
        const parsedObject = JSON.parse(jsonString);
        return parsedObject;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}