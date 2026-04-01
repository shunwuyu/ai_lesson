// api/list.js
import axios from 'axios';
import { getPageData } from '../mock/data';

export function fetchList(page, size) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getPageData(page, size));
    }, 300);
  });
}