import React from "react";
import { Helmet } from "react-helmet-async";
import { string, object, oneOfType, arrayOf, bool } from "prop-types";
import {
  SITE_NAME,
  BRAND_SUFFIX,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  absoluteUrl,
} from "../config/seoConfig";

const Seo = ({ title, description, path, image, jsonLd, noindex }) => {
  const fullTitle = title ? `${title} | ${BRAND_SUFFIX}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = absoluteUrl(path || "");
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

Seo.propTypes = {
  title: string,
  description: string,
  path: string,
  image: string,
  jsonLd: oneOfType([object, arrayOf(object)]),
  noindex: bool,
};

export default Seo;
