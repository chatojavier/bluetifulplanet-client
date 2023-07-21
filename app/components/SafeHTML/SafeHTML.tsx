import { FC } from 'react';
import xss, { IFilterXSSOptions } from 'xss';
import styles from './SafeHTML.module.scss';

type SafeHTMLProps = {
  html: string;
};

const SafeHTML: FC<SafeHTMLProps> = ({ html }) => {
  const options: IFilterXSSOptions = {
    css: false,
    whiteList: {
      div: ['class', 'style'],
      p: ['class', 'style'],
      blockquote: ['class', 'style'],
      hr: ['class', 'style'],
      figure: ['class', 'style'],
      span: ['class', 'style'],
      strong: [],
      em: [],
      cite: [],
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
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      sub: [],
    },
  };

  const cleanHTML = xss(html, options);

  return (
    <div
      className={styles.SafeHTML}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};
export default SafeHTML;
