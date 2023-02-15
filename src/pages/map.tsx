import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer, IconLayer, TextLayer } from "@deck.gl/layers";
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
      sourcePosition: [0, -4],
      targetPosition: [0, 20],
    },
    {
      sourcePosition: [15, -4],
      targetPosition: [15, 20],
    },
    {
      sourcePosition: [0, 20],
      targetPosition: [15, 20],
    },
    {
      sourcePosition: [0, -4],
      targetPosition: [15, -4],
    },

    //Hallroom
    {
      sourcePosition: [16, 5],
      targetPosition: [16, 23],
    },
    {
      sourcePosition: [28, 5],
      targetPosition: [28, 23],
    },
    {
      sourcePosition: [16, 23],
      targetPosition: [28, 23],
    },
    {
      sourcePosition: [16, 5],
      targetPosition: [28, 5],
    },

    // Zasedacka
    {
      sourcePosition: [0, 32],
      targetPosition: [0, 21],
    },
    {
      sourcePosition: [15, 32],
      targetPosition: [15, 21],
    },
    {
      sourcePosition: [0, 21],
      targetPosition: [15, 21],
    },
    {
      sourcePosition: [0, 32],
      targetPosition: [15, 32],
    },

    // Flutter room
    {
      sourcePosition: [16, 32],
      targetPosition: [16, 24],
    },
    {
      sourcePosition: [32, 32],
      targetPosition: [32, 24],
    },
    {
      sourcePosition: [16, 24],
      targetPosition: [32, 24],
    },
    {
      sourcePosition: [16, 32],
      targetPosition: [32, 32],
    },
    // Pruchod do zadu
    {
      sourcePosition: [16, -4],
      targetPosition: [16, 0],
    },
    {
      sourcePosition: [23, 0],
      targetPosition: [23, -4],
    },
    {
      sourcePosition: [16, -4],
      targetPosition: [23, -4],
    },
    {
      sourcePosition: [16, 0],
      targetPosition: [23, 0],
    },
    //Zadni místnost
    {
      sourcePosition: [24, -4],
      targetPosition: [24, 0],
    },
    {
      sourcePosition: [34, 0],
      targetPosition: [34, -4],
    },
    {
      sourcePosition: [24, -4],
      targetPosition: [34, -4],
    },
    {
      sourcePosition: [24, 0],
      targetPosition: [34, 0],
    },

    //Kuchyne
    {
      sourcePosition: [29, 23],
      targetPosition: [29, 19],
    },
    {
      sourcePosition: [36, 23],
      targetPosition: [36, 19],
    },
    {
      sourcePosition: [29, 19],
      targetPosition: [36, 19],
    },
    {
      sourcePosition: [29, 23],
      targetPosition: [36, 23],
    },
  ];

  const createSVGIcon = (d) => {
    let g = 255;
    let r = 0;
    if (
      moment().isAfter(
        moment(d.dateOfLastWatering).add(d.howOftenToWaterInDays, "days")
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

  const textData = [
    {
      coordinates: [4, -3],
      name: "Main room",
    },
    {
      coordinates: [19, 6],
      name: "Hallroom",
    },
    {
      coordinates: [5, 22],
      name: "Conference room",
    },
    {
      coordinates: [19, 25],
      name: "Flutter",
    },
    {
      coordinates: [19, -3],
      name: "Closet",
    },
    {
      coordinates: [27, -3],
      name: "Backroom",
    },
    {
      coordinates: [32, 20],
      name: "Kitchen",
    },
  ];

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
    new TextLayer({
      id: "text-layer",
      data: textData,
      pickable: true,
      getPosition: (d) => d.coordinates,
      getText: (d) => d.name,
      getSize: 18,
      getAngle: 0,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
    }),
  ];

  return (
    <>
      <div className="relative h-[80vh] w-full">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={mapControls}
          layers={layers}
          getTooltip={({ object }) =>
            object && {
              html: `
              <div class="grid grid-cols-2 gap-x-2">
                <div>Jméno:</div>
                <div>${object.name} </div>
                <div>Popis:</div>
                <div>${object.description} </div>
              </div>
              `,
              style: {
                fontSize: "1rem",
                borderRadius: "5%",
                color: "white",
              },
            }
          }
        />
      </div>
    </>
  );
};

export default Map;
