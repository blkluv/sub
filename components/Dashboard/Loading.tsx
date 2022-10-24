import Image from "next/image";

const Loading = () => {
  const animation = {
    // TODO fix the animation
    animation: "wiggle 1s ease-in-out infinite",
  };
  return (
    <Image style={animation} alt="Submarine Logo" height={135} width={200} src="/submarine.png" />
  );
};

export default Loading;
