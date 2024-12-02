import React from 'react'
import AppCard from '../../app/components/app-card'
import './post-index.css' //-----

class PostIndex extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        postList: [
            {
                id: 1,
                content: '故人西辞去黄鹤楼，烟花三月下扬州',
                author: '李白'
            },
            {
                id: 2,
                content: '好雨知时节，当春乃发生',
                author: '李白'
            },
            {
                id: 3,
                content: '浔阳江头夜送客，枫叶荻花秋瑟瑟',
                author: '白居易'
            },
        ]
    }
  }

  render() {
    const posts = this.state.postList.map((post) => {
        const footer = <small> - {post.author}</small>
        return (
            <AppCard key={post.id} footer={footer}>
            {post.content}
            </AppCard>
        )
     })
    // return (
    
    //   <div>
    //     <h1>Post Index</h1>
    //   </div>
    // )
    // ---
    return (
        <div className="post-index">
            <div className="content">{posts}</div>
        </div>
    )
  }
}

export default PostIndex