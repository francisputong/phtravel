import { GOOGLE_PLACE_API_KEY } from '@env';
import makeApiRequest from '../makeApiCall';
import { PlaceAutocompleteResponse, PlaceDetailsResponse } from './types';

export async function getGooglePlaceAutocomplete(searchQuery: string) {
    const response = await makeApiRequest<PlaceAutocompleteResponse>(
        '/autocomplete/json',
        'GET',
        undefined,
        {
            input: searchQuery,
            types: 'administrative_area_level_3|locality|tourist_attraction',
            language: 'en',
            components: 'country:ph',
            key: GOOGLE_PLACE_API_KEY,
        },
        'google'
    );

    return response;
}

export async function getGooglePlaceDetails(placeId: string) {
    const response = await makeApiRequest<PlaceDetailsResponse>(
        '/details/json',
        'GET',
        undefined,
        {
            placeid: placeId,
            key: GOOGLE_PLACE_API_KEY,
        },
        'google'
    );

    return response;
}
