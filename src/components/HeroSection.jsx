import { RoomCamera } from "./Hero/RoomCamera";
import RoomCards from "./Hero/RoomCards";
import { RoomList } from "./Hero/RoomControls";
import { WeatherForecast } from "./Hero/RoomForeCast";

export default function SmartHomeHero() {
  return (
    <div className="bg-background text-foreground p-4 w-full !bg-[#23252F] !text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Smart Home Automation System
          </h2>
          <RoomCamera />
          <RoomCards />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">Your Room</h2>
          <RoomList />
          <WeatherForecast />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Home Pod</h3>
              <p className="text-sm text-muted-foreground">Not Playing</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Energy Consumption today
              </h3>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">60kwh</div>
                <div className="text-sm text-muted-foreground">Cost $40</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
