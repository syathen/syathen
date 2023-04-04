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
        return formatHours(appointment.time);
      } else {
        return appointment.time;
      }
    };
    const name = () => {
      if (nameFormat === 'asc') {
        return `${appointment.firstName} ${appointment.lastName}`;
      } else {
        return `${appointment.lastName}, ${appointment.firstName}`;
      }
    };
    return (
      <Appointment key={appointment.id}>
        <tbody>
          <tr>
            <td title={time()}>{time()}</td>
            <td title={name()}>{name()}</td>
            <td title={appointment.service}>{appointment.service}</td>
          </tr>
        </tbody>
      </Appointment>
    );
  });
};
