import axios from 'axios';
import { getStory, getStoryIds, newStoriesUrl, storyUrl } from '../services/hnApi';
import { singularStory, storyIds, emptySingularStory } from '../fixtures';

jest.mock('axios');

describe('Hacker news api', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getStory functionality', () => {
    it('request and gets a story from the hacker news api', async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: singularStory })
      );
    
      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(singularStory);
    });

    it('does not retrieve a story from the Api, but handle gracefully', async () => {
      axios.get.mockImplementation(() => 
        Promise.resolve({ data: emptySingularStory })
      );

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(emptySingularStory);
    });
  });
});

describe('getStoryIds functionality', () => {
  it('requets and gets story ids from the hackerNews api', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));

    const entity = await getStoryIds();
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(newStoriesUrl);
    expect(entity).toEqual(storyIds);
  });
});
