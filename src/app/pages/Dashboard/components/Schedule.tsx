import styled from 'styled-components/macro';
import { media } from 'styles/media';

import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';

import {
  EmployeeModel,
  UserModel,
  ServiceModel,
  LocationModel,
} from '../../../../utils/model';

async function getPeople(locationId: string) {
  if (!locationId) return;
  const response = await axios.get(
    `https://api.syathen.com/employees/${locationId}/`,
  );
  const data = await response.data;
  return data;
}

async function getService(service: string) {
  if (!service) return;
  const response = await axios.get(
    `https://api.syathen.com/service/${service}/`,
  );
  const data = await response.data;
  return data;
}

const listPeople = (people: any, personCallback: any) => {
  if (people.length === 1) personCallback(people[0]);
  else {
    return people.map((person: any) => {
      if (person.is_active) {
        return (
          <SelectionItem key={person.id} onClick={() => personCallback(person)}>
            <p
              title={person.name || `${person.first_name} ${person.last_name}`}
            >
              {person.name || person.first_name}
            </p>
          </SelectionItem>
        );
      }
      return null;
    });
  }
};

const listService = (services: any, serviceCallback: any) => {
  if (services.length === 1) serviceCallback(services[0]);
  else {
    return services.map((service: any) => {
      if (service.is_active) {
        return (
          <SelectionItem
            key={service.service_id}
            onClick={() => serviceCallback(service)}
          >
            {/* <p
              title={service.name || `${service.first_name} ${service.last_name}`}
            >
              {service.name || service.first_name}
            </p> */}
          </SelectionItem>
        );
      }
      return null;
    });
  }
};

export const Book = (props: any): any => {
  const { slug, location, locations } = props;

  const [people, setPeople] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const person = useRef<any>(null);
  const service = useRef<any>(null);

  if (people.length === 0) {
    getPeople(location)
      .then(data => {
        if (data) {
          setPeople(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  if (!person.current && !services[0]) {
    services.length &&
      services.length < person.current.services.length &&
      person.current.services.map((serviceAvail: any) => {
        console.log('serviceAvail', serviceAvail);
        getService(serviceAvail)
          .then(data => {
            if (data) {
              if (data.meta.is_active) {
                console.log('data', data);
                if (services.length < person.current.services.length) {
                  console.log('data', data);
                  setServices(services.push(data));
                  console.log('services', services);
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  //   console.log(locations ? locations.find((l: any) => l.location_id === location).name : location,);
  const [stage, setStage] = useState(0);
  const personCallback = useCallback((personSel: any) => {
    setStage(1);
    person.current = personSel;
  }, []);
  const serviceCallback = useCallback((serviceSel: any) => {
    setStage(2);
    service.current = serviceSel;
  }, []);

  if (!slug) return null;
  if (!location) return null;
  if (!locations) return null;
  return (
    <BookNewView key={location}>
      {stage === 0 && (
        <>
          <h1>Who?</h1>
          {people.length > 0 && listPeople(people, personCallback)}
          {people.length === 0 && <p>No people</p>}
        </>
      )}
      {stage === 1 && services && (
        <>
          <h1>What?</h1>
          {services.length > 0 && listService(services, serviceCallback)}
          {services.length === 0 && <p>No services</p>}
        </>
      )}
    </BookNewView>
  );
};

export const BookNewView = styled.div`
  /* display: flex; */
  position: relative;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 1rem 1rem;
  min-height: 20rem;
  width: 100%;
  float: right;
  border-radius: 1rem;
  border: 1px solid ${p => p.theme.backgroundVariant};
  color: ${p => p.theme.text};
  h1 {
    font-size: larger;
    margin: auto;
  }
  hr {
    display: inline-flex;
    transform: translateY(-5px);
    border: 1px solid ${p => p.theme.textSecondary};
    width: 100%;
    margin: 0px;
  }
  ${media.mobile} {
    padding: 0.5rem 0.5rem;
    width: calc(100%-1rem);
    margin: 0 0.5;
    font-size: smaller;
  }
  ${media.small} {
    font-size: initial;
  }
  ${media.medium} {
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 1rem 1rem;
    width: calc(40% - 2rem);
    font-size: initial;
  }
`;

export const SelectionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 1rem;
  border: 1px solid ${p => p.theme.borderLight};
  background-color: ${p => p.theme.backgroundVariant};
  color: ${p => p.theme.text};
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.border};
  }
  p {
    margin: 0;
  }
  ${media.mobile} {
    padding: 0.5rem 0.5rem;
    font-size: smaller;
  }
  ${media.small} {
    font-size: initial;
  }
  ${media.medium} {
    padding: 0.5rem 1rem;
    font-size: initial;
  }
`;
