import SafeHTML from '../SafeHTML';

const Header = ({ title, subcopy }: { title: string; subcopy: string }) => (
  <div className="info-header">
    <h2 className="title | text-3xl font-bold leading-none text-bluetifulBlue">
      {title}
    </h2>
    <div className="subcopy | text-sm">
      <SafeHTML html={subcopy} />
    </div>
  </div>
);

export default Header;
