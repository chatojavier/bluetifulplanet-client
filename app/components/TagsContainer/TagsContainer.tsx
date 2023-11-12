import { FunctionComponent } from 'react';
import TagLink from '../TagLink';

interface TagsContainerProps {
  tags: {
    name: string | null | undefined;
    uri: string | null | undefined;
  }[];
}

const TagsContainer: FunctionComponent<TagsContainerProps> = ({ tags }) => {
  return (
    <div role="group" className="tag-links | flex justify-center gap-4">
      {tags.map(({ uri: tagUri, name }) =>
        tagUri ? (
          <TagLink href={`/blog${tagUri}`} key={tagUri}>
            {name}
          </TagLink>
        ) : null
      )}
    </div>
  );
};

export default TagsContainer;
