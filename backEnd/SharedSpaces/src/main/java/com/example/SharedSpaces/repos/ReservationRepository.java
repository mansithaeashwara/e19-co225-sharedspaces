package com.example.SharedSpaces.repos;

import com.example.SharedSpaces.models.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
    Optional<Reservation> findBySpaceIDAndStartDateTimeAndEndDateTime(int spaceID, Date startDateTime,
            Date endDateTime);

    List<Reservation> findBySpaceIDAndDate(int spaceID, String date);

    Reservation findBySpaceIDAndDateAndReservedById(int spaceID, String date, long reservedById);

    Reservation findBySpaceIDAndDateAndResponsiblePersonId(int spaceID, String date, long responsiblePersonId);

    List<Reservation> findByReservedById(long id);

    List<Reservation> findByReservationDateTimeBefore(Date reservationDateTime);

    List<Reservation> findByResponsiblePersonId(long id);
}
