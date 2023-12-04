// @ts-ignore
import * as fs from "fs";

async function partOne() {
	const lines = fs
		.readFileSync("./data.txt", { encoding: "utf8" })
		.trim()
		.split("\r\n");

	const lineResults = lines.map((line: string) => {
		const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		let lineResult: string[] = [];

		for (const char of line) {
			const isIncluded = numbers.includes(char);

			if (isIncluded) {
				if (!lineResult.length) {
					lineResult[0] = char;
				}

				lineResult[1] = char;
			}
		}

		return lineResult.length ? Number(lineResult[0] + lineResult[1]) : 0;
	});

	const result = lineResults.reduce(
		(previous: number, current: number) => previous + current
	);

	console.log(result);
}

type LineItem = {
	char: string;
	index: number;
};

async function partTwo() {
	const lines = fs
		.readFileSync("./data.txt", { encoding: "utf8" })
		.trim()
		.split("\r\n");

	const lineResults = lines.map((line: string, lineIdx: number) => {
		const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
		const numberWords = [
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
		];

		let foundLineItems: LineItem[] = [];

		// find all occurences of digits
		for (const [idx, char] of Object.entries(line)) {
			const isIncluded = numbers.includes(char);

			if (isIncluded) {
				foundLineItems.push({ char, index: Number(idx) });
			}
		}

		// find all occurences of spelled numbers
		for (let i = 0; i < numberWords.length; i++) {
			const firstFoundIdx = line.indexOf(numberWords[i]);

			if (firstFoundIdx === -1) {
				continue;
			}

			const lastFoundIdx = line.lastIndexOf(numberWords[i]);

			foundLineItems.push({ char: numbers[i], index: firstFoundIdx });
			foundLineItems.push({ char: numbers[i], index: lastFoundIdx });
		}

		foundLineItems.sort((first: LineItem, second: LineItem) =>
			first.index < second.index ? -1 : 1
		);

		return foundLineItems.length
			? Number(
					foundLineItems[0].char +
						foundLineItems[foundLineItems.length - 1].char
			  )
			: 0;
	});

	const result = lineResults.reduce(
		(previous: number, current: number) => previous + current
	);

	console.log(result);
}

partOne();
partTwo();
