function Login({ onSignup }) {
    return (
        <div className="relative min-h-screen overflow-hidden text-white">

            {/* Background */}
            <div className="absolute inset-0">

                <div className="absolute inset-0 bg-[url('/gym-bg-final.jpg')] bg-cover bg-center blur-sm scale-105 lg:blur-0 lg:scale-100"></div>

                <div className="absolute inset-0 bg-black/70 lg:bg-black/55"></div>

            </div>

            {/* Main Container */}
            <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <img
                        src="/iron-gym-logo.png"
                        alt="Iron Gym"
                        className="w-32 sm:w-40 lg:w-48"
                    />

                    <p className="pt-2 text-xs text-white/80 sm:text-sm">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={onSignup}
                            className="ml-1 font-semibold text-green-400 sm:ml-2"
                        >
                            Sign Up
                        </button>
                    </p>

                </div>

                {/* Main Content */}
                <div className="mt-6 flex min-h-[calc(100vh-110px)] items-center justify-center gap-16 lg:mt-0 lg:justify-between">

                    {/* Left Hero Section */}
                    <div className="hidden lg:block lg:w-[52%]">

                        <h1 className="text-[58px] font-extrabold italic leading-[0.95] xl:text-[64px]">
                            A STRONGER
                            <br />
                            YOU STARTS
                            <br />
                            <span className="text-green-400">
                                HERE
                            </span>
                        </h1>

                        <p className="mt-5 text-lg text-white/90">
                            Discipline today for a better tomorrow.
                        </p>

                        {/* Features */}
                        <div className="mt-16 flex max-w-[600px]">

                            {/* Build Strength */}
                            <div className="flex w-1/3 flex-col items-center">

                                <div className="text-2xl text-green-400">
                                    ♡
                                </div>

                                <p className="mt-2 text-center text-sm font-bold">
                                    BUILD
                                    <br />
                                    STRENGTH
                                </p>

                            </div>

                            {/* Improve Health */}
                            <div className="flex w-1/3 flex-col items-center border-l border-white/20">

                                <div className="text-2xl text-green-400">
                                    ▥
                                </div>

                                <p className="mt-2 text-center text-sm font-bold">
                                    IMPROVE
                                    <br />
                                    HEALTH
                                </p>

                            </div>

                            {/* Achieve Goals */}
                            <div className="flex w-1/3 flex-col items-center border-l border-white/20">

                                <div className="text-2xl text-green-400">
                                    ◎
                                </div>

                                <p className="mt-2 text-center text-sm font-bold">
                                    ACHIEVE
                                    <br />
                                    GOALS
                                </p>

                            </div>

                        </div>

                        {/* Quote */}
                        <p className="mt-12 text-[10px] tracking-[0.25em] text-white/60">
                            "FITNESS IS NOT A DESTINATION,
                            <br />
                            IT'S A LIFESTYLE."
                        </p>

                    </div>

                    {/* Login Card */}
                    <div className="w-full max-w-[540px]">

                        <div className="rounded-3xl border border-white/20 bg-black/50 px-5 py-6 backdrop-blur-md sm:px-6">

                            {/* Heading */}
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Welcome Back
                            </h2>

                            <p className="mt-1 text-xs text-white/60 sm:text-sm">
                                Log in to continue your fitness journey
                            </p>

                            {/* Form */}
                            <form className="mt-6">

                                {/* Username / Email */}
                                <div>

                                    <label className="text-xs font-medium sm:text-sm">
                                        Username or Email
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Email address or username"
                                        className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                    />

                                </div>

                                {/* Password */}
                                <div className="mt-5">

                                    <label className="text-xs font-medium sm:text-sm">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                    />

                                </div>

                                {/* Remember + Forgot */}
                                <div className="mt-4 flex items-center justify-between">

                                    <label className="flex items-center gap-2 text-xs text-white/70 sm:text-sm">

                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-green-400"
                                        />

                                        Remember me

                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs text-white/80 underline transition hover:text-green-400 sm:text-sm"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-xl bg-green-400 py-3 font-semibold text-black transition hover:bg-green-300"
                                >
                                    Log In →
                                </button>
                            </form>
                            {/* Bottom Signup */}
                            <p className="mt-6 text-center text-xs text-white/60 sm:text-sm">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={onSignup}
                                    className="font-semibold text-green-400"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Bottom Right Text */}
                <div className="absolute bottom-5 right-6 hidden items-center gap-3 lg:flex">
                    <p className="text-[10px] tracking-[0.25em] text-white/60">
                        STRONGER EVERYDAY
                    </p>
                    <div className="h-[2px] w-8 bg-green-400"></div>
                </div>
            </div>
        </div>
    );
}
export default Login;