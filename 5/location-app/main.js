import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import OpacityControl from "maplibre-gl-opacity";
import "maplibre-gl-opacity/dist/maplibre-gl-opacity.css";

const map = new maplibregl.Map({
  container: "map",
  zoom: 5,
  center: [138, 37],
  minZoom: 5,
  maxZoom: 18,
  // 表示可能範囲
  maxBounds: [122, 20, 154, 50],

  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        maxzoom: 19,
        tileSize: 256,
        attribution:
          '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      hazard_flood: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_hightide: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_tsunami: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_doseki: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_kyukeisha: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_jisuberi: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      skhb: {
        type: "vector",
        tiles: [
          `${location.href.replace("/index.html", "")}/skhb/{z}/{x}/{y}.pbf`,
        ],
        minzoom: 5,
        maxzoom: 8,
        attribution:
          '<a href="https://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="_blank">国土地理院:指定緊急避難場所データ</a>',
      },
    },
    layers: [
      {
        id: "osm-layer",
        source: "osm",
        type: "raster",
      },
      // ハザードマップ
      {
        id: "hazard_flood-layer",
        source: "hazard_flood",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_hightide-layer",
        source: "hazard_hightide",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
      },
      {
        id: "hazard_tsunami-layer",
        source: "hazard_tsunami",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_doseki-layer",
        source: "hazard_doseki",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_kyukeisha-layer",
        source: "hazard_kyukeisha",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_jisuberi-layer",
        source: "hazard_jisuberi",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      // 避難場所
      {
        id: "skhb-1-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "洪水"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-2-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "崖崩れ、土石流及び地滑り"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-3-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "高潮"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-4-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "地震"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-5-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "津波"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-6-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "大規模な火事"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-7-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "内水氾濫"],
        layout: {
          visibility: "none",
        },
      },
      {
        id: "skhb-8-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "火山現象"],
        layout: {
          visibility: "none",
        },
      },
    ],
  },
});

map.on("load", () => {
  const opacity = new OpacityControl({
    baseLayers: {
      "hazard_flood-layer": "洪水浸水想定区域",
      "hazard_hightide-layer": "高潮浸水想定区域",
      "hazard_tsunami-layer": "津波浸水想定区域",
      "hazard_doseki-layer": "土石流警戒区域",
      "hazard_kyukeisha-layer": "急傾斜警戒区域",
      "hazard_jisuberi-layer": "地滑り警戒区域",
    },
  });
  map.addControl(opacity, "top-left");

  const opacitySkhb = new OpacityControl({
    baseLayers: {
      "skhb-1-layer": "洪水",
      "skhb-2-layer": "崖崩れ、土石流及び地滑り",
      "skhb-3-layer": "高潮",
      "skhb-4-layer": "地震",
      "skhb-5-layer": "津波",
      "skhb-6-layer": "大規模な火事",
      "skhb-7-layer": "内水氾濫",
      "skhb-8-layer": "火山現象",
    },
  });
  map.addControl(opacitySkhb, "top-right");

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        "skhb-1-layer",
        "skhb-2-layer",
        "skhb-3-layer",
        "skhb-4-layer",
        "skhb-5-layer",
        "skhb-6-layer",
        "skhb-7-layer",
        "skhb-8-layer",
      ],
    });

    if (features.length === 0) return;

    const feature = features[0];
    const popup = new maplibregl.Popup()
      .setLngLat(feature.geometry.coordinates) // lng,lat
      .setHTML(
        `
          <div style="font-weight:900;font-size:1rem;">
          ${feature.properties["施設・場所名"]}
          </div>
          <div>${feature.properties["住所"]}</div>
          <div>${feature.properties["備考"] ?? ""}</div>
          <span ${
            feature.properties["洪水"] ? "" : 'style="color:#ccc;"'
          }>洪水</span>
          <span ${
            feature.properties["崖崩れ、土石流及び地滑り"]
              ? ""
              : 'style="color:#ccc;"'
          }>崖崩れ、土石流及び地滑り</span>

          <span ${
            feature.properties["高潮"] ? "" : 'style="color:#ccc;"'
          }>高潮</span>
          <span ${
            feature.properties["地震"] ? "" : 'style="color:#ccc;"'
          }>地震</span>          <span ${
          feature.properties["津波"] ? "" : 'style="color:#ccc;"'
        }>津波</span>          <span ${
          feature.properties["大規模な火事"] ? "" : 'style="color:#ccc;"'
        }>大規模な火事</span>          <span ${
          feature.properties["内水氾濫"] ? "" : 'style="color:#ccc;"'
        }>内水氾濫</span>          <span ${
          feature.properties["火山現象"] ? "" : 'style="color:#ccc;"'
        }>火山現象</span>
        
        `
      )
      .addTo(map);

    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [
          "skhb-1-layer",
          "skhb-2-layer",
          "skhb-3-layer",
          "skhb-4-layer",
          "skhb-5-layer",
          "skhb-6-layer",
          "skhb-7-layer",
          "skhb-8-layer",
        ],
      });
      // カーソルの形状を変更
      if (features.length > 0) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  });
});
