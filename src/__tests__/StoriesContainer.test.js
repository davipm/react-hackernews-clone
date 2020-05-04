import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import StoriesContainer from '../containers/StoriesContainer';
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORIES_INCREMENT } from "../constants";

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hnApi', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn()
}));

it('should render the story container with a story', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORIES_INCREMENT
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<StoriesContainer />);
  await waitForElement(() => [
    expect(getByText('Hacker news Stories')).toBeTruthy(),
    expect(getByText('Web Development: React.js stuff')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('by: Davi Pereira'),
  ]);
});
