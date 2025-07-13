const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const moment = require("moment");

router.get("/weekly-registrations", async (req, res) => {
  try {
    const startOfWeek = moment().startOf('isoWeek').toDate(); 
    const endOfWeek = moment().endOf('isoWeek').toDate();     

    const data = await Enrollment.aggregate([
      {
        $match: {
          enrollmentDate: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$enrollmentDate" }, 
          count: { $sum: 1 },
        },
      },
    ]);

    const dayMap = {
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
      1: "Sun",
    };
    const result = Object.entries(dayMap).map(([num, label]) => {
      const match = data.find((item) => item._id === parseInt(num));
      return {
        day: label,
        progress: match ? match.count : 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching weekly registrations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
