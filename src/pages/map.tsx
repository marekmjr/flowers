import { type NextPage } from "next";
import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer, IconLayer } from "@deck.gl/layers";

const Map: NextPage = () => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 0,
    latitude: 0,
    zoom: 0,
    pitch: 0,
    bearing: 0,
  };

  // Data to be used by the LineLayer
  const data = [
    // Main room
    {
      sourcePosition: [0, 0],
      targetPosition: [0, 20],
    },
    {
      sourcePosition: [15, 0],
      targetPosition: [15, 20],
    },
    {
      sourcePosition: [0, 20],
      targetPosition: [15, 20],
    },
    {
      sourcePosition: [0, 0],
      targetPosition: [15, 0],
    },

    // Zasedacka
    {
      sourcePosition: [0, 32],
      targetPosition: [0, 22],
    },
    {
      sourcePosition: [15, 32],
      targetPosition: [15, 22],
    },
    {
      sourcePosition: [0, 22],
      targetPosition: [15, 22],
    },
    {
      sourcePosition: [0, 32],
      targetPosition: [15, 32],
    },

    // Flutter room
    {
      sourcePosition: [17, 32],
      targetPosition: [17, 24],
    },
    {
      sourcePosition: [32, 32],
      targetPosition: [32, 24],
    },
    {
      sourcePosition: [17, 24],
      targetPosition: [32, 24],
    },
    {
      sourcePosition: [17, 32],
      targetPosition: [32, 32],
    },
  ];

  const createSVGIcon = () => {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="rgb(255, 250, 0)" stroke="#fa1" stroke-width="2"/>
      </svg>
    `;
  };

  const svgToDataURL = (svg: string) => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const flowersData = [
    { position: [14, 1], message: "Jsem hezka kytka vedle Davida" },
    { position: [14, 10], message: "Jsme kytky vedle merice CO2 :(" },
  ];

  const layers = [
    new LineLayer({ id: "line-layer", data }),
    new IconLayer({
      data: flowersData,
      getIcon: (d) => ({
        url: svgToDataURL(createSVGIcon()),
        width: 1,
        height: 1,
      }),
      pickable: true,
      sizeScale: 30,
    }),
  ];

  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({ object }) => object && `${object.message}`}
      />
    </>
  );
};

export default Map;
