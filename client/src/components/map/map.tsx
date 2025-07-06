import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LocationMapSelector.module.scss';

// ИСПРАВЛЕНИЕ: Принудительная настройка иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Простая иконка маркера
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface LocationMapSelectorProps {
    initialLat?: number;
    initialLng?: number;
    onLocationChange: (latitude: string, longitude: string) => void;
    className?: string;
}

interface Position {
    lat: number;
    lng: number;
}

// Компонент для обработки кликов на карте
function LocationMarker({ position, onPositionChange }: {
    position: Position;
    onPositionChange: (pos: Position) => void;
}) {
    const [isDragging, setIsDragging] = useState(false);

    useMapEvents({
        click(e) {
            console.log('Map clicked:', e.latlng); // ОТЛАДКА
            const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
            onPositionChange(newPos);
        },
    });

    const eventHandlers = {
        dragstart: () => {
            console.log('Marker drag start'); // ОТЛАДКА
            setIsDragging(true);
        },
        dragend: (e: any) => {
            console.log('Marker drag end'); // ОТЛАДКА
            setIsDragging(false);
            const marker = e.target;
            const newPos = { lat: marker.getLatLng().lat, lng: marker.getLatLng().lng };
            onPositionChange(newPos);
        },
    };

    return (
        <Marker
            position={[position.lat, position.lng]}
            draggable={true}
            eventHandlers={eventHandlers}
            icon={customIcon}
            opacity={isDragging ? 0.7 : 1}
        />
    );
}

// Компонент для обновления карты
function MapUpdater({ center, zoom }: { center: [number, number]; zoom?: number }) {
    const map = useMap();

    useEffect(() => {
        if (map) {
            console.log('Updating map center:', center); // ОТЛАДКА
            map.setView(center, zoom || map.getZoom());
        }
    }, [center, zoom, map]);

    return null;
}

const LocationMapSelector: React.FC<LocationMapSelectorProps> = ({
    initialLat = 40.1792,
    initialLng = 44.4991,
    onLocationChange,
    className
}) => {
    const [position, setPosition] = useState<Position>({
        lat: initialLat,
        lng: initialLng
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>([initialLat, initialLng]);
    const [mapKey, setMapKey] = useState(0); // Ключ для перерендера карты

    // ОТЛАДКА: Проверим что компонент загружается
    useEffect(() => {
        console.log('LocationMapSelector mounted');
        console.log('Initial position:', { lat: initialLat, lng: initialLng });

        // ИСПРАВЛЕНИЕ: Добавляем глобальные стили для Leaflet программно
        const addLeafletStyles = () => {
            const existingStyle = document.getElementById('leaflet-custom-styles');
            if (existingStyle) return; // Уже добавлены

            const style = document.createElement('style');
            style.id = 'leaflet-custom-styles';
            style.textContent = `
        .leaflet-container {
          height: 100% !important;
          width: 100% !important;
          z-index: 1 !important;
          font-family: inherit !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 6px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #333 !important;
          border: none !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 16px !important;
          font-weight: bold !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f5f5f5 !important;
          color: #007bff !important;
        }
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          font-size: 10px !important;
          border-radius: 4px !important;
          padding: 2px 6px !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 6px !important;
        }
        .leaflet-marker-icon {
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) !important;
        }
      `;
            document.head.appendChild(style);
        };

        addLeafletStyles();
    }, []);

    const handlePositionChange = useCallback((newPosition: Position) => {
        console.log('Position changed:', newPosition); // ОТЛАДКА
        setPosition(newPosition);
        onLocationChange(newPosition.lat.toString(), newPosition.lng.toString());
    }, [onLocationChange]);

    const handleSearch = async () => {
        if (!searchQuery.trim() || isSearching) return;

        setIsSearching(true);
        console.log('Searching for:', searchQuery); // ОТЛАДКА

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
            );
            const data = await response.json();
            console.log('Search results:', data); // ОТЛАДКА

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newLat = parseFloat(lat);
                const newLng = parseFloat(lon);

                setMapCenter([newLat, newLng]);
                handlePositionChange({ lat: newLat, lng: newLng });
                setMapKey(prev => prev + 1); // Принудительный перерендер карты
            } else {
                alert('Местоположение не найдено. Попробуйте другой запрос.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Ошибка поиска. Попробуйте еще раз.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleCurrentLocation = () => {
        console.log('Getting current location...'); // ОТЛАДКА
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (geoPosition) => {
                    console.log('Got geolocation:', geoPosition.coords); // ОТЛАДКА
                    const lat = geoPosition.coords.latitude;
                    const lng = geoPosition.coords.longitude;

                    setMapCenter([lat, lng]);
                    handlePositionChange({ lat, lng });
                    setMapKey(prev => prev + 1); // Принудительный перерендер карты
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Не удалось определить текущее местоположение.');
                }
            );
        } else {
            alert('Геолокация не поддерживается браузером.');
        }
    };

    return (
        <div className={`${styles.mapContainer} ${className || ''}`}>
            <div className={styles.mapControls}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск места..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className={styles.searchInput}
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={isSearching}
                            className={styles.searchButton}
                        >
                            {isSearching ? '...' : '🔍'}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    className={styles.currentLocationButton}
                >
                    📍 Моя геопозиция
                </button>
            </div>

            {/* ИСПРАВЛЕНО: Контейнер с фиксированной высотой */}
            <div className={styles.mapWrapper}>
                <MapContainer
                    key={mapKey} // Ключ для принудительного перерендера
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    className={styles.map}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} onPositionChange={handlePositionChange} />
                    <MapUpdater center={mapCenter} />
                </MapContainer>
            </div>

            <div className={styles.coordinatesDisplay}>
                <div className={styles.hint}>
                    Кликните на карту или перетащите маркер для выбора местоположения
                </div>
            </div>
        </div>
    );
};

export default LocationMapSelector;