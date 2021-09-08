import React, { useState } from 'react';
import { PostsContext } from './postsContext';

export const PostsProvider = ({ children }) => {
    const [postsState, setPostsState] = useState({ });
    const [loadingPosts, setLoadingPosts] = useState(true);
    return (
        <PostsContext.Provider value={{ postsState, setPostsState, loadingPosts, setLoadingPosts }}>
            {children}
        </PostsContext.Provider>
    );

}


