import SafeHTML from '@app/components/SafeHTML';
import { FunctionComponent } from 'react';

interface PlainContentProps {
  id: string;
  title: string;
  content?: string | null;
}

const PlainContent: FunctionComponent<PlainContentProps> = ({
  id,
  title,
  content,
}) => {
  return (
    <div id={id} className="page | py-12">
      <h1 className="sr-only">{title}</h1>
      {content && (
        <div className="wp-content | md:max-w-3xl m-auto px-4">
          <SafeHTML html={content} />
        </div>
      )}
    </div>
  );
};

export default PlainContent;
