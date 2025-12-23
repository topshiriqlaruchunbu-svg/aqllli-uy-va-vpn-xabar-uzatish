
export const encodeText = (text: string, type: string): string => {
  switch (type) {
    case 'base64':
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch (e) {
        return "Xato!";
      }
    case 'hex':
      return Array.from(text)
        .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' ');
    case 'binary':
      return Array.from(text)
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
    case 'rot13':
      return text.replace(/[a-zA-Z]/g, (c: string) => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      });
    case 'morse':
      const morseCode: Record<string, string> = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': '/'
      };
      return text.toUpperCase().split('').map(c => morseCode[c] || c).join(' ');
    default:
      return text;
  }
};
