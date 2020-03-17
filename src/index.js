const trivial = {
	0: 'zero',
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'twelve',
	13: 'thirteen',
	14: 'fourteen',
	15: 'fifteen',
	16: 'sixteen',
	17: 'seventeen',
	18: 'eighteen',
	19: 'nineteen'
};

const baseTwo = {
	2: 'twenty',
	3: 'thirty',
	4: 'forty',
	5: 'fifty',
	6: 'sixty',
	7: 'seventy',
	8: 'eighty',
	9: 'ninety'
};

const HUNDRED = 'hundred';
const ZERO = 'zero';

module.exports = function toReadable (number) {
	if(number === 0) return ZERO;
	if(number < 20) return trivial[number];
	// Getting array of integer digits
	let digits = number.toString().split('').map((numStr) => (Number.parseInt(numStr)));
	let resultWords = [];

	let isBreak = false;
	for(let index in digits) {
		// Digit's position in the number: count right to left
		const order = digits.length - index;
		const digit = digits[index];

		switch(order) {
			case 3: 
				resultWords.push(trivial[digit]);
				resultWords.push(HUNDRED);
				break;
			case 2: 
				if(digit === 0) {
					break;
				} else {
					const twoLastDigitsNumber = digit*10 + digits[Number.parseInt(index) + 1];
					if(twoLastDigitsNumber < 20) {
						resultWords.push(trivial[twoLastDigitsNumber]);
						isBreak = true; // we've handled digits from both 2nd and 1st positions
					} else {
						resultWords.push(baseTwo[digit]);
					}
				}
				break;
			case 1:
				if(digit === 0) {
					break;
				} else {
					resultWords.push(trivial[digit]);
				}
				break;
		}

		if(isBreak) break;
	}

	const result = resultWords.join(' ');

	return result;
}
