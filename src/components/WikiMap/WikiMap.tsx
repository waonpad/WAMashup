import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Box, Typography, Button } from "@mui/material";
import { AxiosResponse } from "axios";

import { GOOGLE_MAP_API_KEY } from "@/config";
import { axiosApp } from "@/lib/axios";

type LatLng = {
    lat: number;
    lng: number;
}

type GoogleMapProps = {
    sx?: React.CSSProperties | undefined;
    defaultCenter: LatLng;
}

type WikiArticle = {
    dist: number;
    lat: number;
    lon: number;
    ns: number;
    pageid: number;
    primary: string;
    title: string;
}

axiosApp.defaults.withCredentials = false; // これが無いといけない https://developer.mozilla.org/ja/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials

export const WikiMap = (props: GoogleMapProps) => {
    const {sx, defaultCenter} = props;

    const [mapref, setMapRef] = useState<google.maps.Map | null>(null);
    const [center, setCenter] = useState<LatLng>(defaultCenter);
    const [zoom, setZoom] = useState<number>(17);
    const [activeMarkerId, setActiveMarkerId] = useState<number>();

    const [wikiArticles, setWikiArticles] = useState<WikiArticle[]>([]);
    const apiUrl = `https://ja.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=info&inprop=url&list=geosearch&gscoord=${center.lat}%7C${center.lng}&gsradius=10000&gslimit=300`;
    const updateTarget = 0.01;

    useEffect(() => {
        // api request
        axiosApp.get(apiUrl).then((res: AxiosResponse) => {
            // console.log(res);

            setWikiArticles(res.data.query.geosearch);
        }).catch((error: ((reason: any) => PromiseLike<never>) | null | undefined) => {
            console.log(error);
        })
        // 
    }, [apiUrl, zoom])

    const handleOnLoad = (map: google.maps.Map) => {
        setMapRef(map);
    }

    const handleCenterChanged = () => {
        if (mapref) {
            const newCenter = mapref.getCenter()?.toJSON();
            // console.log(newCenter)
            if(newCenter !== undefined) {
                if(Math.abs(center.lat - newCenter.lat) > updateTarget || Math.abs(center.lng - newCenter.lng) > updateTarget) {
                    console.log('center update');
                    setCenter(newCenter);
                }
            }
        }
    }

    const handleZoomChnaged = () => {
        if (mapref) {
            if(mapref.getZoom()! < zoom) {
                setZoom(mapref.getZoom()!);
            }
        }
    }

    const handleMarkerClick = (event: google.maps.MapMouseEvent) => {
        mapref?.panTo(event.latLng as unknown as LatLng);
    }

    const handleInfoWindowClose = () => {
        setActiveMarkerId(undefined);
    }

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
            <GoogleMap
                mapContainerStyle={{...sx}} // parent set width height
                center={defaultCenter}
                zoom={zoom}
                onLoad={handleOnLoad}
                onCenterChanged={handleCenterChanged}
                onZoomChanged={handleZoomChnaged}
            >
                {wikiArticles.map((wikiArticle) => (
                    <MarkerF
                        key={wikiArticle.pageid}
                        position={{lat: wikiArticle.lat, lng: wikiArticle.lon}}
                        onClick={handleMarkerClick}
                        onMouseOver={() => {setActiveMarkerId(wikiArticle.pageid)}}
                    >
                        {activeMarkerId === wikiArticle.pageid &&
                            <InfoWindowF
                                position={{lat: wikiArticle.lat, lng: wikiArticle.lon}}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <Box
                                    sx={{p: 1, pl: 0}}
                                >
                                    <Typography>{wikiArticle.title}</Typography>
                                    <Button
                                        variant="contained"
                                        disableRipple // バグって勝手に動くので無効に
                                        fullWidth
                                        component={Link}
                                        to={`https://jp.wikipedia.org/?curid=${wikiArticle.pageid}`}
                                        target='_blank'
                                    >
                                        記事を見る
                                    </Button>
                                </Box>
                            </InfoWindowF>
                        }
                    </MarkerF>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};