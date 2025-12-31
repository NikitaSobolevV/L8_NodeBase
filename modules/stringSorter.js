function sortStringsIgnoringSpaces(strings) {
    return strings.sort((a, b) => {
        const aWithoutSpaces = a.replace(/\s+/g, '');
        const bWithoutSpaces = b.replace(/\s+/g, '');
        return aWithoutSpaces.localeCompare(bWithoutSpaces);
    });
}

module.exports = { sortStringsIgnoringSpaces };
