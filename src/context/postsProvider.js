import React, { useState } from 'react';
import { PostsContext } from './postsContext';

export const PostsProvider = ({ children }) => {
    const [postsState, setPostsState] = useState({});

    return (
        <PostsContext.Provider value={{ postsState, setPostsState }}>
            {children}
        </PostsContext.Provider>
    );

}


