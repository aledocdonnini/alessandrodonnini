import Aurora from "components/Aurora";
import Squares from "components/Squares";
import useWindowSize from "hooks/useWindowSize";

export default function Home() {
  const size = useWindowSize();
  const squareSize = size.width >= 768 ? 40 : 20;
  return (
    <>
      <Aurora colorStops={["#00d8ff", "#66ff9c", "#00d8ff"]} speed={0.5} />
      <Squares
        speed={0.5}
        squareSize={squareSize}
        direction="down" // up, down, left, right, diagonal
        borderColor="rgba(102, 255, 156,.05)"
        hoverFillColor="rgba(102, 255, 156,.15)"
      />
      <div className="h-screen flex items-start justify-start p-[10vw] md:p-[3vw] bg-black text-[#daf6ff] text-[6vw] md:text-[1.5vw] leading-[0.9] text-shadow">
        <div className="relative z-10">
          <div>Alessandro</div>
          <div>
            Donnini<span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </>
  );
}
