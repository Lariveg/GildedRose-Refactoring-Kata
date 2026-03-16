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
		const increase = (item: Item, amount = 1) => {
			item.quality = Math.min(50, item.quality + amount);
		};

		const decrease = (item: Item, amount = 1) => {
			item.quality = Math.max(0, item.quality - amount);
		};

		for (const item of this.items) {
			const isAgedBrie = item.name === "Aged Brie";
			const isBackstage =
				item.name === "Backstage passes to a TAFKAL80ETC concert";
			const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
			const isConjured = item.name.startsWith("Conjured");

			if (isSulfuras) continue;

			if (isAgedBrie) {
				increase(item);
				item.sellIn--;

				if (item.sellIn < 0) increase(item);
				continue;
			}

			if (isBackstage) {
				increase(item);

				if (item.sellIn <= 10) increase(item);
				if (item.sellIn <= 5) increase(item);

				item.sellIn--;

				if (item.sellIn < 0) item.quality = 0;
				continue;
			}

			if (isConjured) {
				decrease(item, 2);
				item.sellIn--;

				if (item.sellIn < 0) decrease(item, 2);
				continue;
			}

			decrease(item);
			item.sellIn--;

			if (item.sellIn < 0) decrease(item);
		}

		return this.items;
	}
}
