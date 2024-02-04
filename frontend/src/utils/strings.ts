export function isNumberString(strong: string): boolean {
    const allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    for(let index = 0; index < strong.length; index++) {
        const char = strong.charAt(index)

        if(char !in allowedChars) {
            return false
        }
    }

    return true
}