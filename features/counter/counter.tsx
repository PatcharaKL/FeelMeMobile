import React from 'react';

import {useAppSelector, useAppDispatch} from '../../app/hook';

import {decrement, increment} from './counterSlice';

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic
}
