function Login({ onSignup }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/gym-bg-final.jpg')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative z-10 min-h-screen px-8 py-6 lg:px-16">
        {/* Header */}
        <div className="flex items-start justify-between">
          <img src="/iron-gym-logo.png" alt="Iron Gym" className="w-48" />
        </div>

        {/* Content */}
        <div className="mt-12 flex items-start justify-between lg:mt-10">
          {/* Left Section */}
          <div className="pt-16 lg:w-[55%]">
            <h1 className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-[78px]">
              A STRONGER
              <br />
              YOU STARTS
              <br />
              <span className="text-green-400">HERE</span>
            </h1>

            <p className="mt-5 text-lg text-white/90">
              Discipline today for a better tomorrow.
            </p>

            {/* Features */}
            <div className="mt-10 flex max-w-[600px]">
              <div className="flex w-1/3 flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-2xl text-green-400">
                  ♡
                </div>

                <p className="mt-3 text-center text-sm font-bold">
                  BUILD
                  <br />
                  STRENGTH
                </p>
              </div>

              <div className="flex w-1/3 flex-col items-center border-l border-white/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-2xl text-green-400">
                  ♡
                </div>

                <p className="mt-3 text-center text-sm font-bold">
                  IMPROVE
                  <br />
                  HEALTH
                </p>
              </div>

              <div className="flex w-1/3 flex-col items-center border-l border-white/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-2xl text-green-400">
                  ◎
                </div>

                <p className="mt-3 text-center text-sm font-bold">
                  ACHIEVE
                  <br />
                  GOALS
                </p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-[500px]">
            <div className="rounded-3xl border border-white/30 bg-black/45 p-8 backdrop-blur-md">
              <h2 className="text-4xl font-bold">Welcome Back</h2>

              <p className="mt-2 text-white/60">
                Log in to continue your fitness journey
              </p>

              <form className="mt-7">
                <div>
                  <label className="text-sm">Username or Email</label>

                  <input
                    type="text"
                    placeholder="Email address or username"
                    className="mt-2 w-full rounded-xl border border-white/25 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-white/35 focus:border-green-400"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm">Password</label>

                  <input
                    type="password"
                    placeholder="Password"
                    className="mt-2 w-full rounded-xl border border-white/25 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-white/35 focus:border-green-400"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/70">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-green-400"
                    />
                    Remember me
                  </label>

                  <button type="button" className="text-white/80 underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-green-400 py-3.5 font-semibold text-black hover:bg-green-300"
                >
                  Log In →
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-white/60">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSignup}
                  className="font-semibold text-green-400 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="absolute bottom-5 left-8 text-xs tracking-[0.25em] text-white/60 lg:left-16">
          "FITNESS IS NOT A DESTINATION,
          <br />
          IT'S A LIFESTYLE."
        </p>

        <p className="absolute bottom-5 right-8 text-xs tracking-[0.3em] text-white/50 lg:right-16">
          STRONGER EVERYDAY
          <span className="ml-3 text-green-400">━━━</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
