import React from "react";

const ForCreatives = () => {
  const cards = [
    {
      icon: "/Sparkles.svg",
      title: "Artists",
      text: "Invite members to your own exclusive gallery.",
    },
    {
      icon: "/Puzzle.svg",
      title: "Gaming",
      text: "Serve your game to owners of a specific NFT.",
    },
    {
      icon: "/Speaker.svg",
      title: "Musicians",
      text: "Send your music directly to your fanbase.",
    },
    {
      icon: "/Pencil.svg",
      title: "Writers",
      text: "Share the next best seller directly with your readers.",
    },
    {
      icon: "/Video.svg",
      title: "Filmmakers",
      text: "Exclusive invites to movie premieres and private events.",
    },
    {
      icon: "/Globe.svg",
      title: "Sports",
      text: "Give fans access to exclusive content through their NFTs.",
    },
  ];
  return (
    <div className="w-full text-center py-16">
      <div>
        <h1 className="text-3xl font-bold">For creatives of all kinds</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 container m-auto text-center">
        {cards.map((c) => {
          return (
            <div key={c.title} className="p-8 bg-pinata-light-blue rounded-sm text-left">
              <div>
                <img src={c.icon} alt="icon" />
              </div>
              <h3 className="mt-4 font-bold text-xl">{c.title}</h3>
              <p className="mt-4 font-light">{c.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForCreatives;
