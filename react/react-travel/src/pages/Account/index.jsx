import React, { useState } from 'react';
import { Cell, CellGroup, Image, ActionSheet, Popup, Loading } from 'react-vant';
import {
  FriendsO,
  StarO,
  SettingO,
  ServiceO,
  UserCircleO,
} from '@react-vant/icons';
import {
  generateAvatar
} from '../../llm';

export default function Account() {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    nickname: '奶龙',
    level: 3,
    signature: '保持热爱，奔赴山海。',
  })
  const [loading, setLoading] = useState(false);
  const handleAction = async (e) => {
    console.log(e)
    
    if (e.type === 2) {
      // ai 生图
      setShowActionSheet(false)
      setLoading(true);
      const prompt = `
      请你生成一个用户的头像，
      他的昵称是${userInfo.nickname},
      他的签名是:${userInfo.signature}。
      `
      const res = await generateAvatar(prompt);
      console.log(res);
      setUserInfo({
        ...userInfo,
        avatar: res.avatar,
      })
      setLoading(false);
    }
  }
  
  const actions2 = [
    { name: '上传头像', color: '#ee0a24', type: 1 },
    { name: 'AI生成头像', color: '#123123', type: 2 },
  ]

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* 顶部用户信息 */}
      <div style={{ backgroundColor: '#fff', padding: '20px 16px', display: 'flex', alignItems: 'center' }}>
        <Image
          round
          width="64px"
          height="64px"
          src={userInfo.avatar}
          onClick={() => setShowActionSheet(true)} // 点击头像弹出 ActionSheet
          style={{ cursor: 'pointer' }}
        />
        <div style={{ marginLeft: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 500 }}>昵称：{userInfo.nickname}</div>
          <div style={{ fontSize: 14, color: '#999', marginTop: 4 }}>等级：{userInfo.level}</div>
          <div style={{ fontSize: 12, color: '#ccc', marginTop: 4 }}>签名：{userInfo.signature}</div>
        </div>
      </div>

      {/* Cell 分组 */}
      <div style={{ marginTop: 12 }}>
        <CellGroup inset>
          <Cell title="服务" icon={<ServiceO />} isLink />
        </CellGroup>

        <CellGroup inset style={{ marginTop: 8 }}>
          <Cell title="收藏" icon={<StarO />} isLink />
          <Cell title="朋友圈" icon={<FriendsO />} isLink />
        </CellGroup>

        <CellGroup inset style={{ marginTop: 8 }}>
          <Cell title="设置" icon={<SettingO />} isLink />
        </CellGroup>
      </div>

      {/* ActionSheet 弹出层 */}
       <ActionSheet
        visible={showActionSheet}
        actions={actions2}
        cancelText='取消'
        onCancel={() => setShowActionSheet(false)}
        onSelect={(e) => handleAction(e)}
      />
      {
        loading && <div className="fixed-loading"><Loading type="ball" /></div>
      } 
    </div>
  );
}