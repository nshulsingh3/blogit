function Home() {
  return (
    <div className="w-[100vw] h-[100lvh] bg-gradient-to-br from-orange-400/[1] to-red-400/[1] flex-col">
      <nav className="bg-gradient-to-b from-rose-400/[0.8] to-rose-300/[0] flex justify-center">
        <h1 className="text-white text-4xl font-bold my-4">BlogIt</h1>
      </nav>
      <div className="mt-5 text-white flex m-auto flex-1 items-center justify-center content-center">
        <div className="mt-5 bg-white/[0.5] rounded-lg shadow-md p-5 text-slate-700 flex-col m-auto text-center">
          <div>The site will be available soon.</div>
          <div>{"Work in progress :)"}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
