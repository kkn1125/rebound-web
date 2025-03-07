import { COVER_IMAGE } from "@/config/constants";
import { BRAND, DEPLOY_URL } from "@/config/envs";
import { Helmet } from "react-helmet";

interface SEOMetaTagProps {
  title: string;
  description: string;
  keywords: string;
}
const SEOMetaTag: React.FC<SEOMetaTagProps> = ({
  title,
  description,
  keywords,
}) => {
  const pathname = location.pathname;
  return (
    <Helmet>
      <title>
        {BRAND.toUpperCase()} {title}
      </title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={COVER_IMAGE} />
      <meta property="og:url" content={DEPLOY_URL + pathname} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={COVER_IMAGE} />

      <link rel="canonical" href={DEPLOY_URL + pathname} />
    </Helmet>
  );
};

export default SEOMetaTag;
