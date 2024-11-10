const Notice = require("../models/Notice");

exports.createNotice = async (req, res) => {
  try {
    const { batch, branch, studentIds, notice } = req.body;

    let targetStudentIds = studentIds;

    if (studentIds.includes("all")) {
      const generatedIds = [];

      for (let i = 1; i <= 130; i++) {
        const idNumber = i.toString().padStart(3, "0");
        generatedIds.push(`${batch}${branch}${idNumber}@iiitn.ac.in`);
      }

      targetStudentIds = generatedIds;
    }

    const newNotice = new Notice({
      batch,
      branch,
      studentIds: targetStudentIds,
      notice,
    });

    await newNotice.save();
    res
      .status(201)
      .json({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNoticesForStudent = async (req, res) => {
  const { batch, branch, studentId } = req.query;

  try {
    let notices;

    if (studentId === "all") {
      // Fetch all notices relevant to the specified batch and branch
      notices = await Notice.find({
        batch,
        branch,
      });
    } else {
      // Fetch notices for the specified studentId and also include "all"
      notices = await Notice.find({
        batch,
        branch,
        studentIds: { $in: [studentId, "all"] },
      });
    }

    res.json({ notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Error fetching notices" });
  }
};
