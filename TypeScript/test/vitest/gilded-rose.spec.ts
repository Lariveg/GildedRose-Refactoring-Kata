import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
	describe("normal items", () => {
		it("should correctly update the quality of a normal item before date", () => {
			const gildedRose = new GildedRose([
				new Item("+5 Dexterity Vest", 10, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("+5 Dexterity Vest");
			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(19);
		});

		it("should correctly update the quality of a normal item after date", () => {
			const gildedRose = new GildedRose([
				new Item("+5 Dexterity Vest", -1, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("+5 Dexterity Vest");
			expect(items[0].sellIn).toBe(-2);
			expect(items[0].quality).toBe(18);
		});

		it("should not let the quality of an item become negative", () => {
			const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 0)]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("+5 Dexterity Vest");
			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(0);
		});

		it("should not let the quality of an item become more than 50", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Aged Brie");
			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(50);
		});
	});

	describe("Sulfuras", () => {
		it("should not change the quality of Sulfuras and should not change its sellIn", () => {
			const gildedRose = new GildedRose([
				new Item("Sulfuras, Hand of Ragnaros", 10, 80),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
			expect(items[0].sellIn).toBe(10);
			expect(items[0].quality).toBe(80);
		});
	});

	describe("Aged Brie", () => {
		it("should correctly update the quality of Aged Brie before the sell date", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Aged Brie");
			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(21);
		});

		it("should correctly update the quality of Aged Brie after the sell date", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", -1, 20)]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Aged Brie");
			expect(items[0].sellIn).toBe(-2);
			expect(items[0].quality).toBe(22);
		});
	});

	describe("Backstage Passes", () => {
		it("should correctly update the quality of Backstage Passes when there are more than 10 days left", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
			expect(items[0].sellIn).toBe(10);
			expect(items[0].quality).toBe(21);
		});

		it("should correctly update the quality of Backstage Passes when there are 10 days or less left", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
			expect(items[0].sellIn).toBe(9);
			expect(items[0].quality).toBe(22);
		});

		it("should correctly update the quality of Backstage Passes when there are 5 days or less left", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
			expect(items[0].sellIn).toBe(4);
			expect(items[0].quality).toBe(23);
		});

		it("should drop the quality of Backstage Passes to 0 after the concert", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
			]);
			const items = gildedRose.updateQuality();
			expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
			expect(items[0].sellIn).toBe(-1);
			expect(items[0].quality).toBe(0);
		});
	});
});
