export const partA = (input: string[]) => {
	let totalPoints = 0;

	for (const card of input) {
		const _card = card.slice(card.indexOf(':') + 1).trim();
		const [winningNumbers, yourNumbers] = _card.split('|').map(numbers => numbers.trim().split(/\s+/).map(Number));
		const matches = yourNumbers.filter(number => winningNumbers.includes(number)).length;
		totalPoints += matches > 0 ? 2 ** (matches - 1) : 0;
	}

	return totalPoints;
};

export const partB = (input: string[]) => {
	type Card = {
		cardNumber: number;
		winningNumbers: number[];
		yourNumbers: number[];
		matches: number;
		additionalCards?: number[];
		card: string;
	};
	const cards: Card[] = [];
	for (const card of input) {
		const cardNumber = input.indexOf(card) + 1;
		const _card = card.slice(card.indexOf(':') + 1).trim();
		const [winningNumbers, yourNumbers] = _card.split('|').map(numbers => numbers.trim().split(/\s+/).map(Number));
		const matches = yourNumbers.filter(number => winningNumbers.includes(number)).length;
		const additionalCards = matches > 0 ? Array.from({length: matches}, (_, i) => cardNumber + i + 1) : undefined;
		cards.push({cardNumber, winningNumbers, yourNumbers, matches, additionalCards, card});
	}

	let totalCards = 0;

	type CardBinder = {
		card: Card;
		count: number;
	};
	const cardBinders: Record<number, CardBinder> = {};
	for (const card of cards) {
		cardBinders[card.cardNumber] = {card, count: 1};
	}

	for (const binder of Object.values(cardBinders)) {
		if (binder.card.matches === 0) {
			continue;
		} else if (binder.card.matches > 0) {
			for (const cardNumber of binder.card.additionalCards!) {
				cardBinders[cardNumber].count += Number(binder.count);
			}
		}
	}

	for (const binder of Object.values(cardBinders)) {
		totalCards += binder.count;
	}

	console.log(`Total cards: ${totalCards}`);

	return totalCards;
};
