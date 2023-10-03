export const objectToQueryString = (obj: any, prefix = ''): string => {
    const queryStringParts = [];

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}[${key}]` : key;

            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'object') {
                    // Если значение - объект, рекурсивно преобразуйте его
                    queryStringParts.push(objectToQueryString(value, fullKey));
                } else {
                    queryStringParts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
                }
            }
        }
    }

    return queryStringParts.join('&');
}
