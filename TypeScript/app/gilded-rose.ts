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
			const isNormalItem =
				!isAgedBrie && !isBackstage && !isSulfuras && !isConjured;

			if (isNormalItem) {
				item.quality = Math.max(0, item.quality - 1);
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					item.quality = Math.max(0, item.quality - 1);
				}
			}

			if (isSulfuras) {
				// Sulfuras does not change in quality or sellIn so we can skip it in the logic below
				continue;
			}

			if (isAgedBrie) {
				item.quality = Math.min(50, item.quality + 1);
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					item.quality = Math.min(50, item.quality + 1);
				}
			}

			if (isBackstage) {
				item.quality = Math.min(50, item.quality + 1);
				if (item.sellIn <= 10) {
					item.quality = Math.min(50, item.quality + 1);
				}
				if (item.sellIn <= 5) {
					item.quality = Math.min(50, item.quality + 1);
				}
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					item.quality = 0;
				}
			}

			if (isConjured) {
				item.quality = Math.max(0, item.quality - 2);
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					item.quality = Math.max(0, item.quality - 2);
				}
			}
		}

		return this.items;
	}
}
