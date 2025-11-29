import HeartBackground from "@/components/RealisticBackground";
import Login from "./components/Login";

const Page = () => {
    return (
        <div className="relative min-h-screen grid place-items-center px-6 bg-black overflow-hidden">

            <HeartBackground />
            <Login />
        </div>
    );
};

export default Page;
