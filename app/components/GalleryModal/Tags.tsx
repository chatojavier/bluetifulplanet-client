export type MediaTag = {
  label: string;
  query: string;
};

const Tags = ({ tagArray }: { tagArray: MediaTag[] }) => (
  <div className="tags | text-xs space-y-2">
    <div className="label | text-gray-400">Tags:</div>
    <div className="items flex gap-2 flex-wrap">
      {tagArray.map(tag => (
        <span key={tag.label} className="tag">
          #{tag.label}
        </span>
      ))}
    </div>
  </div>
);

export default Tags;
