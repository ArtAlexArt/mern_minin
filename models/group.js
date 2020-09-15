// https://masteringjs.io/tutorials/mongoose/array
const { Schema, model, Types } = require("mongoose");

const groupSchema = Schema({
  name: String,
  M2: {
    type:[
      { 
        firstName: String,
        lastName: String 
      }
    ],
    default:[{ firstName: "123", lastName: "456"}]
  },

  M1: {
    type: [
      {
        // "General data",
        keyI: { type: Number },
        CF: { type: Number },
        PN: { type: Number, require: true },
        H: { type: Number },
        COOL: { type: String, max: 4, require: true },
        POTV: { type: Number },
        FB: { type: String, max: 16 },
        COSF: { type: Number }
      }
    ],
    default: [{ keyI: 0, CF: 1, PN: null, H: 50.0, COOL: "ONAN", POTV: null, FB: "RECTUNGULAR", COSF: null }]
  },
},
{ versionKey: false }
);

const Group = model("Group", groupSchema);

module.exports = Group;


// const doc = new Group({
//   name: 'Jedi Order',
//   // M2: [{ firstName: 'Luke', lastName: 'Skywalker' }]
// });
// await doc.save();

// mongoose.set('debug', true);

// console.log("doc",doc);

// doc["M2"][0].firstName = 'Anakin';
// doc.M2.push({ firstName: 'Luke', lastName: 'Skywalker2' })
// doc["M2"].push({ })
// doc["M1"].push({ })
// // Prints:
// // Mongoose: groups.updateOne({ _id: ObjectId("...") },
// // { '$set': { 'members.0.firstName': 'Anakin' } }, { session: null })

// await doc.save();

// const fromDb = await Group.findOne({ _id: doc._id });
// fromDb.M2; 

// console.log("doc",fromDb["M2"].length,fromDb);

// LOG
// doc {
//   _id: 5f2d20e5442a9e279016a5f6,
//   name: 'Jedi Order',
//   M2: [
//     {
//       _id: 5f2d20e5442a9e279016a5f7,
//       firstName: '123',
//       lastName: '456'
//     }
//   ],
//   M1: [
//     {
//       _id: 5f2d20e5442a9e279016a5f8,
//       keyI: 0,
//       CF: 1,
//       PN: null,
//       H: 50,
//       COOL: 'ONAN',
//       POTV: null,
//       FB: 'RECTUNGULAR',
//       COSF: null
//     }
//   ]
// }
// Mongoose: groups.updateOne({ _id: ObjectId("5f2d20e5442a9e279016a5f6") }, { '$push': { M1: { '$each': [ { _id: ObjectId("5f2d20e5442a9e279016a5fb") } ] } }, '$set': { M2: [ { _id: ObjectId("5f2d20e5442a9e279016a5f7"), firstName: 'Anakin', lastName: '456' }, { _id: ObjectId("5f2d20e5442a9e279016a5f9"), firstName: 'Luke', lastName: 'Skywalker2' }, { _id: ObjectId("5f2d20e5442a9e279016a5fa") } ] }}, { session: null })
// Mongoose: groups.findOne({ _id: ObjectId("5f2d20e5442a9e279016a5f6") }, { projection: {} })
// doc 3 {
//   _id: 5f2d20e5442a9e279016a5f6,
//   name: 'Jedi Order',
//   M2: [
//     {
//       _id: 5f2d20e5442a9e279016a5f7,
//       firstName: 'Anakin',
//       lastName: '456'
//     },
//     {
//       _id: 5f2d20e5442a9e279016a5f9,
//       firstName: 'Luke',
//       lastName: 'Skywalker2'
//     },
//     { _id: 5f2d20e5442a9e279016a5fa }
//   ],
//   M1: [
//     {
//       _id: 5f2d20e5442a9e279016a5f8,
//       keyI: 0,
//       CF: 1,
//       PN: null,
//       H: 50,
//       COOL: 'ONAN',
//       POTV: null,
//       FB: 'RECTUNGULAR',
//       COSF: null
//     },
//     { _id: 5f2d20e5442a9e279016a5fb }
//   ]
// }



