import Aurora from "components/Aurora";

export default function Home() {
  return (
    <>
      <Aurora colorStops={["#00d8ff", "#66ff9c", "#00d8ff"]} speed={0.5} />{" "}
      <div className="h-screen flex items-end justify-start p-10 bg-black text-[#daf6ff] text-5xl text-shadow">
        <div className="relative z-10">
          <div>Alessandro</div>
          <div>Donnini</div>
        </div>
      </div>
    </>
  );
}
