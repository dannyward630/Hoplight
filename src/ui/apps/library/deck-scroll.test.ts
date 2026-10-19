/**
 * Deck-chip wheel navigation keeps every overflowing Library deck reachable with an ordinary mouse.
 */
import { describe, expect, test } from "bun:test";
import { scrollDecksOnWheel } from "./deck-scroll";

describe("scrollDecksOnWheel", () => {
  test("maps vertical wheel movement onto an overflowing deck row", () => {
    const row = { scrollLeft: 0, scrollWidth: 900, clientWidth: 300 };

    expect(scrollDecksOnWheel(row, 0, 120)).toBe(true);
    expect(row.scrollLeft).toBe(120);
  });

  test("preserves horizontal trackpad movement when both deltas are present", () => {
    const row = { scrollLeft: 40, scrollWidth: 900, clientWidth: 300 };

    expect(scrollDecksOnWheel(row, 30, 100)).toBe(true);
    expect(row.scrollLeft).toBe(70);
  });

  test("does not consume wheel movement when the row fits or is at an edge", () => {
    const fits = { scrollLeft: 0, scrollWidth: 300, clientWidth: 300 };
    const atEnd = { scrollLeft: 600, scrollWidth: 900, clientWidth: 300 };

    expect(scrollDecksOnWheel(fits, 0, 100)).toBe(false);
    expect(fits.scrollLeft).toBe(0);
    expect(scrollDecksOnWheel(atEnd, 0, 100)).toBe(false);
    expect(atEnd.scrollLeft).toBe(600);
  });
});
