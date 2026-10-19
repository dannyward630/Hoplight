/**
 * Library deck-chip wheel handling for reaching horizontally overflowed desktop decks.
 */
import type { WheelEvent } from "react";

/**
 * Map wheel input to the horizontal overflow of the Library's deck-chip row.
 */
type HorizontalScrollViewport = Pick<HTMLElement, "clientWidth" | "scrollLeft" | "scrollWidth">;

export function scrollDecksOnWheel(
  row: HorizontalScrollViewport,
  deltaX: number,
  deltaY: number,
): boolean {
  const distance = deltaX || deltaY;
  const maxScroll = row.scrollWidth - row.clientWidth;
  if (!Number.isFinite(distance) || distance === 0 || maxScroll <= 0) return false;

  const next = Math.max(0, Math.min(maxScroll, row.scrollLeft + distance));
  if (next === row.scrollLeft) return false;
  row.scrollLeft = next;
  return true;
}

export function handleDeckWheel(event: WheelEvent<HTMLDivElement>): void {
  if (scrollDecksOnWheel(event.currentTarget, event.deltaX, event.deltaY)) event.preventDefault();
}
