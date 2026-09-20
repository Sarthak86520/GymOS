import { useState } from "react";

function Signup({ onLogin }) {
    const [accountType, setAccountType] = useState("member");

    return (
        <div className="relative min-h-screen overflow-hidden bg-[url('/gym-bg-final.jpg')] bg-cover bg-center text-white">

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Main Container */}
            <div className="relative z-10 min-h-screen px-6 py-4 lg:px-12">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <img
                        src="/iron-gym-logo.png"
                        alt="Iron Gym"
                        className="w-40"
                    />

                    <p className="pt-2 text-xs text-white/80 sm:text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onLogin}
                            className="ml-2 font-semibold text-green-400"
                        >
                            Log In →
                        </button>
                    </p>

                </div>

                {/* Main Content */}
                <div className="mt-2 flex items-start justify-between gap-8">

                    {/* Left Section */}
                    <div className="hidden pt-24 lg:block lg:w-[52%]">

                        <h1 className="text-[64px] font-extrabold italic leading-[0.95]">
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
                    <div className="w-full max-w-[650px] lg:w-[650px]">

                        <div className="rounded-3xl border border-white/20 bg-black/45 px-6 py-4 backdrop-blur-md">

                            {/* Heading */}
                            <h2 className="text-3xl font-bold">
                                Create Your Account
                            </h2>

                            <p className="mt-1 text-sm text-white/60">
                                Join Iron Gym and start your fitness journey
                            </p>

                            {/* Account Type */}
                            <div className="mt-4">

                                <p className="mb-2 text-sm font-semibold">
                                    Select Account Type
                                </p>

                                <div className="grid grid-cols-3 gap-3">

                                    {/* Member */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAccountType("member")
                                        }
                                        className={`h-[95px] rounded-xl border px-2 ${
                                            accountType === "member"
                                                ? "border-green-400 bg-green-400/10"
                                                : "border-white/20 bg-black/20"
                                        }`}
                                    >
                                        <div className="text-xl text-green-400">
                                            ♙
                                        </div>

                                        <p className="mt-1 text-sm font-bold">
                                            Member
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/50">
                                            For gym enthusiasts
                                        </p>
                                    </button>

                                    {/* Trainer */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAccountType("trainer")
                                        }
                                        className={`h-[95px] rounded-xl border px-2 ${
                                            accountType === "trainer"
                                                ? "border-green-400 bg-green-400/10"
                                                : "border-white/20 bg-black/20"
                                        }`}
                                    >
                                        <div className="text-xl text-green-400">
                                            ⚑
                                        </div>

                                        <p className="mt-1 text-sm font-bold">
                                            Trainer
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/50">
                                            For fitness professionals
                                        </p>
                                    </button>

                                    {/* Admin */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAccountType("admin")
                                        }
                                        className={`h-[95px] rounded-xl border px-2 ${
                                            accountType === "admin"
                                                ? "border-green-400 bg-green-400/10"
                                                : "border-white/20 bg-black/20"
                                        }`}
                                    >
                                        <div className="text-xl text-green-400">
                                            ✦
                                        </div>

                                        <p className="mt-1 text-sm font-bold">
                                            Admin
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/50">
                                            For gym management
                                        </p>
                                    </button>

                                </div>

                            </div>

                            {/* Form */}
                            <form className="mt-4">

                                {/* Full Name */}
                                <div>

                                    <label className="text-xs font-medium">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                    />

                                </div>

                                {/* Username + Mobile */}
                                <div className="mt-2.5 grid grid-cols-2 gap-3">

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

                                    <div>

                                        <label className="text-xs font-medium">
                                            Mobile Number
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="Enter your mobile number"
                                            className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-green-400"
                                        />

                                    </div>

                                </div>

                                {/* Email */}
                                <div className="mt-2.5">

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
                                <div className="mt-2.5 grid grid-cols-2 gap-3">

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
                                    className="mt-4 w-full rounded-xl bg-green-400 py-2.5 font-semibold text-black transition hover:bg-green-300"
                                >
                                    Create Account →
                                </button>

                            </form>

                            {/* Terms */}
                            <p className="mt-2.5 text-center text-[10px] text-white/50">
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

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;