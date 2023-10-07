import React from 'react';
import ReactPlayer from 'react-player';

interface IVideo {
  video: string;
}

const Video: React.FC<IVideo> = ({ video }) => {
  return <ReactPlayer url={video} controls={true} width="100%" height="250px" />;
};

export default Video;
