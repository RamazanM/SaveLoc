import axios, { type AxiosResponse } from "axios";

export interface OsmSearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    amenity?: string;
    road?: string;
    residential?: string;
    suburb?: string;
    town?: string;
    city?: string;
    province?: string;
    region?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: [string, string, string, string];
  geokml: string;
}

export default class MapService {
  async search(query: string): Promise<Array<OsmSearchResult>> {
    const res = await axios
      .create()
      .get<
        Array<OsmSearchResult>
      >(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&polygon_kml=1&addressdetails=1`);
      return res.data
  }
}
