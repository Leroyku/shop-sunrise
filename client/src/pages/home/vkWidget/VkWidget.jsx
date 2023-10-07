import React from 'react';
import VK, { Group } from 'react-vk';

function VkWidget() {
  return (
    <VK apiId={51441328}>
      <Group
        groupId={208008042}
        options={{
          mode: 4,
          width: 275,
          height: 600,
          color1: '0c0c0c',
          color2: 'ffffff',
          color3: '5181B8',
        }}
      />
    </VK>
  );
}

export default VkWidget;
