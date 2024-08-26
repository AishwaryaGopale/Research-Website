const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const pg = require("pg");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require("sequelize");
const port = 5002;

// Database connection
const db = new Pool({
  user: "postgres",
  host: "34.71.87.187",
  database: "ResearchDB",
  password: "India@5555",
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/journals/";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

////////////////////research bot////////////////
app.get("/research-api/researchbot", (req, res) => {
  const sqlGet = `
   SELECT 
  a.email AS "useremail",
  a.organizationname AS "organizationname",
  b.researchid,
  b.resdescription,
  b.industry,
  b.themes,
  b.researchtitle,
  b.objectives,
  b.introduction,
  b.abstraction,
  b.bibliography,
  b.methodology,
  b.hypothesis,
  b.likertscale,
  b.dataset,
  b.stattesting,
  b.inferences,
  b.conclusion,
  b.researchsteam
FROM 
  registration a
JOIN 
  researchbuttondb b 
ON 
  a.regid = b.regid`;

  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});

app.post("/research-api/research", async (req, res) => {
  const {
    resdescription,
    industry,
    themes,
    researchtitle,
    objectives,
    introduction,
    abstraction,
    bibliography,
    methodology,
    hypothesis,
    likertscale,
    dataset,
    stattesting,
    inferences,
    conclusion,
    researchsteam,
    regid,
  } = req.body;

  // Log the incoming data
  console.log('Received data:', {
    resdescription,
    industry,
    themes,
    researchtitle,
    objectives,
    introduction,
    abstraction,
    bibliography,
    methodology,
    hypothesis,
    likertscale,
    dataset,
    stattesting,
    inferences,
    conclusion,
    researchsteam,
    regid,
  });

  // Validate data types
  if (isNaN(parseInt(regid))) {
    return res.status(400).json({ error: "Invalid regid value" });
  }

  const sqlInsert = `
    INSERT INTO researchbuttondb (
      resdescription, industry, themes, researchtitle, objectives, introduction, abstraction, bibliography, methodology, hypothesis, likertscale, dataset, stattesting, inferences, conclusion, researchsteam, regid
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
    ) RETURNING researchid;
  `;

  try {
    const result = await db.query(sqlInsert, [
      resdescription,
      industry,
      themes,
      researchtitle,
      objectives,
      introduction,
      abstraction,
      bibliography,
      methodology,
      hypothesis,
      likertscale,
      dataset,
      stattesting,
      inferences,
      conclusion,
      researchsteam,
      regid,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/////////startup idea db////////
app.get("/research-api/startupbot", (req, res) => {
  const sqlGet = `
   SELECT 
    a.email AS "useremail",
    a.organizationname AS "organizationname",
    b.startupid,
    b.startupdescription,
    b.startuptitle,
    b.startupproblem,
    b.startupsolution,
    b.startuparchitect,
    b.startuptool,
    b.startupschedule,
    b.startupcanvamodel,
    b.startupmarketarea,
    b.startuprevenuemodel,
    b.startupreport,
    b.startupimpact,
    b.startuptechnologies,
    b.startupsteam,
    b.startupvision
  FROM 
  registration a
JOIN 
  startupdb b 
ON 
  a.regid = b.regid`;

  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});


app.post("/research-api/startup", (req, res) => {
  const {
    startupdescription,
    startuptitle,
    startupproblem,
    startupsolution,
    startuparchitect,
    startuptool,
    startupschedule,
    startupcanvamodel,
    startupmarketarea,
    startuprevenuemodel,
    startupreport,
    startupimpact,
    startuptechnologies,
    startupsteam,
    startupvision,
    regid,
  } = req.body;

  const sqlInsert = `
    INSERT INTO startupdb (
      startupdescription, startuptitle, startupproblem, startupsolution, startuparchitect, startuptool, startupschedule, startupcanvamodel, startupmarketarea, startuprevenuemodel, startupreport, startupimpact, startuptechnologies, startupsteam, startupvision, regid
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
    ) RETURNING startupid;
  `;

  db.query(
    sqlInsert,
    [
      startupdescription,
      startuptitle,
      startupproblem,
      startupsolution,
      startuparchitect,
      startuptool,
      startupschedule,
      startupcanvamodel,
      startupmarketarea,
      startuprevenuemodel,
      startupreport,
      startupimpact,
      startuptechnologies,
      startupsteam,
      startupvision,
      regid,
    ],
    (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(result.rows[0]);
    }
  );
});

///////////////////////patent button/////////////////////
app.get("/research-api/patentbot", (req, res) => {
  const sqlGet = `
   SELECT 
  a.email AS "useremail",
  a.organizationname AS "organizationname",
  b.patentid,
  b.patentdescription,
  b.patentnumber,
  b.inventors,
  b.patentvaluechain,
  b.patenttechnology,
  b.patentrelatedterms
  FROM 
    registration a
  JOIN 
    patentdb b 
  ON 
    a.regid = b.regid`;

  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});

app.post("/research-api/patent", (req, res) => {
  const {
    patentdescription,
    patentnumber,
    inventors,
    patentvaluechain,
    patenttechnology,
    patentrelatedterms,
    regid,
  } = req.body;
  
  const sqlInsert = `
    INSERT INTO patentdb (
      patentdescription, patentnumber, inventors, patentvaluechain, patenttechnology, patentrelatedterms, regid
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING patentid;
  `;
  db.query(
    sqlInsert,
    [
      patentdescription,
      patentnumber,
      inventors,
      patentvaluechain,
      patenttechnology,
      patentrelatedterms,
      regid,
    ],
    (error, result) => {
      if (error) {
        console.error("Error inserting data:", error); // Detailed error logging
        return res.status(500).json({ error: error.message }); // Return detailed error message
      }
      res.json(result.rows[0]);
    }
  );
});

//////////////////valuechain db////////////////////
app.get("/research-api/vcbot", (req, res) => {
  const sqlGet = `
   SELECT 
  a.email AS "useremail",
  a.organizationname AS "organizationname",
  b.valuechainid,
  b.valuechaindescription,
  b.valuechain,
  b.subvaluechain,
  b.valuechaintechnology,
  b.valuechainsubtechnology,
  b.valuechainrelatedterms
  FROM 
    registration a
  JOIN 
    valuechaindb b 
  ON 
    a.regid = b.regid`;

  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});

app.post("/research-api/valuechain", (req, res) => {
  const {
    valuechaindescription,
    valuechain,
    subvaluechain,
    valuechaintechnology,
    valuechainsubtechnology,
    valuechainrelatedterms,
    regid,
  } = req.body;

  const sqlInsert = `
    INSERT INTO valuechaindb (
      valuechaindescription, valuechain, subvaluechain, valuechaintechnology, valuechainsubtechnology, valuechainrelatedterms, regid
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING valuechainid;
  `;
  db.query(
    sqlInsert,
    [
      valuechaindescription,
      valuechain,
      subvaluechain,
      valuechaintechnology,
      valuechainsubtechnology,
      valuechainrelatedterms,
      regid,
    ],
    (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(result.rows[0]);
    }
  );
});

//////////////////////sdg project db//////////////////
app.get("/research-api/sdgbot", (req, res) => {
  const sqlGet = `
   SELECT 
  a.email AS "useremail",
  a.organizationname AS "organizationname",
  b.sdgid,
  b.sdgdescription,
  b.sdgtitle,
  b.sdgproblem,
  b.sdgsolution,
  b.sdgframework,
  b.sdgbenificiaries,
  b.sdgstakeholder,
  b.sdgsoftware,
  b.sdgalignment,
  b.sdgschedule,
  b.sdgimpact,
  b.sdgtechnologies,
  b.sdgsteam
  FROM 
    registration a
  JOIN 
    sdgdb b 
  ON 
    a.regid = b.regid`;
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});

app.post("/research-api/sdg", (req, res) => {
  const {
    sdgdescription,
    sdgtitle,
    sdgproblem,
    sdgsolution,
    sdgframework,
    sdgbenificiaries,
    sdgstakeholder,
    sdgsoftware,
    sdgalignment,
    sdgschedule,
    sdgimpact,
    sdgtechnologies,
    sdgsteam,
    regid,
  } = req.body;

  const sqlInsert = `
    INSERT INTO sdgdb (
      sdgdescription, sdgtitle, sdgproblem, sdgsolution, sdgframework, sdgbenificiaries,sdgstakeholder,sdgsoftware,sdgalignment,sdgschedule,sdgimpact,sdgtechnologies,sdgsteam,regid
    ) VALUES (
      $1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11, $12, $13, $14
    ) RETURNING sdgid;
  `;
  db.query(
    sqlInsert,
    [
      sdgdescription,
      sdgtitle,
      sdgproblem,
      sdgsolution,
      sdgframework,
      sdgbenificiaries,
      sdgstakeholder,
      sdgsoftware,
      sdgalignment,
      sdgschedule,
      sdgimpact,
      sdgtechnologies,
      sdgsteam,  
      regid,
    ],
    (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(result.rows[0]);
    }
  );
});

// Route to create a journal with file upload
app.post(
  "/research-api/createjournal",
  upload.single("journalFile"),
  async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { category, themes, month, volume, publishername, year, issn,link } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    try {
      const client = await db.connect();
      const query = `INSERT INTO public."journaldb"(category, themes, month, volume, publishername, year, issn,link, journalfile) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)`;
      const values = [
        category,
        themes,
        month,
        volume,
        publishername,
        year,
        issn,
        link,
        req.file.filename,
      ];
      await client.query(query, values);
      client.release();
      res.status(201).json({ message: "Journal created successfully" });
    } catch (error) {
      console.error("Error creating journal:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get('/research-api/journals', async (req, res) => {
  try {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM public."journaldb"');
    client.release();
    res.status(200).json(result.rows); // Ensure the response format matches your frontend expectations
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//////////////////bookdb////////////////
app.get("/research-api/books", (req, res) => {
  const sqlGet = "SELECT * FROM bookdb";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result.rows);
  });
});

// Route to create a journal with file upload
const uploadBook = upload.single("bookFile");
app.post("/research-api/createbook", uploadBook, async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { category, themes, month, volume, publishername, year, issn } =
    req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const client = await db.connect();
    const query = `INSERT INTO public."bookdb"(category, themes, month, volume, publishername, year, issn, bookfile) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [
      category,
      themes,
      month,
      volume,
      publishername,
      year,
      issn,
      req.file.filename,
    ];
    await client.query(query, values);
    client.release();
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/***USER AUTH****** */
const sequelize = new Sequelize("ResearchDB", "postgres", "India@5555", {
  host: "34.71.87.187",
  dialect: "postgres",
});

const user = sequelize.define(
  "registration",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "registration", 
    timestamps: false, 
  }
);

const users = []; // In-memory user store

// Register a new user
app.post('/research-api/register', async (req, res) => {
  const { membername, email, organizationname, password } = req.body;

  try {
    // Check if the user already exists
    const existingUserQuery = 'SELECT * FROM public.registration WHERE email = $1';
    const existingUserResult = await db.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO public.registration (membername, email, organizationname, password)
      VALUES ($1, $2, $3, $4)
      RETURNING regid;
    `;

    const newUserResult = await db.query(insertUserQuery, [membername, email, organizationname, hashedPassword]);

    // Registration successful
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err); 
    res.status(500).send('An error occurred while registering the user');
  }
});

// Login an existing user
app.post('/research-api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the user from the database
    const userQuery = 'SELECT * FROM public.registration WHERE email = $1';
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.regid, email: user.email }, 'secretKey', { expiresIn: '1h' });

    res.send({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send({ message: 'An error occurred during login' });
  }
});

// Protected route example
app.get("/research-api/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.send("Protected data");
  } catch (err) {
    res.status(401).send("Invalid token");
  }
});

///////////////Admin research///////////////////
app.delete('/research-api/researchbot/:researchid', async (req, res) => {
  const { researchid } = req.params;
  try {
    const query = 'DELETE FROM researchbuttondb WHERE researchid = $1';
    await db.query(query, [researchid]);
    res.status(200).json({ message: 'Research deleted successfully' });
  } catch (error) {
    console.error('Error deleting research:', error);
    res.status(500).json({ error: 'Failed to delete research' });
  }
});


app.put('/research-api/researchbot/:researchid', async (req, res) => {
  const { researchid } = req.params;
  const {
    resdescription, industry, themes, researchtitle, objectives,
    introduction, abstraction, bibliography, methodology, hypothesis,
    likertscale, dataset, stattesting, inferences, conclusion, researchsteam
  } = req.body;

  try {
    const query = `
      UPDATE researchbuttondb
      SET 
        resdescription = $1, industry = $2, themes = $3, researchtitle = $4, objectives = $5,
        introduction = $6, abstraction = $7, bibliography = $8, methodology = $9, hypothesis = $10,
        likertscale = $11, dataset = $12, stattesting = $13, inferences = $14, conclusion = $15,
        researchsteam = $16
      WHERE researchid = $17`;

    await db.query(query, [
      resdescription, industry, themes, researchtitle, objectives,
      introduction, abstraction, bibliography, methodology, hypothesis,
      likertscale, dataset, stattesting, inferences, conclusion, researchsteam, researchid
    ]);

    res.status(200).json({ message: 'Research updated successfully' });
  } catch (error) {
    console.error('Error updating research:', error);
    res.status(500).json({ error: 'Failed to update research' });
  }
});

///////////Admin startup////////////////////
app.delete('/research-api/startupdb/:startupid', async (req, res) => {
  const { startupid } = req.params;
  try {
    const query = 'DELETE FROM startupdb WHERE startupid = $1';
    await db.query(query, [startupid]);
    res.status(200).json({ message: 'Startup deleted successfully' });
  } catch (error) {
    console.error('Error deleting startup:', error);
    res.status(500).json({ error: 'Failed to delete startup' });
  }
});


app.put('/research-api/startupdb/:startupid', async (req, res) => {
  const { startupid } = req.params;
  const {
    startupdescription, startuptitle, startupproblem, startupsolution,
    startuparchitect, startuptool, startupschedule, startupcanvamodel,
    startupmarketarea, startuprevenuemodel, startupreport, startupimpact,
    startuptechnologies, startupsteam, startupvision
  } = req.body;

  try {
    const query = `
      UPDATE startupdb
      SET 
        startupdescription = $1, startuptitle = $2, startupproblem = $3, startupsolution = $4,
        startuparchitect = $5, startuptool = $6, startupschedule = $7, startupcanvamodel = $8,
        startupmarketarea = $9, startuprevenuemodel = $10, startupreport = $11, startupimpact = $12,
        startuptechnologies = $13, startupsteam = $14, startupvision = $15
      WHERE startupid = $16`;

    await db.query(query, [
      startupdescription, startuptitle, startupproblem, startupsolution,
      startuparchitect, startuptool, startupschedule, startupcanvamodel,
      startupmarketarea, startuprevenuemodel, startupreport, startupimpact,
      startuptechnologies, startupsteam, startupvision, startupid
    ]);

    res.status(200).json({ message: 'Startup updated successfully' });
  } catch (error) {
    console.error('Error updating startup:', error);
    res.status(500).json({ error: 'Failed to update startup' });
  }
});
/////////////////////////admin patent///////////
// Backend - Express Routes
app.delete('/research-api/patentdb/:patentid', async (req, res) => {
  const { patentid } = req.params;
  try {
    const query = 'DELETE FROM patentdb WHERE patentid = $1';
    await db.query(query, [patentid]);
    res.status(200).json({ message: 'Patent deleted successfully' });
  } catch (error) {
    console.error('Error deleting patent:', error);
    res.status(500).json({ error: 'Failed to delete patent' });
  }
});

app.put('/research-api/patentdb/:patentid', async (req, res) => {
  const { patentid } = req.params;
  const {
    patentnumber, inventors, patentvaluechain, patenttechnology,
    patentrelatedterms, patentdescription, regid
  } = req.body;

  try {
    const query = `
      UPDATE patentdb
      SET 
        patentnumber = $1, inventors = $2, patentvaluechain = $3, patenttechnology = $4,
        patentrelatedterms = $5, patentdescription = $6, regid = $7
      WHERE patentid = $8`;

    await db.query(query, [
      patentnumber, inventors, patentvaluechain, patenttechnology,
      patentrelatedterms, patentdescription, regid, patentid
    ]);

    res.status(200).json({ message: 'Patent updated successfully' });
  } catch (error) {
    console.error('Error updating patent:', error);
    res.status(500).json({ error: 'Failed to update patent' });
  }
});


/////////////////////admin valuechain/////////////////
// Backend - Express Routes
app.delete('/research-api/valuechaindb/:valuechainid', async (req, res) => {
  const { valuechainid } = req.params;
  try {
    const query = 'DELETE FROM valuechaindb WHERE valuechainid = $1';
    await db.query(query, [valuechainid]);
    res.status(200).json({ message: 'Value Chain deleted successfully' });
  } catch (error) {
    console.error('Error deleting Value Chain:', error);
    res.status(500).json({ error: 'Failed to delete Value Chain' });
  }
});

app.put('/research-api/valuechaindb/:valuechainid', async (req, res) => {
  const { valuechainid } = req.params;
  const {
    valuechain, subvaluechain, valuechaintechnology, valuechainsubtechnology,
    valuechainrelatedterms, valuechaindescription
  } = req.body;

  try {
    const query = `
      UPDATE valuechaindb
      SET 
        valuechain = $1, subvaluechain = $2, valuechaintechnology = $3, valuechainsubtechnology = $4,
        valuechainrelatedterms = $5, valuechaindescription = $6
      WHERE valuechainid = $7`;

    await db.query(query, [
      valuechain, subvaluechain, valuechaintechnology, valuechainsubtechnology,
      valuechainrelatedterms, valuechaindescription, valuechainid
    ]);

    res.status(200).json({ message: 'Value Chain updated successfully' });
  } catch (error) {
    console.error('Error updating Value Chain:', error);
    res.status(500).json({ error: 'Failed to update Value Chain' });
  }
});

//////////////////////admin sdg/////////////////
app.delete('/research-api/sdgdb/:sdgid', async (req, res) => {
  const { sdgid } = req.params;
  try {
    const query = 'DELETE FROM sdgdb WHERE sdgid = $1';
    await db.query(query, [sdgid]);
    res.status(200).json({ message: 'SDG deleted successfully' });
  } catch (error) {
    console.error('Error deleting SDG:', error);
    res.status(500).json({ error: 'Failed to delete SDG' });
  }
});

app.put('/research-api/sdgdb/:sdgid', async (req, res) => {
  const { sdgid } = req.params;
  const {
    sdgdescription, sdgtitle, sdgproblem, sdgsolution,
    sdgframework, sdgbenificiaries, sdgstakeholder, sdgsoftware,
    sdgalignment, sdgschedule, sdgimpact, sdgtechnologies,
    sdgsteam
  } = req.body;

  try {
    const query = `
      UPDATE sdgdb
      SET 
        sdgdescription = $1, sdgtitle = $2, sdgproblem = $3, sdgsolution = $4,
        sdgframework = $5, sdgbenificiaries = $6, sdgstakeholder = $7, sdgsoftware = $8,
        sdgalignment = $9, sdgschedule = $10, sdgimpact = $11, sdgtechnologies = $12,
        sdgsteam = $13
      WHERE sdgid = $14`;

    await db.query(query, [
      sdgdescription, sdgtitle, sdgproblem, sdgsolution,
      sdgframework, sdgbenificiaries, sdgstakeholder, sdgsoftware,
      sdgalignment, sdgschedule, sdgimpact, sdgtechnologies,
      sdgsteam, sdgid
    ]);

    res.status(200).json({ message: 'SDG updated successfully' });
  } catch (error) {
    console.error('Error updating SDG:', error);
    res.status(500).json({ error: 'Failed to update SDG' });
  }
});


// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});