import { client } from '../../../config';

interface Stadium {
  id?: number;
  name: string;
  description: string;
  size: number;
  location: string;
  cost_per_hour: number;
  stadium_number: number;
  status: string;
  photo: string;
}

// stadium status enum: available, unavailable
enum StadiumStatus {
  AVAILABLE,
  UNAVAILABLE,
}

class StadiumModel {
  async getAvailableStadiumsByDate(
    reservationDate: string,
    reservationTime: string
  ): Promise<Stadium[]> {
    // get all available stadiums that are not booked on the given date
    try {
      const sql = `SELECT * FROM stadiums WHERE id NOT IN (SELECT stadium_id FROM reservations WHERE date = $1 AND $2 NOT BETWEEN start_time AND end_time) AND status = $3`;
      const result = await client.query(sql, [
        reservationDate,
        reservationTime,
        StadiumStatus.AVAILABLE.toString(),
      ]);
      return result.rows;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
  async getAllStadiums(): Promise<Stadium[]> {
    try {
      const sql = `SELECT * FROM stadiums`;
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async getStadiumById(id: number): Promise<Stadium> {
    try {
      const sql = `SELECT * FROM stadiums WHERE id = $1`;
      const result = await client.query(sql, [id]);
      const stadium = result.rows[0];
      return stadium;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async addStadium(stadium: Stadium): Promise<Stadium> {
    try {
      const sql = `INSERT INTO stadiums (name, description, size, location, cost_per_hour, stadium_number, status, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      const result = await client.query(sql, [
        stadium.name,
        stadium.description,
        stadium.size,
        stadium.location,
        stadium.cost_per_hour,
        stadium.stadium_number,
        stadium.status,
        stadium.photo,
      ]);
      const newStadium = result.rows[0];
      return newStadium;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async updateStadium(id: number, stadium: Stadium): Promise<Stadium> {
    try {
      const sql = `UPDATE stadiums SET name =$1 , description = $2, size = $3, location = $4, cost_per_hour = $5, stadium_number = $6, status = $7, photo = $8 WHERE id = $9 RETURNING *`;
      const result = await client.query(sql, [
        stadium.name,
        stadium.description,
        stadium.size,
        stadium.location,
        stadium.cost_per_hour,
        stadium.stadium_number,
        stadium.status,
        stadium.photo,
        id,
      ]);
      const updatedStadium = result.rows[0];
      return updatedStadium;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async deleteStadium(id: number): Promise<boolean> {
    try {
      const sql = `DELETE FROM stadiums WHERE id = $1 RETURNING *`;
      const result = await client.query(sql, [id]);
      return result.rowCount > 0;

    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { Stadium, StadiumModel };
