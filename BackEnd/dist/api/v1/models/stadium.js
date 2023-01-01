"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StadiumModel = void 0;
const config_1 = require("../../../config");
// stadium status enum: available, unavailable
var StadiumStatus;
(function (StadiumStatus) {
    StadiumStatus["AVAILABLE"] = "available";
    StadiumStatus["UNAVAILABLE"] = "unavailable";
})(StadiumStatus || (StadiumStatus = {}));
class StadiumModel {
    async getAvailableStadiumsByDate(reservationDate, reservationStartTime, reservationEndTime) {
        // get all available stadiums that are not booked on the given date
        try {
            const sql = `SELECT * FROM stadiums WHERE id NOT IN
       (SELECT stadium_id FROM reservations WHERE date = $1 AND 
        ( (start_time >=$2 AND start_time < $3) OR (end_time>$2 AND end_time<$3 ) ))
         AND status LIKE $4`;
            const result = await config_1.client.query(sql, [
                reservationDate,
                reservationStartTime,
                reservationEndTime,
                StadiumStatus.AVAILABLE.toString(),
            ]);
            return result.rows;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async getAllStadiums() {
        try {
            const sql = `SELECT * FROM stadiums`;
            const result = await config_1.client.query(sql);
            return result.rows;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async getStadiumById(id) {
        try {
            const sql = `SELECT * FROM stadiums WHERE id = $1`;
            const result = await config_1.client.query(sql, [id]);
            const stadium = result.rows[0];
            return stadium;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async addStadium(stadium) {
        try {
            const sql = `INSERT INTO stadiums (name, description, size, location, cost_per_hour, stadium_number, status, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            const result = await config_1.client.query(sql, [
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
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async updateStadium(id, stadium) {
        try {
            const sql = `UPDATE stadiums SET name =$1 , description = $2, size = $3, location = $4, cost_per_hour = $5, stadium_number = $6, status = $7, photo = $8 WHERE id = $9 RETURNING *`;
            const result = await config_1.client.query(sql, [
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
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async deleteStadium(id) {
        try {
            const sql = `DELETE FROM stadiums WHERE id = $1 RETURNING *`;
            const result = await config_1.client.query(sql, [id]);
            return result.rowCount > 0;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
}
exports.StadiumModel = StadiumModel;
