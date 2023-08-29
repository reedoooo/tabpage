import React from 'react';
import { Button, AspectRatio, GridItem, useMediaQuery } from '@chakra-ui/react';
import EditTabModalButton from '../buttons/EditTabModalButton';

function Tab({
  tab,
  expanded,
  toggleSelectedGridItem,
  selectedGridItem,
  index,
}) {
  const buttonStyle = {
    backgroundImage: `url(${tab.imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px',
    padding: 0,
    gridColumn: 'auto',
    gridRow: 'auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const [isLargerThanMd] = useMediaQuery(
    '(min-width: 10em)',
    '(min-height: 10em)',
  );

  const commonGridItemStyle = {
    width: '100%',
    height: '100%',
  };

  const largeScreenGridItemStyle = {
    flexBasis: '100%',
  };

  const smallScreenGridItemStyle = {
    height: '50%',
    flexBasis: 'auto',
  };

  const gridItemStyle = {
    ...commonGridItemStyle,
    ...(isLargerThanMd ? largeScreenGridItemStyle : smallScreenGridItemStyle),
  };

  return (
    <GridItem
      width="100%"
      height="100%"
      boxSizing="border-box"
      style={{ flexGrow: 1, flexShrink: 1 }}
      id="tab-container"
      onClick={(event) => toggleSelectedGridItem(`tab${index + 1}`, event)}
    >
      {expanded && (
        <AspectRatio ratio={1}>
          <Button
            as="a"
            href={tab.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            backgroundColor={tab.color}
            style={buttonStyle}
          >
            <section
              id="tab-title-section"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ marginBottom: '10%', marginTop: '1%', zIndex: 5 }}>
                <h2 id="button-content">{tab.name}</h2>
              </div>
            </section>
          </Button>
        </AspectRatio>
      )}
    </GridItem>
  );
}

export default Tab;
