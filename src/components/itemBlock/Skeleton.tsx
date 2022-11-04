import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={250}
    height={345}
    viewBox="0 0 250 345"
    backgroundColor="#0c0c0c"
    foregroundColor="#161616"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="250" height="215" />
    <rect x="0" y="221" rx="10" ry="10" width="250" height="70" />
    <rect x="0" y="298" rx="5" ry="5" width="120" height="40" />
    <rect x="130" y="298" rx="5" ry="5" width="120" height="40" />
  </ContentLoader>
);

export default Skeleton;
