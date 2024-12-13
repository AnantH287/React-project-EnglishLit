const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01032004',
  database: 'literature',
});

conn.connect((err) => {
  if (err) {
    console.log("Cannot connect to MySQL.");
  } else {
    console.log('Database connected successfully');
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});
const upload = multer({ storage: storage });


app.post('/literature', upload.fields([{ name: 'tamil' }, { name: 'english' }]), (req, res) => {
  const { title, author, content } = req.body;
  const tamilVedio = req.files['tamil'] ? req.files['tamil'][0].filename : null;
  const englishVedio = req.files['english'] ? req.files['english'][0].filename : null;

  const query = `INSERT INTO questions (title, author_name, content, tamil_vedio, english_vedio)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [title, author, content, tamilVedio, englishVedio];

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting the data", err);
      res.status(500).send("Error inserting the data");
    } else {
      console.log("Data uploaded successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get('/literature/:id', (req, res) => {
  const subjectId = req.params.id;
  const query = `SELECT * FROM questions WHERE subjectId = ?`;

  conn.query(query, [subjectId], (err, result) => {
    if (err) {
      console.error("Error fetching the data from the database", err);
      res.status(500).send({ message: 'Error fetching the data from the database' });
    } else {
      if (result.length > 0) {
        console.log("Successfully fetched the data");
        res.status(200).send(result);  
      } else {
        res.status(404).send({ message: 'No data found' });
      }
    }
  });
});

// ================bookmark section===================

app.post('/literature/bookmark', (req, res) => {
  console.log('Bookmark request received');
  const { userId, subjectId } = req.body;

  if (!userId || !subjectId) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }

  const query = 'INSERT INTO bookmarks (userId, subjectId) VALUES (?, ?)';
  const values = [userId, subjectId]; 

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("Can't insert bookmark", err);
      return res.status(500).send({ message: 'Error inserting bookmark' });
    } else {
      console.log('Bookmark inserted successfully');
      return res.status(200).send({ message: 'Successfully bookmarked' });
    }
  });
});

app.post('/literature/cancel-bookmark', (req, res) => {
  console.log('Cancel bookmark request received');
  const { userId, subjectId } = req.body;

  if (!userId || !subjectId) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }

  const sql = 'UPDATE bookmarks SET status = ? WHERE userId = ? AND subjectId = ?';
  const values = [false, userId, subjectId]; 

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Can't cancel the bookmark", err);
      return res.status(500).send({ message: 'Error canceling bookmark' });
    } else {
      console.log('Bookmark canceled successfully');
      return res.status(200).send({ message: 'Successfully canceled bookmark' });
    }
  });
});

// ==============mark================
app.post('/literature/marks',(req,res)=>{
  const {userId,subjectId,score,fieldname}=req.body
  
  if (!userId || !subjectId || !score || !fieldname ) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }
  const query=`INSERT INTO marks (userId,subjectId,${fieldname}) VALUES ( ?, ?, ?)`;
  const values=[userId,subjectId,score]

  conn.query(query,values,(err,result)=>{
    if(err){
      console.log("Can't send the mark to database",err.message);
      return res.status(405).send({message:"Error in Sending mark "})
    } else {
      console.log("Mark sended sucessfully");
      return res.send(200).send({message:"Sucessfully sended mark to Database"})
      fieldname='';
    }
  })
})


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
