import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer, IconLayer } from "@deck.gl/layers";
import { api } from "../utils/api";
import moment from "moment";

const Map: NextPage = () => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 7,
    latitude: 18,
    zoom: 3,
    pitch: 40,
    bearing: 30,
  };

  // Data to be used by the LineLayer
  const linesMap = [
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

  const createSVGIcon = (d) => {
    let g = 255;
    let r = 0;
    if (
      moment().isAfter(
        moment(d.dateOfLastWatering).add(d.howOftenToWaterInHours, "hours")
      )
    ) {
      g = 0;
      r = 255;
    }
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="12" r="10" fill="rgb(${r}, ${g}, 0)" stroke="#00" stroke-width="2"/>
      </svg>
    `;
  };

  const svgToDataURL = (svg: string) => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };
  const { data: flowersDataQ } = api.flowers.getAll.useQuery();

  useEffect(() => {
    const mapData = flowersDataQ?.map((x) => ({
      ...x,
      position: [x.coordinateX, x.coordinateY],
    }));
    setFlowersData(mapData as any);
  }, [flowersDataQ]);
  const [flowersData, setFlowersData] = useState([]);

  const [mapControls, setMapControls] = useState(true);

  const updateCoordinates = api.flowers.updateCoordinates.useMutation();
  const onDragStart = (d: any) => {
    setMapControls(false);
  };
  const onDragEnd = (d: any) => {
    const flower = flowersData[d.index];
    updateCoordinates.mutate({
      id: flower.id,
      coordinateX: flower.position[0],
      coordinateY: flower.position[1],
    });
    setMapControls(true);
  };
  const onDrag = (d: any) => {
    const newFlowersData = [...flowersData];
    const flower = newFlowersData[d.index];
    flower!.position = [...d.coordinate];
    setFlowersData(newFlowersData);
  };

  const layers = [
    new LineLayer({ id: "line-layer", data: linesMap }),
    new IconLayer({
      data: flowersData,
      getIcon: (d: any) => ({
        url: svgToDataURL(createSVGIcon(d)),
        width: 30,
        height: 30,
      }),
      onDragStart: (d: any) => onDragStart(d),
      onDragEnd: (d: any) => onDragEnd(d),
      onDrag: (d: any) => onDrag(d),
      pickable: true,
      sizeScale: 30,
    }),
  ];

  return (
    <>
      <div className="relative h-[80vh] w-full">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={mapControls}
          layers={layers}
          getTooltip={({ object }) => object && `${object.name}`}
        />
      </div>
    </>
  );
};

export default Map;
