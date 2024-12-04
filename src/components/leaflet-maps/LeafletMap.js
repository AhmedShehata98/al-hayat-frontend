"use client";

import dynamic from "next/dynamic";
import React from "react";
import { TileLayer } from "react-leaflet";
import { Marker, MarkerProps } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
const MapContainer = dynamic(
  async () => (await import("react-leaflet/MapContainer")).MapContainer,
  {
    ssr: false,
  }
);

function LeafletMap({ children, center, ...rest }) {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>{children}</Popup>
      </Marker>
    </>
  );
}

export default React.memo(
  LeafletMap,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
