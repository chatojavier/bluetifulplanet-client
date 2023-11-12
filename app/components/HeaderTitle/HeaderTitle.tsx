import { FunctionComponent, ReactNode } from 'react';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeaderTitleProps {
  title: string;
  className?: string;
  type?: HeaderType;
}

interface ElementTagProps {
  type?: HeaderType;
  className?: string;
  children: ReactNode;
}

const ElementTag = ({ type, className, children }: ElementTagProps) => {
  switch (type) {
    case 'h2':
      return <h2 className={className}>{children}</h2>;
    case 'h3':
      return <h3 className={className}>{children}</h3>;
    case 'h4':
      return <h4 className={className}>{children}</h4>;
    case 'h5':
      return <h5 className={className}>{children}</h5>;
    case 'h6':
      return <h6 className={className}>{children}</h6>;
    default:
      return <h1 className={className}>{children}</h1>;
  }
};

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({
  title,
  className,
  type,
}) => {
  return (
    <ElementTag
      type={type}
      className={`post-title | text-4xl mb-5 ${className ?? ''}`}
    >
      {title}
    </ElementTag>
  );
};

export default HeaderTitle;
