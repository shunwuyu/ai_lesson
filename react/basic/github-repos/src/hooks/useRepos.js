import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { getRepos } from '../api/github';

const useRepos = (username) => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    getRepos(username)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      });
  }, [username]);

  return state;
};

export default useRepos;
