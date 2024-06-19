import { pool } from '../db/postgresConnection.mjs';

const procedureModel = {
  createProcedure: async (data) => {
    try {
      const { name, category, duration, image, price } = data;
      const result = await pool.query(
        'INSERT INTO procedures (name, category, duration, image, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, category, duration, image, price],
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProcedure: async (id, updatedFields) => {
    try {
      const setFields = Object.keys(updatedFields)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');

      const values = [...Object.values(updatedFields), id];

      const result = await pool.query(
        `UPDATE procedures SET ${setFields} WHERE id = $${values.length} RETURNING *`,
        values,
      );

      if (result.rowCount === 0) {
        throw new Error('Project not found');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error in updateTour:', error.message);
      throw error;
    }
  },
  deleteProcedure: async (id) => {
    try {
      const query = 'DELETE FROM procedures WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getProcedureById: async (id) => {
    try {
      const query = 'SELECT * FROM procedures WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllProcedures: async () => {
    try {
      const query = 'SELECT * FROM procedures';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createProcedureTime: async (data) => {
    try {
      const { date_time, start_time, procedure_id } = data;
      const result = await pool.query(
        'INSERT INTO procedure_visits (date_time, start_time, procedure_id) VALUES ($1, $2, $3) RETURNING *',
        [date_time, start_time, procedure_id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getProcedureTime: async (id) => {
    try {
      const query = 'SELECT * FROM procedure_visits WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default procedureModel;
