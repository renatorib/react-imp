export function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

export function getElementSiblings(element: Element) {
  let siblings = [] as Element[];

  if (!element.parentElement) {
    return siblings;
  }

  for (const sibling of Array.from(element.parentElement.children)) {
    if (sibling !== element) {
      siblings.push(sibling);
    }
  }

  return siblings;
}

export function supportsInert() {
  return "inert" in HTMLElement.prototype;
}

export function addInert(element: Element, id?: string) {
  element.setAttribute("inert", "true");
  element.setAttribute("data-inertby", `imp${id ?? ""}`);
}

export function removeInert(element: Element, id?: string, safe = true) {
  if (element.getAttribute("data-inertby") === `imp${id ?? ""}` || !safe) {
    element.removeAttribute("inert");
    element.removeAttribute("data-inertby");
  }
}

export function inertFocusOn(element: Element, id?: string) {
  removeInert(element, id);
  getElementSiblings(element).forEach((sib) => addInert(sib, id));
}

export function inertFocusOff(element: Element, id?: string) {
  getElementSiblings(element).forEach((sib) => removeInert(sib, id));
}

export function inertCleanUp(id?: string) {
  const selector = id ? `[data-inertby="imp${id}"]` : '[data-inertby^="imp"]';
  Array.from(document.querySelectorAll(selector)).forEach((el) => removeInert(el, undefined, false));
}

export const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export const lockScroll = () => {
  const originalStyle = { ...window.getComputedStyle(document.body) };
  const scrollbarWidth = getScrollbarWidth();

  Object.assign(document.body.style, {
    paddingRight: `${scrollbarWidth}px`,
    overflow: "hidden",
  });

  return function unlockScroll() {
    Object.assign(document.body.style, {
      overflow: originalStyle.overflow,
      paddingRight: originalStyle.paddingRight,
    });
  };
};

// focus helpers
// borrowed from ariakit
// see https://github.com/ariakit/ariakit/blob/5398b10c190cb39495354aac776cf8ad857dfe09/packages/ariakit-core/src/utils/focus.ts

const focusableSelector =
  "input:not([type='hidden']):not([disabled]), select:not([disabled]), " +
  "textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], " +
  "iframe, object, embed, area[href], audio[controls], video[controls], " +
  "[contenteditable]:not([contenteditable='false'])";

export function getAllFocusableIn(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
}
