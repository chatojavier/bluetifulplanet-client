import type { MutableRefObject } from 'react';
import { isFunction, isBrowser } from './general';

export const getScrollTop = (el: Document | Element) => {
  if (
    el === document ||
    el === document.documentElement ||
    el === document.body
  ) {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }
  return (el as Element).scrollTop;
};

export const getScrollHeight = (el: Document | Element) => {
  return (
    (el as Element).scrollHeight ||
    Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  );
};

export const getClientHeight = (el: Document | Element) => {
  return (
    (el as Element).clientHeight ||
    Math.max(document.documentElement.clientHeight, document.body.clientHeight)
  );
};

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T
) {
  if (!isBrowser()) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = target();
  } else if ('current' in target) {
    if (target.current) {
      targetElement = target.current;
    } else {
      targetElement = defaultElement;
    }
  } else {
    targetElement = target;
  }

  return targetElement;
}
