import { List, Datagrid, TextField, DateField, NumberField, EmailField, DeleteButton } from "react-admin";

export const ReservationList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <EmailField source="email" />
      <TextField source="car_name" label="Car Name" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <NumberField source="total_price" />
      <DateField source="created_at" label="Booking Date" />
      <DeleteButton />
    </Datagrid>
  </List>
);
