import { useState } from "react";
import { Lightbulb, Thermometer, Wind, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function RoomCards() {
  // Use state to manage the cards data
  const [cardsData, setCardsData] = useState([
    {
      title: "Light",
      icon: <Lightbulb />,
      duration: "2h 20min",
      color: "bg-purple-900",
      isOn: false,
    },
    {
      title: "Thermostat",
      icon: <Thermometer />,
      duration: "3h 20min",
      color: "bg-orange-500",
      isOn: true,
    },
    {
      title: "AC",
      icon: <Wind />,
      duration: "1h 58min",
      color: "bg-gray-700",
      isOn: false,
    },
    {
      title: "Music System",
      icon: <Volume2 />,
      duration: "2h 14min",
      color: "bg-blue-500",
      isOn: true,
    },
  ]);

  // Handler to toggle the switch
  const handleToggle = (index) => {
    // Create a new array to update the specific card's isOn state
    const updatedCards = [...cardsData];
    updatedCards[index].isOn = !updatedCards[index].isOn;
    setCardsData(updatedCards); // Update the state with the new array
  };

  return (
    <div className="flex flex-wrap gap-3 justify-between p-4  ">
      {cardsData.map((card, index) => (
        <ControlCard
          key={index}
          {...card}
          onChange={() => handleToggle(index)} // Pass the handler to toggle
        />
      ))}
    </div>
  );
}

function ControlCard({ title, icon, duration, color, isOn, onChange }) {
  return (
    <Card
      className={`w-[200px] h-[200px] bg-[#23252F] ${
        isOn ? color : ""
      } text-white rounded-xl overflow-hidden`}
    >
      <CardContent className="p-4 flex flex-col items-center justify-between h-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium">{isOn ? "On" : "Off"}</span>
          <Switch
            checked={isOn}
            onCheckedChange={onChange} // Call onChange when the switch is toggled
            className="data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-700"
          />
        </div>
        <div className="mb-2 p-4 relative border border-white rounded-full before:absolute before:inset-0 before:blur-md before:bg-white/30 before:rounded-full">
          <span className="relative z-10">{icon}</span>
        </div>

        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-white font-semibold text-xl">{duration}</p>
      </CardContent>
    </Card>
  );
}

export default RoomCards;
