function Signup({ onLogin }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[url('/gym-bg-final.jpg')] bg-cover bg-center text-white">

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Main Container */}
            <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <img
                        src="/iron-gym-logo.png"
                        alt="Iron Gym"
                        className="w-32 sm:w-40"
                    />

                    <p className="pt-2 text-xs text-white/80 sm:text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onLogin}
                            className="ml-1 font-semibold text-green-400 sm:ml-2"
                        >
                            Log In →
                        </button>
                    </p>

                </div>

                {/* Main Content */}
                <div className="mt-6 flex min-h-[calc(100vh-110px)] items-center justify-center gap-16 lg:mt-0">

                    {/* Left Section */}
                    <div className="hidden pt-10 lg:block lg:w-[52%]">

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

                    {/* Signup Card */}
                    <div className="w-full max-w-[500px] ">

                        <div className="rounded-3xl border border-white/20 bg-black/45 px-5 py-5 backdrop-blur-md sm:px-6">

                            {/* Heading */}
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Create Your Account
                            </h2>

                            <p className="mt-1 text-xs text-white/60 sm:text-sm">
                                Join Iron Gym and start your fitness journey
                            </p>

                            {/* Form */}
                            <form className="mt-5">

                                {/* Username */}
                                <div>

                                    <label className="text-xs font-medium">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Choose a username"
                                        className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                    />

                                </div>

                                {/* Email */}
                                <div className="mt-3">

                                    <label className="text-xs font-medium">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                    />

                                </div>

                                {/* Password + Confirm Password */}
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    {/* Password */}
                                    <div>

                                        <label className="text-xs font-medium">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Create a password"
                                            className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                        />

                                    </div>

                                    {/* Confirm Password */}
                                    <div>

                                        <label className="text-xs font-medium">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                            className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                        />

                                    </div>

                                </div>

                                {/* Create Account */}
                                <button
                                    type="submit"
                                    className="mt-5 w-full rounded-xl bg-green-400 py-2.5 font-semibold text-black transition hover:bg-green-300"
                                >
                                    Create Account →
                                </button>

                            </form>

                            {/* Terms */}
                            <p className="mt-3 text-center text-[10px] text-white/50">
                                By creating an account, you agree to our{" "}
                                <span className="text-green-400">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-green-400">
                                    Privacy Policy
                                </span>
                                .
                            </p>
                            

                        </div>

                        <p className="absolute bottom-5 right-8 text-xs tracking-[0.3em] text-white/50 lg:right-16">
          STRONGER EVERYDAY
          <span className="ml-3 text-green-400">━━━</span>
        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;