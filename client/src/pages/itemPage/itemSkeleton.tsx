import React from 'react';
import ContentLoader from 'react-content-loader';

const ItemSkeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={1150}
    height={400}
    viewBox="0 0 1150 400"
    backgroundColor="#0c0c0c"
    foregroundColor="#161616"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="400" height="400" />
    <rect x="434" y="30" rx="5" ry="5" width="220" height="32" />
    <rect x="434" y="82" rx="5" ry="5" width="650" height="20" />
    <rect x="434" y="112" rx="5" ry="5" width="650" height="20" />
    <rect x="434" y="142" rx="5" ry="5" width="350" height="20" />
    <rect x="950" y="339" rx="5" ry="5" width="145" height="61" />
  </ContentLoader>
);

export default ItemSkeleton;
