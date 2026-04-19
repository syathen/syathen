import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import dayjs from 'dayjs';

import { updateBookingStatus, cancelBooking } from 'utils/bookingUtils';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface BookingDetailProps {
  booking: any;
  onClose: () => void;
  onStatusChange: () => void;
}

export function BookingDetail({
  booking,
  onClose,
  onStatusChange,
}: BookingDetailProps) {
  const [loading, setLoading] = useState(false);
  const status = booking.meta?.status || 'pending';

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      if (newStatus === 'cancelled') {
        await cancelBooking(
          booking.booking_id,
          booking.details.employee.employee_id,
          booking.details.date,
        );
      } else {
        await updateBookingStatus(booking.booking_id, newStatus);
      }
      onStatusChange();
      onClose();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const time = () => {
    const t = booking.details.time?.time || booking.details.time;
    if (!t) return '';
    return dayjs(`2000-01-01 ${t}`).format('h:mm A');
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Booking Details</h2>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </ModalHeader>

        <StatusRow>
          <StatusPill $status={status}>{status}</StatusPill>
        </StatusRow>

        <Section>
          <SectionTitle>Customer</SectionTitle>
          <DetailRow>
            <DetailLabel>Name</DetailLabel>
            <DetailValue>
              {booking.customer.name ||
                `${booking.customer.first_name || ''} ${booking.customer.last_name || ''}`.trim() ||
                'N/A'}
            </DetailValue>
          </DetailRow>
          {booking.customer.email && (
            <DetailRow>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{booking.customer.email}</DetailValue>
            </DetailRow>
          )}
          {booking.customer.phone && (
            <DetailRow>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>{booking.customer.phone}</DetailValue>
            </DetailRow>
          )}
        </Section>

        <Section>
          <SectionTitle>Appointment</SectionTitle>
          <DetailRow>
            <DetailLabel>Date</DetailLabel>
            <DetailValue>
              {dayjs(booking.details.date).format('dddd, MMMM D, YYYY')}
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Time</DetailLabel>
            <DetailValue>{time()}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Employee</DetailLabel>
            <DetailValue>
              {booking.details.employee?.employee_name || 'N/A'}
            </DetailValue>
          </DetailRow>
        </Section>

        <Section>
          <SectionTitle>Service</SectionTitle>
          <DetailRow>
            <DetailLabel>Service</DetailLabel>
            <DetailValue>
              {booking.details.service?.service_name || 'N/A'}
            </DetailValue>
          </DetailRow>
          {booking.details.service?.service_price != null && (
            <DetailRow>
              <DetailLabel>Price</DetailLabel>
              <DetailValue>
                {USDollar.format(booking.details.service.service_price)}
              </DetailValue>
            </DetailRow>
          )}
          {booking.details.service?.service_duration != null && (
            <DetailRow>
              <DetailLabel>Duration</DetailLabel>
              <DetailValue>
                {booking.details.service.service_duration} min
              </DetailValue>
            </DetailRow>
          )}
        </Section>

        <ActionRow>
          {status === 'pending' && (
            <ActionBtn
              $variant="confirm"
              onClick={() => handleStatusChange('confirmed')}
              disabled={loading}
            >
              Confirm
            </ActionBtn>
          )}
          {status === 'confirmed' && (
            <>
              <ActionBtn
                $variant="complete"
                onClick={() => handleStatusChange('completed')}
                disabled={loading}
              >
                Complete
              </ActionBtn>
              <ActionBtn
                $variant="noshow"
                onClick={() => handleStatusChange('no-show')}
                disabled={loading}
              >
                No-Show
              </ActionBtn>
            </>
          )}
          {status !== 'cancelled' && status !== 'completed' && (
            <ActionBtn
              $variant="cancel"
              onClick={() => handleStatusChange('cancelled')}
              disabled={loading}
            >
              Cancel
            </ActionBtn>
          )}
        </ActionRow>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Modal = styled.div`
  background: ${p => p.theme.background};
  border: 1px solid ${p => p.theme.border};
  border-radius: 1rem;
  width: 90%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  ${media.medium} {
    padding: 2rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: ${p => p.theme.text};
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${p => p.theme.textSecondary};
  padding: 0;
  line-height: 1;
`;

const StatusRow = styled.div`
  margin-bottom: 1rem;
`;

const StatusPill = styled.span<{ $status: string }>`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  text-transform: capitalize;
  background-color: ${p => {
    switch (p.$status) {
      case 'confirmed':
      case 'completed':
        return p.theme.promptGreen;
      case 'cancelled':
      case 'no-show':
        return p.theme.promptRed;
      default:
        return p.theme.primary;
    }
  }};
  color: ${p => p.theme.background};
`;

const Section = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${p => p.theme.textSecondary};
  margin: 0 0 0.5rem 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${p => p.theme.text};
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: ${p => p.theme.textSecondary};
  text-align: right;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button<{ $variant: string; disabled?: boolean }>`
  flex: 1;
  min-width: 100px;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  color: ${p => p.theme.background};
  background-color: ${p => {
    switch (p.$variant) {
      case 'confirm':
      case 'complete':
        return p.theme.promptGreen;
      case 'cancel':
      case 'noshow':
        return p.theme.promptRed;
      default:
        return p.theme.primary;
    }
  }};
`;
