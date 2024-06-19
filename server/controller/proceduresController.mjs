import procedureModel from '../models/procedureModel.mjs';

const proceduresController = {
  createProcedure: async (req, res) => {
    try {
      const result = await procedureModel.createProcedure(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'An error occured while creating the tour' });
    }
  },

  updateProcedure: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await procedureModel.updateProcedure(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Procedure not found') {
        res.status(404).json({ message: 'Procedure not found' });
      } else {
        res.status(500).json({ message: 'An error occurred while updating the procedure' });
      }
    }
  },
  deleteProcedure: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProcedure = await procedureModel.deleteProcedure(id);
      if (!deletedProcedure) {
        return res.status(404).json({ message: 'Procedure not found' });
      }
      res.status(200).json({ message: 'Procedure deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getAllProcedures: async (req, res) => {
    try {
      const result = await procedureModel.getAllProcedures();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getProcedureById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await procedureModel.getProcedureById(id);
      if (!result) {
        return res.status(404).json({ message: 'Procedure not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  createProcedureTime: async (req, res) => {
    try {
      const result = await procedureModel.createProcedureTime(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'An error occured while creating the tour' });
    }
  },
};

export default proceduresController;
