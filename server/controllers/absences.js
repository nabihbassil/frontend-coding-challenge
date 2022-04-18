import Absence from "../models/absence.js";
import Member from "../models/member.js";

export const getAbsences = async (req, res) => {
    try {
      //  const items = await Absence.find();

      const items = await Absence.aggregate([
                { $lookup:
                    {
                        from: "members",
                        localField: 'userId',
                        foreignField: 'userId',
                        as: 'memInfo'
                    }
                }
            ]);    

        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAbsence = async (req, res) => {
    const id = req.params.id;

    try {
        const item = await Absence.findById(id);
        res.status(200).json(item);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}
