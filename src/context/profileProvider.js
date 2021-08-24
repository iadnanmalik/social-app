import React, { useState } from 'react';
import { ProfileContext } from './profileContext';

export const ProfileProvider = ({ children }) => {
    const [profileState, setProfileState] = useState({});

    return (
        <ProfileContext.Provider value={{ profileState, setProfileState }}>
            {children}
        </ProfileContext.Provider>
    );

}

