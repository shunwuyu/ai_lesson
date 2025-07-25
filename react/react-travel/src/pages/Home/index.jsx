import {
  useEffect
} from 'react';
import { 
  Search,
  Loading
} from 'react-vant';
import {
  useNavigate
} from 'react-router-dom';
import useHomeStore  from '../../store/useHomeStore';
import BannerSwiper from '../../components/BannerSwiper/index.jsx';
import useTitle  from '../../hooks/useTitle.js'

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('点击了搜索');
    navigate('/search');
  };

  const { banners, loading, error, fetchBanners } = useHomeStore();
  useEffect(() => {
    useTitle('奶龙-首页')
    if (!banners.length) {
      fetchBanners();
    }
  }, []);

  return (
    <div className="flex flex-col" style={{height: '100%'}}>
      <div onClick={handleClick}>
        <Search
          readOnly // 设置为只读，防止输入，点击直接跳转
          shape="round"
          placeholder="请输入搜索内容"
        />    
      </div>
      {
        loading && <div className="fixed-loading"><Loading type="ball" /></div>
      }  
      {
        error && <div className="fixed-loading">加载失败</div>
      }
      {
        banners.length > 0  && <BannerSwiper banners={banners} />
      }

      <div className="flex-1 scroll-container">
        
      </div>
    </div>
  )
}

export default Home