import {apiSlice} from '../../features/api/apiSlice';
const interactiveAPI = apiSlice.injectEndpoints({
  endpoints: build => ({
    dealDamage: build.mutation({
      query: formVal => ({
        url: '/Log/AttackDamage',
        method: 'POST',
        body: formVal,
      }),
      invalidatesTags: ['User'],
    }),
    weaponList: build.query({
      query: formVal => ({
        url: '/Log/GetWeapons',
        method: 'POST',
        body: formVal,
      }),
    }),
  }),
});
export const {useWeaponListQuery, useDealDamageMutation} = interactiveAPI;
