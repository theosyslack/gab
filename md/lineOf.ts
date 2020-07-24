function lineOf(text: string, substring: string) {
    var line = 0, matchedChars = 0;

    for (var i = 0; i < text.length; i++) {
        text[i] === substring[matchedChars] ? matchedChars++ : matchedChars = 0;

        if (matchedChars === substring.length) {
            return line;
        }
        if (text[i] === '\n') {
            line++;
        }
    }

    return -1;
}

export default lineOf