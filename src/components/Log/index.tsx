import React, { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getUserData, signIn, signOut } from "../../requests/request";

interface LogProps {
    signOut: (arg0: (a: string) => void) => void;
    authKey: string;
    setAuthKey: (a: string) => void;
}
interface User {
    id: number;
    email: string;
    name: string;
}

const initUserData: User = {
    id: 0,
    email: "",
    name: "",
};

const Log: React.FC<LogProps> = ({ signOut, setAuthKey, authKey }) => {
    const [userData, setUserData] = useState(initUserData);

    useEffect(() => {
        getUserData(authKey, setUserData);
    }, [authKey]);

    return (
        <div>
            {userData.name && (
                <div>
                    <div>id: {userData.id}</div>
                    <div>email: {userData.email}</div>
                    <div>name: {userData.name}</div>
                    <div>
                        <button onClick={() => signOut(setAuthKey)}>
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Log;
