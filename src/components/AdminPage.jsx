import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { ReservationList } from "./ReservationList";

const API_BASE_URL = "https://tmt-rental-backend.onrender.com";

const dataProvider = simpleRestProvider(import.meta.env.VITE_API_URL);

const AdminPage = () => (
  <Admin basename="/admin" dataProvider={dataProvider}>
    <Resource name="reservations" list={ReservationList} />
    <Resource name="cars" list={ListGuesser} />
    <Resource name="car-categories" list={ListGuesser} />
  </Admin>
);

export default AdminPage;