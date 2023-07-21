import DefaultTags from '@components/DefaultTags';
import SiteService from '@services/SiteService';

async function getData() {
  return SiteService.getSiteData();
}

export default async function Head() {
  const { siteTitle, description } = await getData();

  return (
    <>
      <DefaultTags />
      <title>{`${siteTitle} - ${description}`}</title>
      <meta name="description" content={description as string} />
    </>
  );
}
