import Link from 'next/link';

export type MediaTag = {
  label: string;
  query: string;
};

const Tags = ({ tagArray }: { tagArray: MediaTag[] }) => (
  <div className="tags | text-xs space-y-2">
    <div className="label | text-gray-400">Tags:</div>
    <div className="items flex gap-2 flex-wrap">
      {tagArray.map(
        tag =>
          tag.label &&
          tag.query && (
            <Link href={`/media-tag/${tag.query}`}>
              <span key={tag.label} className="tag">
                #{tag.label}
              </span>
            </Link>
          )
      )}
    </div>
  </div>
);

export default Tags;
