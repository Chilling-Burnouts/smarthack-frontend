export interface IGradientBar {
  sentimentValue: number;
}

export const GradientBar: React.FC<IGradientBar> = ({ sentimentValue }) => {
  const position = ((sentimentValue + 1) / 2) * 100;

  const bearishPos = ((-0.35 + 1) / 2) * 100;
  const somewhatBearishPos = ((-0.15 + 1) / 2) * 100;

  const neutralPosStart = ((-0.15 + 1) / 2) * 100;
  const neutralPosEnd = ((0.15 + 1) / 2) * 100;

  const somewhatBullishPos = ((0.35 + 1) / 2) * 100;

  const middle = (neutralPosStart + neutralPosEnd) / 2;

  return (
    <div className="relative flex items-center w-20 h-full">
      <div className="relative w-10 h-full bg-gradient-to-t from-red-500 via-yellow-500 to-green-500">
        <div
          className="absolute w-10 h-1 bg-black"
          style={{ bottom: `${position}%` }}
        />

        <div
          className="absolute"
          style={{ bottom: `${somewhatBearishPos}%`, left: "0%" }}
        >
          <div className="w-44 h-px bg-blue-500"></div>
        </div>

        <div className="absolute" style={{ bottom: `${middle}%`, left: "0%" }}>
          <div className="w-44 h-px bg-blue-500"></div>
        </div>

        <div
          className="absolute"
          style={{ bottom: `${neutralPosStart}%`, left: "0%" }}
        >
          <div className="w-44 h-px bg-blue-500"></div>
        </div>

        <div
          className="absolute"
          style={{ bottom: `${neutralPosEnd}%`, left: "0%" }}
        >
          <div className="w-44 h-px bg-blue-500"></div>
        </div>

        <div
          className="absolute"
          style={{
            bottom: `${somewhatBullishPos}%`,
            left: "0%",
          }}
        >
          <div className="w-44 h-px bg-blue-500"></div>
        </div>
      </div>

      <div className="left-full ml-2 w-max">
        <div
          className="text-xs whitespace-nowrap"
          style={{
            bottom: `${bearishPos / 2 + 2}%`,
            position: "absolute",
          }}
        >
          Bearish
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            bottom: `${(somewhatBearishPos + neutralPosStart) / 2 + 2}%`,
            position: "absolute",
          }}
        >
          Somewhat-Bearish
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            bottom: `${(neutralPosStart + neutralPosEnd) / 2 + 2}%`,
            position: "absolute",
          }}
        >
          Neutral
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            bottom: `${(neutralPosEnd + somewhatBullishPos) / 2 - 2}%`,
            position: "absolute",
          }}
        >
          Somewhat-Bullish
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            bottom: `${(somewhatBullishPos + 100) / 2 - 2}%`,
            position: "absolute",
          }}
        >
          Bullish
        </div>
      </div>
    </div>
  );
};
