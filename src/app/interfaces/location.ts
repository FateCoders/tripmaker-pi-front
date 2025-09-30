export interface ILocation {
    id: string,
    google_maps_id: string,
    city: string,
    uf: string,
    country: string,
    complement: string,
    coordinates: {
        lat: number;
        lng: number;
      };
}
