import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* imagesSaga() {
    // Gets a list of the images
    yield takeEvery('FETCH_IMAGES', fetchImages);
    // Deletes image
    yield takeEvery('DELETE_IMAGE', deleteImage);
}

/**
 * Sends a GET request to /api/images to get all images related to the story
 */
function* fetchImages(action) {
    try {
        const response = yield axios.get(`/api/images/${action.payload}`);
        // Stores all data received in the images reducer
        yield put({ type: 'SET_IMAGES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}

function* deleteImage(action) {
    try {
        yield axios.delete(`/api/images/${action.payload.id}`);
        yield put({ type: 'FETCH_IMAGES', payload: action.payload.story_id });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}