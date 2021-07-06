function signIn(setKey: (arg0: string) => void, bodyOption: any): void {
    fetch("https://tager.dev.ozitag.com/api/auth/user", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify(bodyOption),
    })
        .then((response) => response.json())
        .then((server) => {
            if (server.data) {
                setKey(`${server.data.tokenType} ${server.data.accessToken}`);
            } else {
                setKey("no-token");
            }
        })
        .catch((error) => console.log(error));
}

function getUserData(key: string, userData: (arg0: any) => void): void {
    fetch("https://tager.dev.ozitag.com/api/tager/user/profile", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: key,
        },
    })
        .then((response) => response.json())
        .then((server) => userData(server.data))
        .catch((error) => console.log(error));
}

function signOut(setKey: (arg0: string) => void): void {
    setKey("");
}
export { signIn, getUserData, signOut };
