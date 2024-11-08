const Notice = require("../models/Notice");

exports.createNotice = async (req, res) => {
  try {
    const { batch, branch, studentIds, notice } = req.body;

    const newNotice = new Notice({
      batch,
      branch,
      studentIds,
      notice,
    });

    await newNotice.save();
    res
      .status(201)
      .json({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error:" });
  }
};

exports.getNoticesForStudent = async (req, res) => {
  const batch = req.query.batch;
  const branch = req.query.branch;
  const studentId = req.query.studentId;

  try {
    const notices = await Notice.find({
      batch,
      branch,
      studentIds: studentId,
    });

    res.status(200).json({ notices });
  } catch (error) {
    console.error("Error fetching notices", error);
    res.status(500).json({ message: "Error fetching notices", error });
  }
};
