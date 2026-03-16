export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {
		for (const item of this.items) {
			const isAgedBrie = item.name === "Aged Brie";
			const isBackstage =
				item.name === "Backstage passes to a TAFKAL80ETC concert";
			const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
			const isConjured = item.name.startsWith("Conjured");

			const increase = (n = 1) => {
				item.quality = Math.min(50, item.quality + n);
			};

			const decrease = (n = 1) => {
				item.quality = Math.max(0, item.quality - n);
			};

			if (isSulfuras) continue;

			if (isAgedBrie) {
				increase();
				item.sellIn--;

				if (item.sellIn < 0) increase();
				continue;
			}

			if (isBackstage) {
				increase();

				if (item.sellIn <= 10) increase();
				if (item.sellIn <= 5) increase();

				item.sellIn--;

				if (item.sellIn < 0) item.quality = 0;
				continue;
			}

			if (isConjured) {
				decrease(2);
				item.sellIn--;

				if (item.sellIn < 0) decrease(2);
				continue;
			}

			// Normal items
			decrease();
			item.sellIn--;

			if (item.sellIn < 0) decrease();
		}

		return this.items;
	}
}
