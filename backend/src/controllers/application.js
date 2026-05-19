import AddApplicationData from "../models/addApplication.js";
import UserData from "../models/userModel.js";
export const addApplication = async (req, res) => {
  try {
    const { userId } = req.body;
    const id = await UserData.findById(userId);
    if (!id) {
      console.log("Yes Not Found");
      return res.status(400).json({ message: "User Not Found!!" });
    }
    // const useAddApkData=await AddApplicationData.findOne({userId});
    // if(!useAddApkData){
    //     return res.status(404).json({
    //         error:"Application data not found"
    //     })
    // };

    const {
      company,
      role,
      status,
      applied_date,
      location,
      interview_date,
      notes,
    } = req.body;
    if (
      !company ||
      !role ||
      !status ||
      !applied_date ||
      !location ||
      !interview_date ||
      !notes
    ) {
      return res.status(400).json({ error: "All feild required!!" });
    }
    const addApplication = await AddApplicationData.create({
      userId: userId,
      company,
      role,
      status,
      applied_date,
      location,
      interview_date,
      notes,
    });
    return res.status(200).json({
      message: "Log New Application Successfully",
      data: {
        _id: addApplication._id,
        company: addApplication.company,
        role: addApplication.role,
        status: addApplication.status,
        applied_date: addApplication.applied_date,
        location: addApplication.location,
        interview_date: addApplication.interview_date,
        notes: addApplication.notes,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export const getJobApplication = async (req, res) => {
  try {
    const { userId } = req.body;
    const id = await UserData.findById(userId);
    if (!id) {
      console.log("Yes Not Found");
      return res.status(400).json({ message: "User Not Found!!" });
    }

    const applications = await AddApplicationData.find({ userId: userId }).sort(
      { applied_date: -1 },
    );
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No Applications Found" });
    }
    res.status(200).json(applications);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export const getJobApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await AddApplicationData.findById(id);
    if (!application)
      return res.status(404).json({ error: "Application not found" });

    return res.status(200).json(application);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server Error", details: error.message });
  }
};

export const updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const application = await AddApplicationData.findOne({ _id: id, userId });
    if (!application)
      return res
        .status(404)
        .json({ error: "Applications not found or unauthorized" });
    const {
      company,
      role,
      status,
      applied_date,
      location,
      interview_date,
      notes,
    } = req.body;

    if (company) application.company = company;
    if (role) application.role = role;
    if (status) application.status = status;
    if (applied_date) application.applied_date = applied_date;
    if (location) application.location = location;
    if (interview_date) application.interview_date = interview_date;
    if (notes) application.notes = notes;

    const updateApplication = await application.save();

    return res.status(200).json({
      message: "Application Update Successfully",
      data: updateApplication,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server Error", details: error.message });
  }
};
