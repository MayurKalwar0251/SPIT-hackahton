export function RoomList() {
  const rooms = [
    { name: "Leaving Room", icon: "🛋️", devices: 3 },
    { name: "Kitchen", icon: "🍳", devices: 2 },
    { name: "Bed Room", icon: "🛏️", devices: 4 },
    { name: "Bath Room", icon: "🚿", devices: 2 },
    { name: "Dining Room", icon: "🍽️", devices: 5 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-4 ">
      {rooms.map((room) => (
        <div
          key={room.name}
          className="p-4 bg-transparent border rounded-lg text-center text-white"
        >
          <div className="text-2xl mb-1">{room.icon}</div>
          <div className="text-sm font-medium">{room.name}</div>
          <div className="text-xs text-muted-foreground">
            {room.devices} Devices
          </div>
        </div>
      ))}
      <div className="p-2 bg-secondary rounded-lg text-center flex flex-col items-center justify-center text-black">
        <div className="text-2xl mb-1">+</div>
        <div className="text-sm font-medium ">Add Room</div>
      </div>
    </div>
  );
}
