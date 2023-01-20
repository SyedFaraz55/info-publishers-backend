const express = require("express");
const auth = require("../middleware/auth");
const { Admin } = require("../Schemas/Admin");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Distributors } = require("../Schemas/Distributor");
const { Series } = require("../Schemas/Series");
const { Class } = require("../Schemas/Classes");
const { Subject } = require("../Schemas/Subjects");
const { Lessons } = require("../Schemas/Lessons");
const { School } = require("../Schemas/School");
const { Student } = require("../Schemas/Student");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("../s3");
const { Notice } = require("../Schemas/Notices");

router.get("/", async (req, res) => {
  return res.send(200);
});

router.post("/notice", async (req, res) => {
  try {
    const r = new Notice(req.body);
    r.save();
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.post("/get-notice", async (req, res) => {
  try {
    const r = await Notice.find({ role: req.body.role });
    return res.status(200).json({ ok: true, data: r });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.get("/get-notices", async (req, res) => {
  try {
    const r = await Notice.find({});
    return res.status(200).json({ ok: true, data: r });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.post("/delete-notices", async (req, res) => {
  try {
    const r = await Notice.deleteOne({ _id: req.body.id });
    if (r.deletedCount > 0) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(200).json({ ok: false });
    }
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.post("/add-user", async (req, res) => {
  let admin = await Admin.findOne({ user: req.body.user });
  if (admin)
    return res.status(400).json({ ok: false, message: "User already exits" });

  admin = new Admin(req.body);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  const result = _.pick(admin, ["_id", "user"]);
  return res.header("x-auth-token", token).send({ ...result, ok: true });
});

router.post("/login", async (req, res) => {
  let admin = await Admin.findOne({ user: req.body.user });

  if (!admin)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const token = admin.generateAuthToken();

  return res.json({ ok: true, token, user: admin });
});

router.post("/add-distributor", async (req, res) => {
  let result = await Distributors.findOne({ firmName: req.body.firmName });

  if (result)
    return res
      .status(400)
      .json({ ok: false, message: "Distributor already exits" });

  let dist = new Distributors(req.body);
  const salt = await bcrypt.genSalt(10);
  dist.password = await bcrypt.hash(dist.password, salt);
  try {
    await dist.save();
    return res
      .status(200)
      .json({ ok: true, message: "Distributor successfully added" });
  } catch (err) {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to add distributors" });
  }
});

router.post("/dist-login", async (req, res) => {
  let result = await Distributors.findOne({ mobile: req.body.mobile });

  if (!result)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const validPassword = await bcrypt.compare(
    req.body.password,
    result.password
  );
  if (!validPassword)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const token = result.generateAuthToken();

  return res.json({ ok: true, token, user: result });
});

router.get("/get-dist", async (req, res) => {
  const ress = await Distributors.find();
  return res.status(200).json({ ok: true, result: ress });
});

router.post("/delete-dist", async (req, res) => {
  const ress = await Distributors.deleteOne({ _id: req.body.id });
  if (ress.deletedCount > 0) {
    return res.status(200).json({ ok: true, message: "Distributor Deleted" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Deleted Distributor" });
  }
});

router.post("/delete-series", async (req, res) => {
  const ress = await Series.deleteOne({ _id: req.body.id });
  if (ress.deletedCount > 0) {
    return res.status(200).json({ ok: true, message: "Series Deleted" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Deleted Series" });
  }
});

router.post("/delete-class", async (req, res) => {
  const ress = await Class.updateOne(
    { id: req.body.id },
    {
      $set: {
        classes: req.body.data,
      },
    }
  );
  if (ress.deletedCount > 0) {
    return res.status(200).json({ ok: true, message: "Class Deleted" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Deleted Class" });
  }
});

router.post("/delete-subject", async (req, res) => {
  const ress = await Subject.updateOne(
    { id: req.body.id },
    {
      $set: {
        subjects: req.body.data,
      },
    }
  );
  if (ress.deletedCount > 0) {
    return res.status(200).json({ ok: true, message: "Subject Deleted" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Deleted Subject" });
  }
});

router.post("/update-class", async (req, res) => {
  console.log(req.body);

  const ress = await Class.updateOne(
    { id: req.body.id },
    {
      $set: {
        classes: req.body.data.classes,
      },
    }
  );
  if (ress.modifiedCount > 0) {
    return res.status(200).json({ ok: true, message: "Class Added" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Update Class" });
  }
});

router.post("/update-subject", async (req, res) => {
  console.log(req.body);

  const ress = await Subject.updateOne(
    { id: req.body.id },
    {
      $set: {
        subjects: req.body.data.subjects,
      },
    }
  );
  if (ress.modifiedCount > 0) {
    return res.status(200).json({ ok: true, message: "Subject Added" });
  } else {
    return res
      .status(200)
      .json({ ok: false, message: "Failed to Update Class" });
  }
});

router.post("/add-series", async (req, res) => {
  const series = new Series(req.body);
  await series.save();

  return res.status(200).json({ ok: true, message: "Series added" });
});

router.post("/add-class", async (req, res) => {
  const result = new Class(req.body);
  await result.save();

  return res.status(200).json({ ok: true, message: "Classes added" });
});

router.post("/add-subject", async (req, res) => {
  const result = new Subject(req.body);
  await result.save();

  return res.status(200).json({ ok: true, message: "Subjects added" });
});

router.post("/get-subjects", async (req, res) => {
  const result = await Subject.find();

  return res.status(200).json({ ok: true, result });
});

router.post("/delete-school", async (req, res) => {
  const result = await School.deleteOne({ _id: req.body.id });
  console.log(result);
  return res.status(200).json({ ok: true, result });
});

router.get("/get-schools", async (req, res) => {
  const result = await School.find();

  return res.status(200).json({ ok: true, result });
});

router.post("/getSchoolsById", async (req, res) => {
  const result = await School.find({ distId: req.body.id });

  return res.status(200).json({ ok: true, result });
});

router.post("/getLessonsById", async (req, res) => {
  const result = await Lessons.find({ id: req.body.id });

  return res.status(200).json({ ok: true, result });
});

router.post("/add-lessons", async (req, res) => {
  const result = new Lessons(req.body);
  await result.save();

  return res.status(200).json({ ok: true, message: "Lessons added" });
});

router.get("/get-lessons", async (req, res) => {
  try {
    const result = await Lessons.find({});
    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    return res
      .status(200)
      .json({ ok: false, message: "failed to add lessons" });
  }
});

router.post("/add-school", async (req, res) => {
  const result = new School(req.body);
  const salt = await bcrypt.genSalt(10);
  result.password = await bcrypt.hash(result.password, salt);
  await result.save();

  return res.status(200).json({ ok: true, message: "School added" });
});

router.post("/add-student", async (req, res) => {
  try {
    const result = new Student(req.body);
    const salt = await bcrypt.genSalt(10);
    result.password = await bcrypt.hash(result.password, salt);
    await result.save();

    return res.status(200).json({ ok: true, message: "Student added" });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.get("/get-student/:id", async (req, res) => {
  try {
    const result = await Student.find({ school: req.params.id });
    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});

router.get("/get-studentByClass/:id", async (req, res) => {
  try {
    const result = await Student.find({ standard: req.params.id });
    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    return res.status(200).json({ ok: false });
  }
});


router.post("/school-login", async (req, res) => {
  let result = await School.findOne({ mobile: req.body.mobile });

  if (!result)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const validPassword = await bcrypt.compare(
    req.body.password,
    result.password
  );
  if (!validPassword)
    return res
      .status(200)
      .json({ ok: false, message: "Invalid user or password" });

  const token = result.generateAuthToken();

  return res.json({ ok: true, token, user: result });
});

router.get("/get-class", async (req, res) => {
  const result = await Class.find();
  return res.status(200).json({ ok: true, result });
});

router.post("/getClassById", async (req, res) => {
  const result = await Class.find({ id: req.body.id });
  return res.status(200).json({ ok: true, result });
});

router.get("/get-series", async (req, res) => {
  const series = await Series.find();

  return res.status(200).json({ ok: true, series });
});

router.post("/s3url", upload.single("file"), async (req, res) => {
  console.log(req.files);
  try {
    const s = await uploadFile(req.file);
    return res.send({ url: s.Location });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
