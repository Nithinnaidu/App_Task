import {
    FETCHING_PEOPLE_REQUEST,
    FETCHING_PEOPLE_SUCCESS,
    FETCHING_PEOPLE_FAILURE
} from './types';


export const fetchingPeopleRequest = () => ({ type: FETCHING_PEOPLE_REQUEST });

export const fetchingPeopleSuccess = (json) => ({
    type: FETCHING_PEOPLE_SUCCESS,
    payload: json
});

export const fetchingPeopleFailure = (error) => ({
    type: FETCHING_PEOPLE_FAILURE,
    payload: error
});

export const fetchPeople = () => {
    return dispatch => {
        dispatch(fetchingPeopleRequest());
        try {
            let json = {
                login: [
                    {
                        "username": "hruday@gmail.com",
                        "password": 'hruday123'
                    }
                ],
                user: [
                    {
                        "id": 1,
                        "name": "test1",
                        "age": "11",
                        "gender": "male",
                        "email": "test1@gmail.com",
                        "phoneNo": "9415346313"
                    },
                    {
                        "id": 2,
                        "name": "test2",
                        "age": "12",
                        "gender": "male",
                        "email": "test2@gmail.com",
                        "phoneNo": "9415346314"
                    },
                    {
                        "id": 3,
                        "name": "test3",
                        "age": "13",
                        "gender": "male",
                        "email": "test3@gmail.com",
                        "phoneNo": "9415346315"
                    },
                    {
                        "id": 4,
                        "name": "test4",
                        "age": "14",
                        "gender": "male",
                        "email": "test4@gmail.com",
                        "phoneNo": "9415346316"
                    },
                    {
                        "id": 5,
                        "name": "test5",
                        "age": "15",
                        "gender": "male",
                        "email": "test5@gmail.com",
                        "phoneNo": "9415346317"
                    },
                    {
                        "id": 6,
                        "name": "test6",
                        "age": "16",
                        "gender": "male",
                        "email": "test6@gmail.com",
                        "phoneNo": "9415346318"
                    }
                ]
            }
            dispatch(fetchingPeopleSuccess(json));
        } catch (error) {
            dispatch(fetchingPeopleFailure(error));
        }
    }
}
