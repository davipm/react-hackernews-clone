import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import App from "../App";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORIES_INCREMENT } from "../constants";

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hnApi.js', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn()
}));

it('should render the application', async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORIES_INCREMENT
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<App />);

  await waitForElement(() => [
    expect(getByText('Hacker news Stories')).toBeTruthy(),
    expect(getByText('Tarnished: Google Responds')).toBeTruthy(),
    expect(queryByTestId('story-by').textContent).toEqual('by: Karl Hadwen'),
  ]);
});
