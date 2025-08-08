"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";
import styles from "./MapComponent.module.css";

const CityRouteMap = ({ routes }: any) => {//routes:stri
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const markerGroupRef = useRef<L.LayerGroup | null>(null);
    const routeLineRef = useRef<L.Polyline | null>(null);
    const polygonRef = useRef<L.Polygon | null>(null);
    const arrowDecoratorRef = useRef<any>(null); // because polylineDecorator is not typed well

    const [cities, setCities] = useState(routes ?? ["Yerevan", "Gyumri", "Vanadzor"]);

    console.log("routesroutes", routes)

    // useEffect(() => {
    //     setCities(routes)
    // }, [routes])

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        mapRef.current = L.map(mapContainerRef.current).setView([40.1792, 44.4991], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(mapRef.current);
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
        drawRoute();
    }, [cities]);

    const drawRoute = async () => {
        const coordinates: L.LatLngExpression[] = [];

        // Clear old layers
        if (markerGroupRef.current) markerGroupRef.current.clearLayers();
        else markerGroupRef.current = L.layerGroup().addTo(mapRef.current!);

        if (routeLineRef.current) routeLineRef.current.remove();
        if (polygonRef.current) polygonRef.current.remove();
        if (arrowDecoratorRef.current) arrowDecoratorRef.current.remove();

        for (const city of cities) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
            );
            const data = await response.json();

            // if (data.length === 0) {
            //     alert(`Քաղաքը չի գտնվել: ${city}`);
            //     continue;
            // }

            const { lat, lon } = data[0];
            const latNum = parseFloat(lat);
            const lonNum = parseFloat(lon);

            coordinates.push([latNum, lonNum]);

            const redIcon = new L.Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });

            const marker = L.marker([latNum, lonNum], { icon: redIcon }).bindPopup(
                `${city}<br>(${lat}, ${lon})`
            );
            markerGroupRef.current.addLayer(marker);
        }

        if (coordinates.length >= 2) {
            // 🔁 Closed path
            coordinates.push(coordinates[0]);

            // 🔴 Red Polyline
            routeLineRef.current = L.polyline(coordinates, {
                color: "red",
                weight: 4,
                opacity: 0.9,
            }).addTo(mapRef.current!);

            // 🔻 Polygon (filled area)
            polygonRef.current = L.polygon(coordinates, {
                color: "red",
                fillColor: "#ffcccc",
                fillOpacity: 0.3,
                weight: 0,
            }).addTo(mapRef.current!);

            // ➡️ Arrows using PolylineDecorator
            // @ts-ignore - because leaflet-polylinedecorator is not typed
            arrowDecoratorRef.current = L.polylineDecorator(routeLineRef.current, {
                patterns: [
                    {
                        offset: 15,
                        repeat: 50,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 12,
                            polygon: false,
                            pathOptions: { stroke: true, color: "darkred" },
                        }),
                    },
                ],
            }).addTo(mapRef.current!);

            mapRef.current.fitBounds(routeLineRef.current.getBounds(), {
                padding: [50, 50],
            });
        }
    };

    return (
        <div>
            {/* <h2>Ուղղության քարտեզ</h2>
            <p>Քաղաքներ․ {cities.join(" → ")}</p> */}

            <div ref={mapContainerRef} className={styles.mapContainer} />
            {/* <button onClick={() => setCities(routes)}>search</button> */}
        </div>
    );
};

export default CityRouteMap;
