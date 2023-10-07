import React from 'react';
import ContentLoader from 'react-content-loader';
interface ISkeleton {
  mobHome?: boolean;
  props?: any;
}
const Skeleton: React.FC<ISkeleton> = ({ mobHome, props }) => (
  <ContentLoader
    speed={2}
    width={mobHome ? 145 : 250}
    height={mobHome ? 250 : 345}
    viewBox={mobHome ? '0 0 145 250' : '0 0 250 345'}
    backgroundColor="#0c0c0c"
    foregroundColor="#161616"
    {...props}>
    <rect
      x="0"
      y="0"
      rx="10"
      ry="10"
      width={mobHome ? '145' : '230'}
      height={mobHome ? '250' : '215'}
    />
    <rect x="0" y="221" rx="10" ry="10" width="230" height="70" />
    <rect x="0" y="298" rx="5" ry="5" width="100" height="40" />
    <rect x="130" y="298" rx="5" ry="5" width="100" height="40" />
  </ContentLoader>
);

export default Skeleton;
