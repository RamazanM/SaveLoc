import type { PlaceResponse } from "~/common/types";
import type { Route } from "./+types/home";
import ProtectedRoute from "./protected-route";
import Card from "@mui/material/Card";
import { Link } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddPlaceDialog from "~/components/add-place-dialog";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const dummyData: Array<PlaceResponse> = [
  {
    id: "1a3f9b2e-8d4c-4f1a-a9d2-0b6c2f8f9e01",
    name: "Gala Gölü",
    description:
      "Edirne yakınlarındaki kuş cenneti, yürüyüş ve fotoğrafçılık için ideal.",
    lat: 41.6782,
    long: 26.5547,
    createdBy: "rammy",
    createdDate: "2025-10-14T23:27:13.717Z",
    modifiedDate: "2025-10-14T23:27:13.717Z",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
  },
  {
    id: "2b6c4d7a-3f1e-49c4-9e7a-2b9d5d7c0a12",
    name: "Saroz Körfezi",
    description: "Temiz denizi ve sakin koylarıyla kamp ve yüzme için popüler.",
    lat: 40.6139,
    long: 26.5925,
    createdBy: "user_ak",
    createdDate: "2025-09-02T10:12:45.000Z",
    modifiedDate: "2025-10-10T08:05:30.000Z",
    photos: [
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    ],
  },
  {
    id: "3c8d5e6f-9b2a-4e3c-b7d1-5f0a7c9e1b23",
    name: "Karaağaç",
    description: "Tarihi tren istasyonu ve nehir kenarıyla sakin bir semt.",
    lat: 41.6679,
    long: 26.5453,
    createdBy: "editor01",
    createdDate: "2025-08-20T14:30:00.000Z",
    modifiedDate: "2025-09-18T12:00:00.000Z",
    photos: ["https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0"],
  },
  {
    id: "4d9e6f7a-0c3b-4b2f-a8f3-7c1d2e3f4a34",
    name: "Meriç Nehri Kenarı",
    description: "Gün batımı manzaralarıyla ünlü nehir kıyısı.",
    lat: 41.679,
    long: 26.555,
    createdBy: "photographer89",
    createdDate: "2025-07-01T07:22:10.000Z",
    modifiedDate: "2025-10-01T09:11:05.000Z",
    photos: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455",
    ],
  },
  {
    id: "5e0f7a8b-1d4c-4a3e-b9f4-8d2e3f4b5c45",
    name: "Enez Sahili",
    description:
      "Uzun plajları ve sakin atmosferiyle aileler için uygun bir sahil.",
    lat: 40.7269,
    long: 26.0851,
    createdBy: "beachlover",
    createdDate: "2025-06-15T16:45:00.000Z",
    modifiedDate: "2025-09-20T11:30:00.000Z",
    photos: [
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    ],
  },
  {
    id: "6f1a8b9c-2e5d-4b4f-c0a5-9e3f5b6c7d56",
    name: "İpsala Ovası",
    description:
      "Geniş tarım arazileri, özellikle pirinç tarlalarıyla bilinir.",
    lat: 40.9212,
    long: 26.3821,
    createdBy: "farmer01",
    createdDate: "2025-05-05T06:10:00.000Z",
    modifiedDate: "2025-08-30T10:00:00.000Z",
    photos: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
  },
  {
    id: "7g2b9c0d-3f6e-4c5a-d1b6-0f4a6b7c8d67",
    name: "Lalapaşa Ormanları",
    description: "Doğa yürüyüşleri ve piknik için tercih edilen ormanlık alan.",
    lat: 41.8781,
    long: 26.7505,
    createdBy: "hiker_tur",
    createdDate: "2025-04-18T13:00:00.000Z",
    modifiedDate: "2025-09-12T14:20:00.000Z",
    photos: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
    ],
  },
  {
    id: "8h3c0d1e-4g7f-4d6b-e2c7-1g5b8c9d0e78",
    name: "Süleoğlu Barajı",
    description:
      "Balıkçılık ve kamp aktiviteleri için huzurlu bir baraj alanı.",
    lat: 41.7892,
    long: 26.9723,
    createdBy: "angler42",
    createdDate: "2025-03-10T09:15:00.000Z",
    modifiedDate: "2025-07-25T18:40:00.000Z",
    photos: [
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
  },
  {
    id: "9i4d1e2f-5h8g-4e7c-f3d8-2h6c9d0e1f89",
    name: "Uzunköprü",
    description: "Tarihi taş köprü; mimarisi ve uzun yapısıyla ünlü.",
    lat: 41.2664,
    long: 26.6854,
    createdBy: "historybuff",
    createdDate: "2025-02-20T12:00:00.000Z",
    modifiedDate: "2025-08-05T09:00:00.000Z",
    photos: [
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    ],
  },
  {
    id: "0j5e2f3g-6i9h-4f8d-g4e9-3i7d0e1f2g90",
    name: "Keşan Kent Ormanı",
    description: "Hafta sonu kaçamakları için piknik ve yürüyüş alanı.",
    lat: 40.8531,
    long: 26.6358,
    createdBy: "family_weekend",
    createdDate: "2025-01-10T08:00:00.000Z",
    modifiedDate: "2025-06-30T17:25:00.000Z",
    photos: [
      "https://images.unsplash.com/photo-1470246973918-29a93221c455",
      "https://images.unsplash.com/photo-1523867573496-2361e5a4c9d8",
    ],
  },
];

function Place(location: PlaceResponse) {
  return (
    <Link to={"place/" + location.id}>
      <Card
        className="relative size-full aspect-square overflow-hidden rounded-2xl shadow-md"
        style={{
          backgroundImage: `url(${location.photos[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="size-full flex flex-col justify-between items-center">
          <h1 className="text-xl font-bold drop-shadow-2xl">{location.name}</h1>
          <p className="p-2 drop-shadow-2xl">{location.description}</p>
        </div>
        <div className="absolute inset-0 bg-black/40 hover:bg-transparent" />{" "}
      </Card>
    </Link>
  );
}

export default function Places() {
  const [showModal, setShowModal] = useState(false);
    function onFabClick(){setShowModal(true)}
    function close(){setShowModal(false)}
  return (
    <ProtectedRoute>
      <div className="max-h-svh p-10 pt-20 grid grid-cols-3 gap-5 overflow-scroll">
        {dummyData.map((data, index) => Place(data))}
      </div>
      <div className="fixed bottom-15 right-15">
        <Fab color="primary" aria-label="add" onClick={onFabClick}>
          <AddIcon />
        </Fab>
      </div>
      <AddPlaceDialog open={showModal} onClose={close}></AddPlaceDialog>
    </ProtectedRoute>
  );
}
