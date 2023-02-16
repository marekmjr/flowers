import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer, IconLayer, TextLayer } from "@deck.gl/layers";
import { api } from "../utils/api";
import moment from "moment";
import type { Flower } from "@prisma/client";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";

const Map: NextPage = () => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 10,
    latitude: 18,
    zoom: 3,
    pitch: 50,
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

  const healthColorRgbClass = (health: number) => {
    if (health < 25) {
      return "#dc2626";
    } else if (health < 50) {
      return "#fb923c";
    } else if (health < 75) {
      return "#4ade80";
    } else {
      return "#059669";
    }
  };

  const getHeath = (
    dateOfLastWatering: Date,
    howOftenToWaterInDays: number
  ) => {
    // How often to water = 100%
    const timeSince = moment().diff(moment(dateOfLastWatering), "days");
    const hp = Math.max(howOftenToWaterInDays - timeSince, 0 * 100);
    return Math.round((hp / howOftenToWaterInDays) * 100);
  };

  const createSVGIcon = (d: Flower) => {
    const health = getHeath(d.dateOfLastWatering, d.howOftenToWaterInDays);
    const rgbColor = healthColorRgbClass(health);

    const strokeColor = d.minTemperature > temperature ? "#0000FF" : "#FF0000";
    let strokeWidth = 0;
    if (d.minTemperature > temperature || d.maxTemperature < temperature) {
      strokeWidth = 3;
    }
    return `
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="10" fill="${rgbColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
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
  const onDragStart = () => {
    setMapControls(false);
  };
  const onDragEnd = (d: any) => {
    console.log(d);
    const flower = flowersData[d.index];
    updateCoordinates.mutate({
      id: (flower as unknown as Flower).id,
      coordinateX:
        (flower as unknown as Flower & { position: Array<number> })
          .position[0] || 0,
      coordinateY:
        (flower as unknown as Flower & { position: Array<number> })
          .position[1] || 0,
    });
    setMapControls(true);
  };
  const onDrag = (d: any) => {
    const newFlowersData = [...flowersData];
    const flower = newFlowersData[d.index];
    if (d.coordinate && flower) {
      (flower as unknown as Flower & { position: Array<number> }).position = [
        ...d.coordinate,
      ];
    }
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
      onDragStart: () => onDragStart(),
      onDragEnd: (d: any) => onDragEnd(d),
      onDrag: (d: any) => onDrag(d),
      pickable: true,
      sizeScale: 46,
    }),
    new TextLayer({
      id: "text-layer",
      data: textData,
      pickable: true,
      getPosition: (d: any) => d.coordinates,
      getText: (d: any) => d.name,
      getSize: 18,
      getAngle: 0,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
    }),
  ];

  const [temperature, setTemperature] = useState(20);

  const TemperatureIssue = (object: Flower) => {
    if (object.minTemperature > temperature) {
      return "Temperature is too low for me!!";
    } else if (object.maxTemperature < temperature) {
      return "Temperature is too high for me!!";
    } else {
      return "";
    }
  };

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    const getWeather = async () => {
      const data = axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}`
      );
      return data;
    };
    if (lat != 0 && long != 0) {
      getWeather()
        .then((response) => setTemperature(response.data.main.temp))
        .catch(console.error);
    }
  }, [lat, long]);

  return (
    <>
      <div className="ml-16">
        <label htmlFor="temperature" className="mb-2 block font-bold">
          Temperature
        </label>
        <InputNumber
          inputId="temperature"
          value={temperature}
          onValueChange={(e) => {
            // iconLayer doesn't rerender
            setTemperature(e.value || 0);
            const tmp = flowersData;
            setFlowersData([]);
            setTimeout(() => setFlowersData(tmp), 20);
          }}
          suffix="℃"
        />
      </div>
      <div
        className="relative h-[80vh] w-full"
        onContextMenu={(e) => e.preventDefault()}
      >
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={mapControls}
          layers={layers}
          getTooltip={({ object }: { object: any }) =>
            object &&
            object?.dateOfLastWatering != null && {
              html: `
              <div class="grid grid-cols-2 gap-x-2">
                <div>Name:</div>
                <div>${object.name} </div>
                <div>Health:</div>
                <div>${getHeath(
                  object.dateOfLastWatering,
                  object.howOftenToWaterInDays
                )}%</div>
                <div>Min temperature:</div>
                <div>${object.minTemperature}</div>
                <div>Max temperature</div>
                <div>${object.maxTemperature}</div>
                ${TemperatureIssue(object)}
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
