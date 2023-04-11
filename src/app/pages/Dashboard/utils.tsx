import { Appointment } from './components/DayView';

const formatHours = (time: any) => {
  time = time.toString();
  const suffix = time.split(' ')[1];
  const [hours, minutes] = time.split(' ')[0].split(':');
  if (suffix === undefined) {
    if (parseInt(hours) === 12) {
      return `${parseInt(hours)}:${minutes} PM`;
    } else if (parseInt(hours) > 12) {
      return `${parseInt(hours) - 12}:${minutes} PM`;
    } else {
      return `${parseInt(hours)}:${minutes} AM`;
    }
  } else {
    return time;
  }
};

export const MapAppointments = (
  appointments: Array<any>,
  timeFormat: string,
  nameFormat: string,
) => {
  if (appointments.length === 0) {
    return (
      <Appointment>
        <tbody>
          <tr>
            <td>No Appointments</td>
          </tr>
        </tbody>
      </Appointment>
    );
  }
  return appointments.map((appointment: any) => {
    const time = () => {
      if (timeFormat === '12') {
        return formatHours(appointment.details.time.time);
      } else {
        return appointment.details.time.time;
      }
    };
    const name = () => {
      if (!appointment.customer.first_name) {
        if (appointment.customer.name) {
          return appointment.customer.name;
        } else {
          return appointment.customer.email;
        }
      } else {
        if (nameFormat === 'asc') {
          return `${appointment.customer.first_name} ${appointment.customer.last_name}`;
        } else {
          return `${appointment.customer.last_name}, ${appointment.customer.first_name}`;
        }
      }
    };
    return (
      <Appointment key={appointment.booking_id}>
        <tbody>
          <tr>
            <td title={time()}>{time()}</td>
            <td title={name()}>{name()}</td>
            <td title={appointment.details.service.service_name}>
              {appointment.details.service.service_name}
            </td>
          </tr>
        </tbody>
      </Appointment>
    );
  });
};
