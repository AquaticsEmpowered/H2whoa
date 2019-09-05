import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* storiesSaga() {
    // Gets a list of the stories
    yield takeEvery('FETCH_STORIES', fetchStories);
    // Deletes a specific story
    yield takeEvery('DELETE_STORY', deleteStory);
    // Flaggs story for review
    yield takeEvery('FLAG_STORY', flagStory);
    // Adds a story
    yield takeEvery('ADD_STORY', addStory);
    // Filters stories by users parameters
    yield takeEvery('FILTER_STORIES', filterStories);
}

/**
 * Sends a GET request to /api/stories to get all stories
 */
function* fetchStories() {
    try {
        const response = yield axios.get('/api/stories');
        // Stores all data received in the stories reducer
        yield put({ type: 'SET_STORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}

function* filterStories(action) {
    const categoriesForFilter = Object.entries(action.payload);
    try {
        for (let i = 0; i < categoriesForFilter.length; i++) {
            if (categoriesForFilter[i][1]) {
                console.log(categoriesForFilter[i][0]);
                // objectToSend
                const response = yield axios.get(`/api/stories/filter/${categoriesForFilter[i][0]}`);
                console.log('response.data', response.data);
                if (response.data.length !== 0) {
                    yield put({ type: 'ADD_FILTER', payload: response.data });
                }
            }
        }
        // Stores all data received in the stories reducer
        // yield put({ type: 'SET_STORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}

/**
 * Sends a DELETE request to /api/stories/:id to delete a story
 * @param {object} action story to be deleted
 */
function* deleteStory(action) {
    try {
        yield axios.delete(`/api/stories/${action.payload.id}`);
        // Gets updated list of stories
        yield put({ type: 'FETCH_STORIES' });
    } catch (error) {
        console.log('Error with deleting story', error);
    }
}

/**
 * Sends a PUT request to /api/stories/flag/:id to flad a story
 * @param {object} action story to be flagged
 */
function* flagStory(action) {
    try {
        yield axios.put(`/api/stories/flag/${action.payload.id}`, action.payload);
        // Gets updated list of stories
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (error) {
        console.log('Error with flagging story', error);
    }
}

// Sets a POST request to /api/share to add a story
function* addStory(action) {
    try {
        yield axios.post('/api/stories/share', action.payload);
    } catch (error) {
        console.log('Error with addStory saga', error);
    }
}