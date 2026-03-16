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

	private static readonly AGED_BRIE = "Aged Brie";
	private static readonly BACKSTAGE_PASS =
		"Backstage passes to a TAFKAL80ETC concert";
	private static readonly SULFURAS = "Sulfuras, Hand of Ragnaros";
	private static readonly CONJURED = "Conjured";

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
			const expired = item.sellIn <= 0;

			if (item.name === GildedRose.SULFURAS) {
				continue;
			} else if (item.name === GildedRose.AGED_BRIE) {
				this.increaseQuality(item, expired ? 2 : 1);
			} else if (item.name === GildedRose.BACKSTAGE_PASS) {
				if (expired) {
					item.quality = 0;
				} else if (item.sellIn <= 5) {
					this.increaseQuality(item, 3);
				} else if (item.sellIn <= 10) {
					this.increaseQuality(item, 2);
				} else {
					this.increaseQuality(item, 1);
				}
			} else if (item.name.startsWith(GildedRose.CONJURED)) {
				this.decreaseQuality(item, expired ? 4 : 2);
			} else {
				this.decreaseQuality(item, expired ? 2 : 1);
			}

			item.sellIn--;
		}

		return this.items;
	}
}
