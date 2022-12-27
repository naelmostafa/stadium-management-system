import { client } from '../../../config';

interface Reservation {
  id?: number;
  customer_id: number;
  date: string;
  start_time: string;
  end_time: string;
  stadium_id: number;
  deposit: number;
  total_price: number;
  payment_method: string;
}

class ReservationModel {
  async getAllReservations(): Promise<Reservation[]> {
    try {
      const sql = `SELECT * FROM reservations`;
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async getReservationById(id: number): Promise<Reservation> {
    try {
      const sql = `SELECT * FROM reservations WHERE id = $1`;
      const result = await client.query(sql, [id]);
      const reservation = result.rows[0];
      return reservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
  async isReservationAvailable(
    reservationDate: string,
    reservationStartTime: string,
    reservationEndTime: string,
    stadiumId: number,
    reservationId?: number
  ): Promise<boolean> {
    try {
      if (reservationId) {
        const sql = `SELECT * FROM reservations WHERE date =$1
      AND ( (start_time >=$2 AND start_time < $3) OR (end_time>$2 AND end_time<$3 ) )
    AND stadium_id = $4 AND id != $5;`;
        const result = await client.query(sql, [
          reservationDate,
          reservationStartTime,
          reservationEndTime,
          stadiumId,
          reservationId,
        ]);
        if (result.rowCount === 0) {
          return true;
        }
        return false;
      } else {
        const sql = `SELECT * FROM reservations WHERE date =$1
      AND ( (start_time >=$2 AND start_time < $3) OR (end_time>$2 AND end_time<$3 ) )
    AND stadium_id = $4;`;
        const result = await client.query(sql, [
          reservationDate,
          reservationStartTime,
          reservationEndTime,
          stadiumId,
        ]);
        if (result.rowCount === 0) {
          return true;
        }
      }
      return false;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async addReservation(reservation: Reservation): Promise<Reservation> {
    try {
      const sql = `INSERT INTO reservations (customer_id, date, start_time, end_time, stadium_id, deposit, total_price, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      const result = await client.query(sql, [
        reservation.customer_id,
        reservation.date,
        reservation.start_time,
        reservation.end_time,
        reservation.stadium_id,
        reservation.deposit,
        reservation.total_price,
        reservation.payment_method,
      ]);
      if (result.rows.length !== 1)
        throw new Error('Something went wrong.Reservation not addeed');
      const newReservation = result.rows[0];
      return newReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async updateReservation(
    id: number,
    reservation: Reservation
  ): Promise<Reservation> {
    try {
      const sql = `UPDATE reservations SET customer_id = $1, date = $2, start_time = $3, end_time = $4, stadium_id = $5, deposit = $6, total_price = $7, payment_method = $8 WHERE id = $9 RETURNING *`;
      const result = await client.query(sql, [
        reservation.customer_id,
        reservation.date,
        reservation.start_time,
        reservation.end_time,
        reservation.stadium_id,
        reservation.deposit,
        reservation.total_price,
        reservation.payment_method,
        id,
      ]);
      const updatedReservation = result.rows[0];
      return updatedReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async deleteReservation(id: number): Promise<Reservation> {
    try {
      const sql = `DELETE FROM reservations WHERE id = $1 RETURNING *`;
      const result = await client.query(sql, [id]);
      const deletedReservation = result.rows[0];
      return deletedReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { Reservation, ReservationModel };
