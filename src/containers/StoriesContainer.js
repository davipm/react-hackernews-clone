import React, { useState, useEffect } from 'react';
import { getStoryIds } from "../services/hnApi";
import Story from "../components/Story";
import { GlobalStyle, StoriesContainerWrapper } from "../styles/StoriesContainersStyles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

function StoriesContainer() {
  const { count } = useInfiniteScroll();
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-testid="stories-container">
        <h1>Hacker news Stories</h1>
        {storyIds.slice(0, count).map(storyId => (
          <Story key={storyId} storyId={storyId} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
}

export default StoriesContainer;
