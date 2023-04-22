// Description: Calendar page
// Creates a react calendar given a list of events and the month to display

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { TbArrowBigRightFilled, TbArrowBigLeftFilled, TbArrowBigDownFilled } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import styled from 'styled-components/macro';
import { media } from 'styles/media';

import { StageCenter } from '../components/StageCenter';
import { Title } from '../components/Title';

// Get number of days in month and day of week of first day with moment
function MapMonthToDays(month: number, year: number) {
  const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  const firstDay = moment(`${year}-${month}`, 'YYYY-MM').format('d');
  return {
    daysInMonth,
    firstDay,
  };
}
export function CalendarPage(props: any) {
  const { t } = useTranslation();
  const [month, setMonth] = React.useState(moment(new Date()).month() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  if (month > 12) {
    setMonth(1);
    setYear(year + 1);
  }
  if (month < 1) {
    console.log(month);
    setMonth(12);
    setYear(year - 1);
  }

  const today = moment().format('DD');

  const monthInfo = MapMonthToDays(month, year);
  const selection = React.useRef<string>('');

  useEffect(() => {
    if (moment(selection.current).format('YYYY-M') === `${year}-${month}`) {
      let element = document.getElementById(selection.current);
      if (element) {
        element.classList.add('dateSelected');
      }
    }
  }, [month, year]);

  let range = monthInfo.daysInMonth + +monthInfo.firstDay > 35 ? 42 : 35;
  if (props.collapsed) {
    return (
      <Calendar>
        <div
          className="calendar"
          onClick={() => {
            props.setCollapsed(false);
          }}
        >
          <div className="calendar__header">
            <div className="calendar__header__month">
              <div className="calendar__header__month__name">
                <h1>
                  {moment(`${year}-${month}`, 'YYYY-MM').format('MMMM')}{' '}
                  <span className="calendar__header__month__name__year">
                    {year}
                  </span>
                </h1>
              </div>
              <div className="calendar__header__month__arrow">
                <TbArrowBigDownFilled />
              </div>
            </div>
          </div>
        </div>
      </Calendar>
    );
  }

  return (
    <Calendar>
      <div className="calendar">
        <div className="calendar__header">
          <div className="calendar__header__month">
            <div className="calendar__header__month__arrow">
              {(+moment().format('YYYY') === year &&
                +moment().format('MM') === month) || (
                <TbArrowBigLeftFilled
                  onClick={() => {
                    setMonth(month - 1);
                    Array.from(document.getElementsByClassName('date')).forEach(
                      el => {
                        el.classList.remove('dateSelected');
                      },
                    );
                  }}
                />
              )}
            </div>
            <div className="calendar__header__month__name">
              <h1>
                {moment(`${year}-${month}`, 'YYYY-MM').format('MMMM')}{' '}
                <span className="calendar__header__month__name__year">
                  {year}
                </span>
              </h1>
            </div>
            <div className="calendar__header__month__arrow">
              <TbArrowBigRightFilled
                onClick={() => {
                  setMonth(month + 1);
                  Array.from(document.getElementsByClassName('date')).forEach(
                    el => {
                      el.classList.remove('dateSelected');
                    },
                  );
                }}
              />
            </div>
          </div>
          <div className="calendar__header__days">
            <div className="calendar__header__days__day">
              <h1>Sun</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Mon</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Tue</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Wed</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Thu</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Fri</h1>
            </div>
            <div className="calendar__header__days__day">
              <h1>Sat</h1>
            </div>
          </div>
        </div>
        <div className="calendar__body">
          {[...Array(range)].map((_, i) => {
            if (
              i < +monthInfo.firstDay ||
              i >= +monthInfo.firstDay + +monthInfo.daysInMonth
            ) {
              return (
                <div className="calendar__body__day" key={i}>
                  <div className="calendar__body__day__number">
                    <button disabled />
                  </div>
                </div>
              );
            } else {
              if (
                +moment().format('YYYY') > year ||
                (+moment().format('YYYY') === year &&
                  i - +monthInfo.firstDay + 1 < +today &&
                  month === new Date().getMonth() + 1) ||
                (+moment().format('YYYY') === year &&
                  month < new Date().getMonth() + 1)
              ) {
                return (
                  <div className="calendar__body__day" key={i}>
                    <div className="calendar__body__day__number">
                      <button disabled>{i - +monthInfo.firstDay + 1}</button>
                    </div>
                  </div>
                );
              }
              if (
                +moment().format('YYYY') === year &&
                i - +monthInfo.firstDay + 1 === +today &&
                month === new Date().getMonth() + 1
              ) {
                return (
                  <div className="calendar__body__day" key={i}>
                    <div className="calendar__body__day__number">
                      <button
                        className="today date"
                        id={moment(
                          new Date(
                            year,
                            month - 1,
                            i - +monthInfo.firstDay + 1,
                          ),
                        ).format('YYYY-MM-DD')}
                        onClick={(e: any) => {
                          e.preventDefault();
                          Array.from(
                            document.getElementsByClassName('date'),
                          ).forEach(el => {
                            el.classList.remove('dateSelected');
                          });
                          selection.current = e.target.id;
                          (
                            document.getElementById(`${e.target.id}`) as any
                          ).classList.add('dateSelected');
                          props.clicked(
                            moment(
                              new Date(
                                year,
                                month - 1,
                                i - +monthInfo.firstDay + 1,
                              ),
                            ).format('YYYY-MM-DD'),
                          );
                        }}
                      >
                        {i - +monthInfo.firstDay + 1}
                      </button>
                    </div>
                  </div>
                );
              }
              if (
                (+moment().format('YYYY') === year &&
                  month >= new Date().getMonth() + 1) ||
                +moment().format('YYYY') < year
              ) {
                return (
                  <div className="calendar__body__day" key={i}>
                    <div className="calendar__body__day__number">
                      <button
                        className="date"
                        id={moment(
                          new Date(
                            year,
                            month - 1,
                            i - +monthInfo.firstDay + 1,
                          ),
                        ).format('YYYY-MM-DD')}
                        onClick={(e: any) => {
                          e.preventDefault();
                          Array.from(
                            document.getElementsByClassName('date'),
                          ).forEach(el => {
                            el.classList.remove('dateSelected');
                          });
                          selection.current = e.target.id;
                          (
                            document.getElementById(`${e.target.id}`) as any
                          ).classList.add('dateSelected');
                          props.clicked(
                            moment(
                              new Date(
                                year,
                                month - 1,
                                i - +monthInfo.firstDay + 1,
                              ),
                            ).format('YYYY-MM-DD'),
                          );
                        }}
                      >
                        {i - +monthInfo.firstDay + 1}
                      </button>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </Calendar>
  );
}

export const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.background};
`;

const Calendar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  .calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.background};
    .calendar__header {
      display: flex;
      background-color: ${p => p.theme.background};
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      .calendar__header__month {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-height: 2rem;
        .calendar__header__month__arrow {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          max-width: 2rem;
          cursor: pointer;
          svg {
            stroke-width: 2px;
            width: 100%;
            height: 100%;
            aspect-ratio: 1/1;
            color: ${p => p.theme.text};
          }
        }
        .calendar__header__month__name {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 80%;
          h1 {
            margin: 0.5rem 0;
            font-size: 1.5rem;
            font-weight: 700;
            color: ${p => p.theme.text};
          }
        }
        .calendar__header__month__name__year {
          font-weight: 200;
        }
      }
      .calendar__header__days {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        .calendar__header__days__day {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 14.285714285714285714285714285714%;
          transform: translateY(2px);
          h1 {
            margin: 0;
            font-size: 1rem;
            font-weight: 700;
            color: ${p => p.theme.text};
            ${media.small} {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    .calendar__body {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 90%;
      flex-wrap: wrap;
      .calendar__body__day {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 14.285714285714285714285714285714%;
        aspect-ratio: 1;
        /* height: 14.285714285714285714285714285714%; */
        padding: 2px;
        .calendar__body__day__number {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          .today {
            text-decoration: underline;
          }
          .dateSelected {
            /* background-color: #3f51b5; */
            background-color: ${p => p.theme.promptRed};
          }
          button {
            border-radius: 0.5rem;
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            font-size: 0.8rem;
            font-weight: 700;
            color: ${p => p.theme.text};
            cursor: pointer;
            background-color: ${p => p.theme.border};
            &:disabled {
              background-color: transparent;
              color: ${p => p.theme.textSecondary};
              &:hover {
                background-color: transparent;
                cursor: not-allowed;
                border: none;
              }
            }
            &:hover {
              border: 2px solid ${p => p.theme.border};
            }
            ${media.small} {
              font-size: 0.9rem;
            }
            ${media.medium} {
              font-size: 0.95rem;
            }
          }
        }
      }
    }
  }
`;
