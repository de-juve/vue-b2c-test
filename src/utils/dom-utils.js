export function getParentElement(element) {
  if (element) {
    if (element.parentElement) {
      return element.parentElement;
    }
    return element.parentNode;
  }
  return element;
}

export function getScrollingElement(nativeElement, container = null) {
  if (container != null) {
    return document.querySelector(container);
  }
  if (!nativeElement) {
    return window;
  }
  let el = getParentElement(nativeElement);
  let defineParent = false;
  if (el != null) {
    while (!defineParent) {
      defineParent = !!el && (el.localName === 'body' || el.classList.contains('modal') || el.style.overflow || el.style.overflowY);// el.style.height;
      if (!defineParent) {
        el = getParentElement(el);
        if (el == null) {
          defineParent = true;
        }
      }
    }
  }
  if (!el || (el && el.localName === 'body')) {
    el = window;
  } else {
    el = !!el && el.classList.contains('modal-fixed-footer') ? el.getElementsByClassName('modal-content')[0] : el;
  }
  return el;
}

export function nextElementSibling(el) {
  let element = el;
  do {
    element = element.nextSibling;
  } while (element && element.nodeType !== 1);
  return element;
}

export function scrollTop() {
  window.scrollTo(0, 0);
}

