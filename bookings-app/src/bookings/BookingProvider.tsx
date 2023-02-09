import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../core';
import { BookingProps } from './BookingProps';
import {  getBookings, save, search } from './bookingApi';
import { AuthContext } from '../auth';

const log = getLogger('ItemProvider');

type SearchBookingsFn = (departure: string, destination: string, date: string) => Promise<any>;
type SaveBookingFn = (user: string, departName: string, destName: string, time: string, departTime: string, destTime: string, flightType: string) => Promise<any>;

export interface BookingsState {
  bookings?: BookingProps[],
  searchedBookings?: BookingProps[],
  fetching: boolean,
  fetchingError?: Error | null,
  saving: boolean,
  searching: boolean,
  savingError?: Error | null,
  searchBookings?: SearchBookingsFn,
  saveBooking?: SaveBookingFn
}

interface ActionProps {
  type: string,
  payload?: any,
}

const initialState: BookingsState = {
  fetching: false,
  saving: false,
  searching: false
};

const FETCH_BOOKINGS_STARTED = 'FETCH_BOOKINGS_STARTED';
const FETCH_BOOKINGS_SUCCEEDED = 'FETCH_BOOKINGS_SUCCEEDED';
const FETCH_BOOKINGS_FAILED = 'FETCH_BOOKINGS_FAILED';
const SEARCH_BOOKINGS_STARTED = 'SEARCH_BOOKINGS_STARTED';
const SEARCH_BOOKINGS_SUCCEEDED = 'SEARCH_BOOKINGS_SUCCEEDED';
const SEARCH_BOOKINGS_FAILED = 'SEARCH_BOOKINGS_FAILED';
const SAVE_BOOKING_STARTED = 'SAVE_BOOKING_STARTED';
const SAVE_BOOKING_SUCCEEDED = 'SAVE_BOOKING_SUCCEEDED';
const SAVE_BOOKING_FAILED = 'SAVE_BOOKINGS_FAILED';


const reducer: (state: BookingsState, action: ActionProps) => BookingsState =
  (state, { type, payload }) => {
    switch (type) {
      case FETCH_BOOKINGS_STARTED:
        return { ...state, fetching: true, fetchingError: null };
      case FETCH_BOOKINGS_SUCCEEDED:
        return { ...state, bookings: payload.bookings, fetching: false };
      case FETCH_BOOKINGS_FAILED:
        return { ...state, fetchingError: payload.error, fetching: false };
      case SEARCH_BOOKINGS_STARTED:
        return { ...state, searching: true };
      case SEARCH_BOOKINGS_SUCCEEDED:
        return { ...state, searchedBookings: payload.bookingsSearched, searching: false };
      case SEARCH_BOOKINGS_FAILED:
        return { ...state, searching: false };
      case SAVE_BOOKING_STARTED:
        return { ...state, savingError: null, saving: true };
      case SAVE_BOOKING_SUCCEEDED:
        const bookings = [...(state.bookings || [])];
        const booking = payload.savedBooking;
        bookings.push(booking)
        return { ...state, bookings, saving: false };
      case SAVE_BOOKING_FAILED:
        return { ...state, savingError: payload.error, saving: false };
      default:
        return state;
    }
  };

export const BookingContext = React.createContext<BookingsState>(initialState);

interface BookingProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const { token, username } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bookings, fetching, fetchingError, saving, savingError, searchedBookings, searching } = state;
  useEffect(getBookingsEffect, [token]);
  const searchBookings = useCallback<SearchBookingsFn>(searchBookingsCallback, [token]);
  const saveBooking = useCallback<SaveBookingFn>(saveBookingCallback, [token]);
  const value = { bookings, searchedBookings,fetching, fetchingError, saving, savingError, searching, searchBookings, saveBooking};
  log('returns');
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );

  function getBookingsEffect() {
    let canceled = false;
    fetchBookings();
    return () => {
      canceled = true;
    }

    async function fetchBookings() {
      if (!token?.trim()) {
        return;
      }
      try {
        log('fetchBookings started');
        dispatch({ type: FETCH_BOOKINGS_STARTED });
        const user = username || ""
        const bookings = await getBookings(token, user);
        log('fetchBookings succeeded');
        if (!canceled) {
          dispatch({ type: FETCH_BOOKINGS_SUCCEEDED, payload: { bookings } });
        }
      } catch (error) {
        log('fetchBookings failed');
        dispatch({ type: FETCH_BOOKINGS_FAILED, payload: { error } });
      }
    }
  }

  async function searchBookingsCallback(departure: string, destination: string, date: string) {
    try {
      log('searchBookings started');
      dispatch({ type: SEARCH_BOOKINGS_STARTED });
      const searched = await (search(token, departure, destination, date));
      searched.forEach((element: any) => {
        element.user = username
      });
      log('searchBookings succeeded');
      dispatch({ type: SEARCH_BOOKINGS_SUCCEEDED, payload: { bookingsSearched: searched  } });
    } catch (error) {
      log('searchBookings failed');
      dispatch({ type: SEARCH_BOOKINGS_FAILED, payload: { error } });
    }
  }

  async function saveBookingCallback(user: string, departName: string, destName: string, time: string, departTime: string, destTime: string, flightType: string) {
    try {
      log('saveItem started');
      dispatch({ type: SAVE_BOOKING_STARTED });
      const savedBooking = await( save(token, user, departName, destName, time, departTime, destTime, flightType) )
      console.log(savedBooking)
      log('saveItem succeeded');
      dispatch({ type: SAVE_BOOKING_SUCCEEDED, payload: { savedBooking: savedBooking} });
    } catch (error) {
      log('saveItem failed');
      dispatch({ type: SAVE_BOOKING_FAILED, payload: { error } });
    }
  }

};
