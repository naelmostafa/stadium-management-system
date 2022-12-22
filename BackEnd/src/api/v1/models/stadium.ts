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
};

class StadiumModel {
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
      const sql = `SELECT * FROM stadiums WHERE id = ?`;
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
      const sql = `INSERT INTO stadiums (name, description, size, location, cost_per_hour, stadium_number, status, photo) VALUES (?,?,?,?,?,?,?,?) RETURNING *`;
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
      const sql = `UPDATE stadiums SET name = ?, description = ?, size = ?, location = ?, cost_per_hour = ?, stadium_number = ?, status = ?, photo = ? WHERE id = ? RETURNING *`;
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

  async deleteStadium(id: number): Promise<Stadium> {
    try {
      const sql = `DELETE FROM stadiums WHERE id = ? RETURNING *`;
      const result = await client.query(sql, [id]);
      const deletedStadium = result.rows[0];
      return deletedStadium;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { Stadium, StadiumModel }