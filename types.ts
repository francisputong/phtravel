export type MapLocation = {
    name: string;
    capital: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
};

export type PlaceAutocompleteResponse = {
    predictions: PlacePrediction[];
    status: string;
};

export type PlacePrediction = {
    description: string;
    place_id: string;
    structured_formatting: StructuredFormatting;
    types: string[];
};

type StructuredFormatting = {
    main_text: string;
    secondary_text: string;
};
