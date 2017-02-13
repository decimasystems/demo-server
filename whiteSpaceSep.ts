export function whiteSpaceSeparator(s: string) {
    if (s) {
        if (/[-]/g.test(s)) {
            var rez = s.replace(/[-]/g, " ");
            return rez;
        }

    }
    return s;
}