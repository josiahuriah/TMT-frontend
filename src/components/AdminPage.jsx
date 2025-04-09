import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { ReservationList } from "./ReservationList";

const API_BASE_URL = "https://tmt-rental-backend.onrender.com";  // Hardcode temporarily

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_BASE_URL, httpClient);

const AdminPage = () => (
  <Admin basename="/admin" dataProvider={dataProvider}>
    <Resource name="reservations" list={ReservationList} />
    <Resource name="cars" list={ListGuesser} />
    <Resource name="car-categories" list={ListGuesser} />
  </Admin>
);

export default AdminPage;
