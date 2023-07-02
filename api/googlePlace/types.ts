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

type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
};

type GeometryLocation = {
    lat: number;
    lng: number;
};

type GeometryViewport = {
    northeast: GeometryLocation;
    southwest: GeometryLocation;
};

type Geometry = {
    location: GeometryLocation;
    viewport: GeometryViewport;
};

type OpeningHoursPeriod = {
    open: {
        day: number;
        time: string;
        hours: number;
        minutes: number;
    };
    close: {
        day: number;
        time: string;
        hours: number;
        minutes: number;
    };
};

type OpeningHours = {
    open_now: boolean;
    periods: OpeningHoursPeriod[];
    weekday_text: string[];
};

type Photo = {
    height: number;
    width: number;
    html_attributions: string[];
    photo_reference: string;
};

type ReviewAspectRating = {
    rating: number;
    type: string;
};

type Review = {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    aspect_ratings: ReviewAspectRating[];
};

export type PlaceDetailsResult = {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    rating: number;
    reference: string;
    reviews: Review[];
    types: string[];
    url: string;
    utc_offset: number;
    website: string;
};

export type PlaceDetailsResponse = {
    html_attributions: string[];
    result: PlaceDetailsResult;
    status: string;
};
