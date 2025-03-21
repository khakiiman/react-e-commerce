import { PiMoonStarsDuotone } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMonitorDuotone } from "react-icons/pi";
import { IconType } from "react-icons";

interface Theme {
  mode: string;
  Icon: IconType;
  id: number;
}

export const themes: Theme[] = [
  { mode: "dark", Icon: PiMoonStarsDuotone, id: 1 },
  { mode: "light", Icon: IoSunnyOutline, id: 2 },
  { mode: "system", Icon: PiMonitorDuotone, id: 3 },
]; 