import { Route } from "react-router-dom";
import PostIndex from './post-index.jsx';
import PostShow from './post-show.jsx';


export const postRoutes = (
    <>
        <Route path="posts" element={<PostIndex />}/>
        <Route path="posts/:postId" element={<PostShow />}/>
    </>
)
