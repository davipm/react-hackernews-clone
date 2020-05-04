import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import Story from "../components/Story";
import { singularStory } from "../fixtures";
import { getStory } from "../services/hnApi";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../services/hnApi', () => ({
  getStory: jest.fn()
}));

it('should render the story component with content', async ()  => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  const { getByText, getByTestId } = render(<Story />);
  await waitForElement(() => [
    expect(getByTestId('story')).toBeTruthy(),
    expect(getByText('Web Development: React.js stuff')).toBeTruthy(),
    expect(getByTestId('story-by').textContent).toEqual('by: Davi Pereira'),
  ]);
}); 
