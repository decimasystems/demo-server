export function titleCase(str: string): string {
    var transformed: string[];
    var sep = (/\s/).test(str);
    var separator = sep ? " " : "-";
    transformed = str.toLowerCase().split(separator);
    for (var i = 0; i < transformed.length; i++) {
        if (transformed[i].length != 2) {
            transformed[i] = transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
        }

    }
    return transformed.join(separator).toString();
}