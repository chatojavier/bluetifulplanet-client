import { FC } from 'react';
import xss, { IFilterXSSOptions } from 'xss';
import styles from './SafeHTML.module.scss';

type SafeHTMLProps = {
  html: string;
};

const options: IFilterXSSOptions = {
  css: false,
  whiteList: {
    div: ['class', 'style'],
    p: ['class', 'style'],
    blockquote: ['class', 'style'],
    hr: ['class', 'style'],
    span: ['class', 'style'],
    ul: ['class', 'style'],
    li: ['class', 'style'],
    a: ['class', 'style', 'href', 'target', 'aria-label', 'rel'],
    strong: [],
    em: [],
    cite: ['class', 'style'],
    img: [
      'class',
      'decoding',
      'loading',
      'width',
      'height',
      'src',
      'srcset',
      'alt',
      'sizes',
    ],
    h3: ['class', 'style'],
    h4: ['class', 'style'],
    h5: ['class', 'style'],
    h6: ['class', 'style'],
    sub: ['class', 'style'],
    figure: ['class', 'style'],
    figcaption: [],
    sup: ['class', 'style'],
    br: [],
  },
};

export const cleanHTML = (htmlInput: string) => xss(htmlInput, options);

export const decodeHTML = (html: string) => {
  const map: Record<string, string> = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: '"',
    apos: "'",
    AElig: 'Æ',
    aelig: 'æ',
    Agrave: 'À',
    agrave: 'à',
    Acirc: 'Â',
    acirc: 'â',
    nbsp: ' ',
    hellip: '…',
    // Add more entities as needed
  };
  return html.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1: string) => {
    if ($1[0] === '#') {
      return String.fromCharCode(
        $1[1].toLowerCase() === 'x'
          ? parseInt($1.substr(2), 16)
          : parseInt($1.substr(1), 10)
      );
    }
    // eslint-disable-next-line no-prototype-builtins
    return map.hasOwnProperty($1) ? map[$1] : $0;
  });
};

const SafeHTML: FC<SafeHTMLProps> = ({ html }) => {
  return (
    <div
      className={styles.SafeHTML}
      dangerouslySetInnerHTML={{ __html: cleanHTML(html) }}
    />
  );
};

export const plainText = (html: string) => {
  const clean = xss(html);
  const decoded = decodeHTML(clean);
  return decoded.replace(/(<([^>]+)>)/gi, '');
};

export default SafeHTML;
