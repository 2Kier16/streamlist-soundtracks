import React, { Children, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({ name: username });
        localStorage.setItem('user', JSON.stringify({ name: username }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user')
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};