const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured";

export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name: string, sellIn: number, quality: number) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	items: Item[];

	constructor(items = [] as Item[]) {
		this.items = items;
	}

	private increaseQuality(item: Item, amount = 1) {
		item.quality = Math.min(50, item.quality + amount);
	}

	private decreaseQuality(item: Item, amount = 1) {
		item.quality = Math.max(0, item.quality - amount);
	}

	updateQuality() {
		for (const item of this.items) {
			const isAgedBrie = item.name === AGED_BRIE;
			const isBackstage = item.name === BACKSTAGE_PASS;
			const isSulfuras = item.name === SULFURAS;
			const isConjured = item.name.startsWith(CONJURED);

			if (isSulfuras) continue;

			if (isAgedBrie) {
				this.increaseQuality(item);
				item.sellIn--;

				if (item.sellIn < 0) this.increaseQuality(item);
				continue;
			}

			if (isBackstage) {
				this.increaseQuality(item);

				if (item.sellIn <= 10) this.increaseQuality(item);
				if (item.sellIn <= 5) this.increaseQuality(item);

				item.sellIn--;

				if (item.sellIn < 0) item.quality = 0;
				continue;
			}

			if (isConjured) {
				this.decreaseQuality(item, 2);
				item.sellIn--;

				if (item.sellIn < 0) this.decreaseQuality(item, 2);
				continue;
			}

			this.decreaseQuality(item);
			item.sellIn--;

			if (item.sellIn < 0) this.decreaseQuality(item);
		}

		return this.items;
	}
}
