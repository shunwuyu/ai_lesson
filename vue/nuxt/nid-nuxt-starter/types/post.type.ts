
  export type PostUser = {
    id: number;
    name: string;
  };
  
  export type Post = {
    id: number;
    title: string;
    content: string;
    user: PostUser;
  };
  
  export type PostList = Array<Post>;