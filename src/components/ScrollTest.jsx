import React from "react";

const ScrollTest = () => {
  return (
    <div className="bg-black text-white min-h-[300vh]">
      {/* Top Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Scroll Down</h1>
      </section>

      {/* Middle Section */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">Keep Scrolling 👇</h2>
      </section>

      {/* Bottom Section */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">End of Scroll</h2>
      </section>
    </div>
  );
};

export default ScrollTest;
