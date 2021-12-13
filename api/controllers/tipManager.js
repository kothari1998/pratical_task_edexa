const db = require("../models");
const Hotel = db.hotels;
const moment = require('moment');
const aftermonth = new Date(new Date().getTime() + (5 * 144 * 60 * 60 * 1000));

//create 

exports.createhotel = (req, res) => {
  // Create a tipDATA
  const todayDateFormat = moment(new Date()).format("DD/MM/YYYY");
  const afterfiveDaysFormat = moment(aftermonth).format("DD/MM/YYYY");
 const hotel = new Hotel({
    user_id: req.params.uid,
    place: req.body.place,
    total_amount: req.body.total_amount,
    tipPercentage:req.body.tipPercentage,
    start_date:todayDateFormat,
    end_date:afterfiveDaysFormat
  });
  
  //count tip percentage
  let countTip = req.body.total_amount * req.body.tipPercentage / 100;
  // Save tipdata in the database
  hotel.save()
    .then(result=>{
        res.status(201).json({
            message:"Tip added successfully",
            hotel:{
                id:result._id,
                tip:countTip
            }
            
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message:"Tip insertion failed"
        });
    });
  
};

//get user All tips
exports.getproduct = (req, res, next) => {
  Hotel.find({ user_id: req.params.uid }).then(result => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Hotel not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't fetched Hotel!"
    });
  });
};


//get tips percenatge
exports.gettipsPercentage = (req, res, next) => {
  console.log(req.body);
   Hotel.aggregate([
    { $match: { start_date: "13/12/2021", end_date:"12/01/2022" } },
    { $group: 
    { _id: '$tipPercentage', noOfTimes: { $sum: 1 } } 
    }
  ]).sort({ createdAt: 1 })  // Hotel.find({ user_id: req.params.uid}).sort({ createdAt: 1 })
  .then(result => {
    if (result) {
      console.log(result.length);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "tippersentage not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't fetched tippersentage!"
    });
  });
};

//get tips mostvisted
exports.gettipsMostVisted = (req, res, next) => {
   Hotel.aggregate([
    { $match: { start_date: "13/12/2021", end_date:"12/01/2022" } },
    { $group: 
    { _id: '$place', noOfTimes: { $sum: 1 } } 
    }
  ]).sort({ createdAt: 1 })  // Hotel.find({ user_id: req.params.uid}).sort({ createdAt: 1 })
  .then(result => {
    if (result) {
      console.log(result.length);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "tippersentage not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't fetched tippersentage!"
    });
  });
};