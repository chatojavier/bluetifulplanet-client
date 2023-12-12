const InfoItem = ({ label, value }: Record<string, string>) => (
  <div className="aperture | space-y-1 p-3 | odd:border-r landscape:border-r landscape:last-of-type:border-0">
    <div className="label | text-gray-400 whitespace-nowrap">{label}</div>
    <div className="value">
      {label.match(/aperture/i) ? `f/${value}` : value}
    </div>
  </div>
);

export default InfoItem;
