import React, { useState, useEffect, memo } from 'react';
import { getStory } from "../services/hnApi";
import { StoryWrapper, StoryTitle, StoryMeta, StoryMetaElement } from "../styles/StoryStyles";
import { mapTime } from "../mappers/mapTime";

function Story({ storyId }) {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      {story && story.url ? (
        <StoryWrapper data-testid="story">
        <StoryTitle>
          <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
        </StoryTitle>
        <StoryMeta>
          <span data-testid="story-by">
            <StoryMetaElement color="#000">by:</StoryMetaElement> {story.by}
          </span>
          <span data-testid="story-time">
            <StoryMetaElement color="#000">posted:</StoryMetaElement> {``}
            {mapTime(story.time)}
          </span>
        </StoryMeta>
      </StoryWrapper>
      ) : null}
    </>
  )
}

export default memo(Story);
