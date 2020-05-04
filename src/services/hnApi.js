import axios from 'axios';
import { selectField } from "../selectors/selectFields";

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const storyUrl = `${baseUrl}item/`;

export const getStory = async storyID => {
  const result = await axios.get(`${storyUrl + storyID}.json`);
  return selectField(result.data);
};

export const getStoryIds = async () => {
  const result = await axios.get(newStoriesUrl);
  return result.data;
}
