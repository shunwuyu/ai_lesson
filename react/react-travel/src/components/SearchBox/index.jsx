import {
    memo,
    useRef,
    useEffect,
    useState,
    useMemo
} from 'react';
import styles from './styles.module.css';
import {
    ArrowLeft,
    Close
} from '@react-vant/icons'
import { debounce } from '../../utils/index';

const SearchBox = (props) => {
    const [query, setQuery] = useState("")
    const { handleQuery } = props;
    let handleQueryDebounce = useMemo(() => {
        // console.log('/////????')
        return debounce(handleQuery, 500);
    }, []);
    
    // console.log(handleQueryDebounce);

    useEffect(() => {
        queryRef.current.focus();
    }, []);
    useEffect(() => {
        // console.log('////', query)
        handleQueryDebounce(query);
        // eslint-disable-next-line 
    }, [query]);
    const queryRef = useRef(null);
    const handleChange = (e) => {
        let val = e.currentTarget.value
        setQuery(val);
    }
    const clearQuery = () => {
        setQuery('');
        queryRef.current.value = '';
        queryRef.current.focus();
    }
    const displayStyle = query?{display: 'block'}:{display: 'none'};
    return (
        <div className={styles.wrapper}>
            <ArrowLeft onClick={() => history.go(-1)} />
            <input ref={queryRef} className={styles.box} placeholder="搜索歌曲、歌手、专辑" onChange={handleChange}/>
            <Close onClick={clearQuery} className={styles.clear} style={displayStyle}/>
        </div>
    );
}
export default memo(SearchBox);