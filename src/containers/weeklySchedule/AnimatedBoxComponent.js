import React, { useState } from 'react';
import { GridItem } from '@chakra-ui/react';
import { animated, useSpring } from 'react-spring';
import Tab4Schedule from '../tabGridContainer/Tab4Schedule';

const AnimatedGridItem = animated(GridItem);

const AnimatedBoxComponent = ({ allTabs }) => {
  const [isClicked, setIsClicked] = useState(false);

  const props = useSpring({
    to: { colSpan: isClicked ? 2 : 1, rowSpan: isClicked ? 2 : 1 },
    config: { duration: 500 },
  });

  return (
    <AnimatedGridItem
      {...props}
      onClick={() => setIsClicked(!isClicked)}
      colStart={1}
      rowStart={1}
    >
      <Tab4Schedule allTabs={allTabs} />
    </AnimatedGridItem>
  );
};

export default AnimatedBoxComponent;
