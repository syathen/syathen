import { Appointment, DateSeperator } from './components/DayView';

const formatHours = (time: any, format: string) => {
  if (time === undefined) {
    return false;
  }
  time = time.toString();
  const suffix = time.split(' ')[1];
  const [hours, minutes] = time.split(' ')[0].split(':');
  if (format === '12') {
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
  } else {
    if (suffix === undefined) {
      return time;
    } else {
      if (parseInt(hours) === 12) {
        return `${parseInt(hours) - 12}:${minutes}`;
      } else {
        return time;
      }
    }
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

  return appointments.map((appointment: any, index: number) => {
    const time = () => {
      return appointment.details.time.time === undefined
        ? formatHours(appointment.details.time, timeFormat)
        : formatHours(appointment.details.time.time, timeFormat);
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
    if (appointment.details.date !== appointments[index - 1]?.details.date) {
      const date = new Date(appointment.details.date).toLocaleString(
        'default',
        {
          timeZone: 'UTC',
          month: 'long',
          day: 'numeric',
        },
      );
      // Big rerender issue here
      return (
        <>
          <DateSeperator
            id={appointment.details.date}
            key={appointment.details.date}
          >
            <tbody>
              <tr>
                <td>
                  {appointment.details.date ===
                  new Date().toISOString().split('T')[0]
                    ? 'Today'
                    : date}
                </td>
              </tr>
            </tbody>
          </DateSeperator>
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
        </>
      );
    }
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
