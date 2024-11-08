import { appConfig } from '../config'
const Page = () => {
  return (  
    <div>
      <h1>关于</h1>
      <div>宁浩网创建于2011年</div>
      <div>{appConfig.apiBaseUrl}</div>
    </div>
  );
}
 
export default Page;