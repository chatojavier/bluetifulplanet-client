import DefaultTags from "@components/DefaultTags";
import SiteService from "@services/SiteService";

async function getData() {
  return SiteService.getSiteData();
}

export default async function Head() {
  const { siteTitle, description } = await getData();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <DefaultTags />
      <title>{siteTitle}</title>
      <meta name="description" content={description as string} />
    </>
  );
}
