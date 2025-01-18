import { useContext } from "react";
import LoginContext from "../context/LoginContext";

function Home() {
    const { loginInfo, setLoginInfo } = useContext(LoginContext);

    return (
        <>
            {loginInfo.isAuthenticated && (
                <div>
                    <h2>Hi, {loginInfo.username}</h2>
                    <p>
                        Here&apos;s the latest posts from your followed Users
                        List!
                    </p>
                </div>
            )}

            <section>
                <h2>Recommended People</h2>

                {/* random users, UserPreview*/}
            </section>

            <section>
                {/* random posts if not logged in / posts from followed user list if logged in*/}
            </section>
        </>
    );
}

export default Home;
