import React from "react";
import {
  ShieldCheckIcon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <div className="flex justify-between p-15">
      <div className="flex row gap-2">
        <ShieldCheckIcon className="size-6" />
        <div>
          <h2>High Quality</h2>
          <p>Duarable and long-lasting</p>
        </div>
      </div>
      <div className="flex row gap-2">
        <GlobeAsiaAustraliaIcon className="size-6" />
        <div>
          <h2>Eco-Friendl</h2>
          <p>Duarable and long-lasting</p>
        </div>
      </div>
      <div className="flex row gap-2">
        <LightBulbIcon className="size-6" />
        <div>
          <h2>Unique design</h2>
          <p>Duarable and long-lasting</p>
        </div>
      </div>
    </div>
  );
}
