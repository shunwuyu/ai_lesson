import styles from './search.module.css';
import {
  useState,
  useEffect
} from 'react'
import SearchBox from '../../components/SearchBox';
import useSearchStore from '../../store/useSearchStore'

const Search = () => {
  const searchBack = () => {}
  const [query, setQuery] = useState('');
  const { 
    suggestList,
    setSuggestList,
    hotList,
    setHotList,
    searchHistory,
    addHistory,
    clearHistory
  } = useSearchStore();

  useEffect(() => {
    setHotList();
  }, [])

  const handleQuery = (q) => {
    setQuery(q);
    if(!q) return;
    addHistory(q);
    setSuggestList(q);
  }
  
  const suggestListStyle = {
    display: query === '' ? 'none' : 'block'
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SearchBox  handleQuery={handleQuery}></SearchBox>
        <div className={styles.suggestWrapper}>
          <div className={styles.hot}>
            <h1 className="title">热门推荐</h1>
            {hotList.map((item, index) =>(
              <div key={item.id} className={styles.item}>
                {item.city}
              </div>
            ))}
          </div>
          <div className={styles.history}>
    <h2>搜索历史</h2>

    {searchHistory.length > 0 ? (
      <>
        <ul className={styles.historyList}>
          {searchHistory.map((keyword, index) => (
            <li key={index} className={styles.historyItem}>
              {keyword}
            </li>
          ))}
        </ul>

        <button
          className={styles.clearBtn}
          onClick={clearHistory}
        >
          清空历史
        </button>
      </>
    ) : (
      <p className={styles.empty}>暂无搜索历史</p>
    )}
  </div>
          <div style={suggestListStyle} className={styles.list}>
            <h1 className="title">相关旅游资讯</h1>
            {suggestList.map((item, index) =>(
              <div key={item} className={styles.item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )  
}

export default Search